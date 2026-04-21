import { NextRequest, NextResponse } from "next/server";
import { generateAIHook, buildMenhAnUrl, isValidEmail } from "@/lib/leadgen";
import { PrismaClient } from "@harmony/database";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, birthYear, zodiac, source } = body;

    // Validate inputs
    if (!email || !birthYear || !zodiac || !source) {
      return NextResponse.json(
        { error: "Missing required fields: email, birthYear, zodiac, source" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (birthYear < 1900 || birthYear > new Date().getFullYear()) {
      return NextResponse.json(
        { error: "Invalid birth year" },
        { status: 400 }
      );
    }

    // Generate AI Hook
    const luckAreas = [
      "sự nghiệp",
      "mối quan hệ",
      "gia đình",
      "tài chính",
      "cá nhân",
    ];
    const challengeAreas = ["tài chính", "sức khỏe", "giao tiếp", "sáng tạo"];
    const aiHook = generateAIHook(zodiac, luckAreas, challengeAreas);

    // Save lead to database (graceful degradation if fails)
    try {
      await prisma.lead.create({
        data: {
          email,
          birthYear: parseInt(birthYear, 10),
          zodiac,
          source,
          aiHook,
        },
      });
    } catch (dbError) {
      console.error("Failed to save lead to database:", dbError);
      // Continue anyway — don't fail the API response due to DB issues
    }

    // Build redirect URL
    const redirectUrl = buildMenhAnUrl(zodiac, parseInt(birthYear, 10), source);

    return NextResponse.json({
      success: true,
      aiHook,
      redirectUrl,
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
