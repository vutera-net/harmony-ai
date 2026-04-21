import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { PrismaClient } from "@harmony/database";
import { buildChartContext, formatChartForPrompt } from "@/lib/chart-context";
import { buildSystemPrompt } from "@/lib/master-ai-prompt";

const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:3000";
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
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

/**
 * Convert Next.js request to Anthropic message format
 */
function formatMessages(
  messages: Array<{ role: string; content: string }>
): Array<{ role: "user" | "assistant"; content: string }> {
  return messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));
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
        // Fetch user from SSO
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

    // Stream response from Claude
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const encoder = new TextEncoder();
          const response = await anthropic.messages.stream({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 2048,
            system: systemPrompt,
            messages: formatMessages(messages),
          });

          for await (const chunk of response) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              const text = chunk.delta.text;
              controller.enqueue(encoder.encode(text));
            }
          }

          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          const encoder = new TextEncoder();
          controller.enqueue(
            encoder.encode(
              "\n\n[Xin lỗi, có lỗi khi xử lý câu hỏi của bạn. Vui lòng thử lại.]"
            )
          );
          controller.close();
        }
      },
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
