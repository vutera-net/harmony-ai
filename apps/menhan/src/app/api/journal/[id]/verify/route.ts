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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const journalEntry = await db.journalEntry.findUnique({
      where: { id: params.id },
    });

    if (!journalEntry || journalEntry.userId !== userId) {
      return NextResponse.json({ error: "Journal entry not found" }, { status: 404 });
    }

    const predictions = await db.prediction.findMany({
      where: {
        chart: {
          profile: { userId },
        },
      },
    });

    const provider = getAIProvider();
    
    const systemPrompt = `
      You are the Master AI, a wise and warm mentor in Vietnamese metaphysics.
      Your task is to verify a user's real-world event against their astrological predictions.
      
      Analyze the event and determine if it aligns with any of the provided predictions.
      
      Return your response ONLY as a JSON object with the following structure:
      {
        "status": "verified" | "mismatch" | "unrelated",
        "verification": "A warm, insightful analysis of why this event matches (or doesn't match) the predictions. Max 3 sentences.",
        "trustScore": 0.0 to 1.0, // Higher if the prediction was precise and matched perfectly.
        "predictionId": "id of the matching prediction or null"
      }
    `;

    const userPrompt = `
      User Event: "${journalEntry.content}"
      Event Date: ${journalEntry.eventDate.toISOString()}
      
      Available Predictions:
      ${predictions.map(p => `- [${p.id}] ${p.category}: ${p.content} (Target: ${p.targetDate?.toISOString() || 'Anytime'})`).join('\n')}
    `;

    const responseText = await provider.generateResponse(systemPrompt, [
      { role: "user", content: userPrompt }
    ]);

    // The provider might return a stream or a string depending on the implementation. 
    // Assuming for this non-streaming call it's a string or we can convert it.
    // Since generateResponse in chat/route.ts returned a stream, I should handle it.
    // But for JSON extraction, I need the full text.
    
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

    // Clean JSON from markdown blocks if present
    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI failed to return valid JSON");
    }
    
    const result = JSON.parse(jsonMatch[0]);

    // Update database
    await db.journalEntry.update({
      where: { id: journalEntry.id },
      data: {
        status: result.status === "unrelated" ? "unverified" : result.status,
        verification: result.verification,
        trustScore: result.trustScore,
        predictionId: result.predictionId,
      },
    });

    if (result.predictionId) {
      await db.prediction.update({
        where: { id: result.predictionId },
        data: { isVerified: true },
      });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("[JOURNAL_VERIFY_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
