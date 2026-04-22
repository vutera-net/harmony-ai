import { NextRequest, NextResponse } from "next/server";
import { PaymentService } from "@/lib/payments/payment-service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/chat?error=payment_failed", req.url));
  }

  try {
    await PaymentService.completePayment(sessionId);
    return NextResponse.redirect(new URL("/chat?payment=success", req.url));
  } catch (error) {
    console.error("Mock payment error:", error);
    return NextResponse.redirect(new URL("/chat?error=payment_failed", req.url));
  }
}
