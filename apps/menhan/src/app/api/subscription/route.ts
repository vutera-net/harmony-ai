import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureUserExists } from "@harmony/database";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { z } from "zod";

const PlanSchema = z.object({
  plan: z.enum(["AN_NHIEN", "BINH_AN", "VinhCuu"]), // Added VinhCuu as lifetime
});

const db = prisma;

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

    // Ensure user exists in Harmony DB
    await ensureUserExists(userId);

    const subscription = await db.subscription.findFirst({
      where: { userId },
    });

    return NextResponse.json(subscription || { plan: "FREE", status: "ACTIVE" });
  } catch (error) {
    console.error("[SUB_GET_ERROR]", error);
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

    // Ensure user exists in Harmony DB
    await ensureUserExists(userId);

    const body = await req.json();
    const { plan } = PlanSchema.parse(body);

    // Map user-friendly plan name to DB enum
    const planMap: Record<string, any> = {
      AN_NHIEN: "AN_NHIEN",
      BINH_AN: "BINH_AN",
      VinhCuu: "BINH_AN", // Fallback for lifetime if not in enum, or we update schema
    };

    const dbPlan = planMap[plan];

    // In a real app, we would integrate Stripe/PayPal here
    // For the MVP, we'll simulate a successful payment
    
    const subscription = await db.subscription.upsert({
      where: { 
        // Using a custom approach since Subscription doesn't have a unique userId
        // In a real scenario, we'd add @unique to userId in Subscription model
        id: (await db.subscription.findFirst({ where: { userId } }))?.id || 'new-id' 
      },
      update: {
        plan: dbPlan,
        status: "ACTIVE",
        startDate: new Date(),
        endDate: plan === "VinhCuu" ? null : new Date(Date.now() + (plan === "AN_NHIEN" ? 30 * 24 * 60 * 60 * 1000 : 365 * 24 * 60 * 60 * 1000)),
        pdfGenerationQuota: plan === "VinhCuu" ? 999 : (plan === "BINH_AN" ? 12 : 3),
        pdfUsed: 0,
      },
      create: {
        userId,
        plan: dbPlan,
        status: "ACTIVE",
        startDate: new Date(),
        endDate: plan === "VinhCuu" ? null : new Date(Date.now() + (plan === "AN_NHIEN" ? 30 * 24 * 60 * 60 * 1000 : 365 * 24 * 60 * 60 * 1000)),
        pdfGenerationQuota: plan === "VinhCuu" ? 999 : (plan === "BINH_AN" ? 12 : 3),
        pdfUsed: 0,
      },
    });

    // Mock Payment record
    await db.payment.create({
      data: {
        userId,
        amount: plan === "AN_NHIEN" ? 199000 : (plan === "BINH_AN" ? 1490000 : 4990000),
        currency: "VND",
        status: "COMPLETED",
        provider: "mock_gateway",
        providerTransactionId: `tx_${Date.now()}`,
        featureId: `sub_${plan}`,
      },
    });

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("[SUB_POST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
