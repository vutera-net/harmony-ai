import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@harmony/database";
import { getServerSession } from "@harmony/auth";
import { z } from "zod";

const ProfileUpdateSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string(), // ISO date
  birthTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  birthLocation: z.string().min(2, "Location is required"),
  birthTimezone: z.string().min(1, "Timezone is required"),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = ProfileUpdateSchema.parse(body);

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        gender: validatedData.gender,
        birthDate: new Date(validatedData.birthDate),
        birthTime: validatedData.birthTime,
        birthLocation: validatedData.birthLocation,
        birthTimezone: validatedData.birthTimezone,
      },
      create: {
        userId: session.user.id,
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
  }
}
