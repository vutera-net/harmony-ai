import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { PrismaClient } from "@harmony/database";
import { buildChartContext, formatChartForPrompt } from "@/lib/chart-context";
import { buildSystemPrompt } from "@/lib/master-ai-prompt";
import { getAIProvider, AIMessage } from "@harmony/ai-provider";
import { PaymentService } from "@/lib/payments/payment-service";

const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:3000";
const db = new PrismaClient();

/**
 * Fetch user's profile and premium status
 */
async function getUserContext(userId: string) {
  try {
    const profile = await db.profile.findUnique({
      where: { userId },
    });
    const subscription = await db.subscription.findFirst({
      where: { userId },
    });
    const journalEntries = await db.journalEntry.findMany({
      where: { userId },
      orderBy: { eventDate: "desc" },
      take: 10,
    });

    return { profile, subscription, journalEntries };
  } catch (error) {
    console.error("Error fetching user context:", error);
    return null;
  } finally {
    await db.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    let systemContext = "";
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
            const context = await getUserContext(userId);
            if (context) {
              const { profile, subscription, journalEntries } = context;
              
              // 1. Base Chart Context
              if (profile) {
                const ctx = buildChartContext(profile);
                systemContext = formatChartForPrompt(ctx);
              }

              // 2. Premium AI Coach Enhancements
              const isPremium = subscription?.plan !== "FREE";
              if (isPremium) {
                const memory = profile?.aiMemory as any || {};
                const historySummary = journalEntries.map(e => 
                  `Event on ${e.eventDate.toISOString().split('T')[0]}: ${e.content} (Status: ${e.status})`
                ).join("\n");

                systemContext += `\n\n[AI COACH MODE ACTIVE - PREMIUM]\n`;
                systemContext += `User Long-term Memory: ${JSON.stringify(memory)}\n`;
                systemContext += `Recent Destiny Events:\n${historySummary}\n`;
                systemContext += `Specialized Knowledge: You now have access to Bát Trạch and Cửu Cung analysis. When discussing home or office layout, use these principles to provide precise guidance.`;
              }
            }
          }
        }
      } catch (error) {
        console.error("Error enhancing context:", error);
      }
    }

    // Detailed query paywall check
    const isDetailedQuery = messages.some((m: any) => 
      m.content.toLowerCase().includes("chi tiết") || 
      m.content.toLowerCase().includes("chuyên sâu")
    );

    if (isDetailedQuery && token) {
       // Simplified check for this demo: if not premium, trigger paywall
       const userId = (await (await fetch(`${SSO_URL}/api/auth/me`, {
         headers: { Cookie: `auth_token=${token}` },
       })).json()).user?.id;
       
       const sub = await db.subscription.findFirst({ where: { userId } });
       if (sub?.plan === "FREE") {
         return NextResponse.json({ 
           error: "PAYWALL", 
           message: "Vui lòng nâng cấp gói để mở khóa luận giải chuyên sâu.",
           featureId: `chart_${userId}_analysis`,
           amount: 50000 
         }, { status: 402 });
       }
    }

    const systemPrompt = buildSystemPrompt(
      systemContext || `[Người dùng chưa hoàn thành hồ sơ lá số. Bạn sẽ trò chuyện dựa trên kinh nghiệm chung.]`
    );

    const provider = getAIProvider();
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
