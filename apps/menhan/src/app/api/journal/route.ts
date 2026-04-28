import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureUserExists } from "@harmony/database";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { z } from "zod";

const JournalEntrySchema = z.object({
  content: z.string().min(1, "Content is required"),
  eventDate: z.string(), // ISO date
});

const db = prisma;

async function getUserId(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:4000";
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

    // Ensure user exists in Harmony DB before querying
    await ensureUserExists(userId);

    const entries = await db.journalEntry.findMany({
      where: { userId },
      include: { prediction: true },
      orderBy: { eventDate: "desc" },
    });

    return NextResponse.json(entries);
  } catch (error) {

    console.error("[JOURNAL_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in Harmony DB before creating entry
    await ensureUserExists(userId);

    const body = await req.json();
    const validatedData = JournalEntrySchema.parse(body);

    const entry = await db.journalEntry.create({
      data: {
        userId,
        content: validatedData.content,
        eventDate: new Date(validatedData.eventDate),
      },
    });

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("[JOURNAL_POST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
