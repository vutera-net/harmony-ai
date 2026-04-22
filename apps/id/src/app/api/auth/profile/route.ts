import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken, extractToken } from "@/lib/auth";
import { ProfileSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    // Extract and verify token
    let token: string | null = null;
    const authHeader = request.headers.get("Authorization");
    token = extractToken(authHeader);
    if (!token) {
      token = request.cookies.get("auth_token")?.value || null;
    }

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate profile data
    const validation = ProfileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { fullName, gender, birthDate, birthTime, birthTimezone, birthLocation } =
      validation.data;

    // Prepare update data (only include provided fields)
    const updateData: Record<string, any> = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (gender !== undefined) updateData.gender = gender;
    if (birthDate !== undefined) updateData.birthDate = new Date(birthDate);
    if (birthTime !== undefined) updateData.birthTime = birthTime;
    if (birthTimezone !== undefined) updateData.birthTimezone = birthTimezone;
    if (birthLocation !== undefined) updateData.birthLocation = birthLocation;

    // Upsert profile
    const profile = await prisma.profile.upsert({
      where: { userId: payload.userId },
      update: updateData,
      create: {
        userId: payload.userId,
        ...updateData,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        profile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
