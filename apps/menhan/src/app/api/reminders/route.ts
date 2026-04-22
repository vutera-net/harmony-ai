import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@harmony/database";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { getAIProvider } from "@harmony/ai-provider";

const db = new PrismaClient();

async function getUserId(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:3000";
  const ssoResponse = await fetch(`${SSO_URL}/api/auth/me`, {
    headers: { Cookie: `auth_token=${token}` },
  });

  if (!ssoResponse.ok) return null;

  const userData = await ssoResponse.json();
  return userData.user?.id;
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await db.subscription.findFirst({ where: { userId } });
    if (subscription?.plan === "FREE") {
      return NextResponse.json({ 
        error: "PREMIUM_ONLY", 
        message: "Tính năng nhắc nhở vận trình chỉ dành cho thành viên gói An Nhiên trở lên." 
      }, { status: 403 });
    }

    const profile = await db.profile.findUnique({ where: { userId } });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const provider = getAIProvider();
    const systemPrompt = `
      You are the Master AI Coach. Provide a short, warm, and insightful daily destiny reminder for the user.
      Focus on energy alignment, mindfulness, and one specific area of life (Career, Love, or Health).
      Keep it under 3 sentences. Format as a poetic but practical reminder.
    `;

    const userPrompt = `User Profile: ${profile.gender}, Born ${profile.birthDate.toISOString()}. Energy Type: ${profile.energyType}. Today is ${new Date().toISOString()}.`;

    const responseText = await provider.generateResponse(systemPrompt, [
      { role: "user", content: userPrompt }
    ]);

    let fullText = "";
    if (responseText instanceof ReadableStream) {
      const reader = responseText.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += new TextDecoder().decode(value);
      }
    } else {
      fullText = responseText as string;
    }

    return NextResponse.json({ reminder: fullText });
  } catch (error) {
    console.error("[REMINDER_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
