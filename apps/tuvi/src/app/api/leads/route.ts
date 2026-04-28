import { NextRequest, NextResponse } from "next/server";
import { generateAIHook, buildMenhAnUrl, isValidEmail } from "@/lib/leadgen";
import { prisma, ensureUserExists } from "@harmony/database";
import { getTokenFromRequest } from "@harmony/auth/middleware";

const db = prisma;

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
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

    // Handle storage based on authentication status
    if (token) {
      try {
        // Fetch userId from SSO
        const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:4000";
        const ssoResponse = await fetch(`${SSO_URL}/api/auth/me`, {
          headers: { Cookie: `auth_token=${token}` },
        });

        if (ssoResponse.ok) {
          const userData = await ssoResponse.json();
          const userId = userData.user?.id;

          if (userId) {
            // Ensure user exists in Harmony DB
            await ensureUserExists(userId);
            // We don't create a 'Lead' for authenticated users to avoid redundancy
            // Instead, we could potentially update the profile's aiMemory with this interest
            console.log(`Authenticated user ${userId} interacted with TuVi tool`);
          }
        }
      } catch (authError) {
        console.error("Auth sync failed, falling back to lead creation:", authError);
        // Fallback to lead creation if SSO check fails
        await db.lead.create({
          data: { email, birthYear: parseInt(birthYear, 10), zodiac, source, aiHook },
        });
      }
    } else {
      // Save lead to database for guests
      try {
        await db.lead.create({
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
      }
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
