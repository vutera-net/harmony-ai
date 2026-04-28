import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureUserExists } from "@harmony/database";
import { getTokenFromRequest } from "@harmony/auth/middleware";

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

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in Harmony DB
    await ensureUserExists(userId);

    const { chartId } = await req.json();

    const subscription = await db.subscription.findFirst({
      where: { userId },
    });

    if (!subscription || subscription.pdfUsed >= subscription.pdfGenerationQuota) {
      return NextResponse.json({ 
        error: "QUOTA_EXCEEDED", 
        message: "Bạn đã hết lượt tạo báo cáo PDF trong quý này. Vui lòng nâng cấp gói để nhận thêm." 
      }, { status: 403 });
    }

    // Deduct quota
    await db.subscription.update({
      where: { id: subscription.id },
      data: { pdfUsed: { increment: 1 } },
    });

    // In a real system, we would trigger a background job here to generate the PDF
    // and send it via email or save to S3.
    // For now, we return the URL to the PDF template page.
    
    return NextResponse.json({ 
      success: true, 
      reportUrl: `/pdf/report/${chartId}` 
    });
  } catch (error) {
    console.error("[PDF_GEN_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
