import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@harmony/auth/middleware";
import { PaymentService } from "@/lib/payments/payment-service";

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For MVP, we assume we have a userId associated with the token
    // In real flow, fetch userId from SSO
    const userId = "user_mock_123"; 
    
    const { featureId, amount } = await req.json();
    
    if (!featureId || !amount) {
      return NextResponse.json({ error: "Missing featureId or amount" }, { status: 400 });
    }

    const session = await PaymentService.createCheckoutSession(
      userId, 
      featureId, 
      amount, 
      "MOCK"
    );

    return NextResponse.json(session);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
