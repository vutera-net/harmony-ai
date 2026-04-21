import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@harmony/database";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { z } from "zod";

const ProfileUpdateSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string(), // ISO date
  birthTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  birthLocation: z.string().min(2, "Location is required"),
  birthTimezone: z.string().min(1, "Timezone is required"),
});

const db = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user from SSO to get userId
    const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:3000";
    const ssoResponse = await fetch(`${SSO_URL}/api/auth/me`, {
      headers: { Cookie: `auth_token=${token}` },
    });

    if (!ssoResponse.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await ssoResponse.json();
    const userId = userData.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = ProfileUpdateSchema.parse(body);

    const profile = await db.profile.upsert({
      where: { userId },
      update: {
        gender: validatedData.gender,
        birthDate: new Date(validatedData.birthDate),
        birthTime: validatedData.birthTime,
        birthLocation: validatedData.birthLocation,
        birthTimezone: validatedData.birthTimezone,
      },
      create: {
        userId,
        gender: validatedData.gender,
        birthDate: new Date(validatedData.birthDate),
        birthTime: validatedData.birthTime,
        birthLocation: validatedData.birthLocation,
        birthTimezone: validatedData.birthTimezone,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("[PROFILE_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
