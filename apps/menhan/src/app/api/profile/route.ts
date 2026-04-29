import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureUserExists } from "@harmony/database";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { z } from "zod";

const ProfileUpdateSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  birthDate: z.string().optional(), // ISO date
  birthTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional().or(z.literal("")),
  birthLocation: z.string().optional(),
  birthTimezone: z.string().optional(),
});

const db = prisma;

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user from SSO to get userId
    const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:4000";
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

    // Ensure user exists in Harmony DB
    await ensureUserExists(userId);

    const profile = await db.profile.findUnique({
      where: { userId },
    });

    if (!profile && userData.user?.profile?.birthDate) {
      // Auto-sync profile from SSO if not exists and SSO has birth info
      const ssoProfile = userData.user.profile;
      await db.profile.create({
        data: {
          userId,
          gender: ssoProfile.gender,
          birthDate: new Date(ssoProfile.birthDate),
          birthTime: ssoProfile.birthTime || null,
          birthLocation: ssoProfile.birthLocation,
          birthTimezone: ssoProfile.birthTimezone || "Asia/Ho_Chi_Minh",
        },
      });
      
      // Fetch again to return the created profile
      return NextResponse.json({ 
        profile: await db.profile.findUnique({ where: { userId } }) 
      });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("[PROFILE_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}

// ... (keep imports and schema)

// ... (keep imports and schema)

// ... (keep imports and schema)

export async function PATCH(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user from SSO to get userId
    const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:4000";
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

    // Ensure user exists in Harmony DB
    await ensureUserExists(userId);

    const body = await req.json();
    const validatedData = ProfileUpdateSchema.parse(body);

    const profile = await db.profile.upsert({
      where: { userId },
      update: {
        gender: validatedData.gender,
        birthDate: validatedData.birthDate ? new Date(validatedData.birthDate) : undefined,
        birthTime: validatedData.birthTime || null,
        birthLocation: validatedData.birthLocation,
        birthTimezone: validatedData.birthTimezone,
      },
      create: {
        userId,
        gender: (validatedData.gender || null) as any,
        birthDate: (validatedData.birthDate ? new Date(validatedData.birthDate) : null) as any,
        birthTime: validatedData.birthTime || null,
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
