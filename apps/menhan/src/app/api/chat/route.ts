import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { PrismaClient } from "@harmony/database";
import { buildChartContext, formatChartForPrompt } from "@/lib/chart-context";
import { buildSystemPrompt } from "@/lib/master-ai-prompt";
import { getAIProvider, AIMessage } from "@harmony/ai-provider";

const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:3000";
const db = new PrismaClient();

/**
 * Fetch user's profile from SSO service or local DB
 */
async function getUserProfile(userId: string | null) {
  if (!userId) return null;

  try {
    const profile = await db.profile.findUnique({
      where: { userId },
    });
    return profile || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  } finally {
    await db.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    // Try to get user's profile for context
    let chartContext = "";
    const token = getTokenFromRequest(req);

    if (token) {
      try {
        const ssoResponse = await fetch(`${SSO_URL}/api/auth/me`, {
          headers: { Cookie: `auth_token=${token}` },
        });

        if (ssoResponse.ok) {
          const userData = await ssoResponse.json();
          const userId = userData.user?.id;

          if (userId) {
            const profile = await getUserProfile(userId);
            if (profile) {
              const ctx = buildChartContext(profile);
              chartContext = formatChartForPrompt(ctx);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user context:", error);
      }
    }

    // Build system prompt with or without user context
    const systemPrompt = buildSystemPrompt(
      chartContext ||
      `[Người dùng chưa hoàn thành hồ sơ lá số. Bạn sẽ trò chuyện dựa trên kinh nghiệm chung mà không có context cá nhân.]`
    );

    // Get AI Provider based on config
    const provider = getAIProvider();
    
    // Convert messages to provider format
    const aiMessages: AIMessage[] = messages.map((msg: any) => ({
      role: msg.role === "system" ? "system" : (msg.role === "assistant" ? "assistant" : "user"),
      content: msg.content,
    }));

    const stream = await provider.generateResponse(systemPrompt, aiMessages, {
      maxTokens: 2048,
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
