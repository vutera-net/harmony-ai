import { prisma } from "@harmony/database";

const db = prisma;

export type PaymentProvider = "STRIPE" | "VNPAY" | "MOMO" | "MOCK";

export interface PaymentSession {
  sessionId: string;
  amount: number;
  currency: string;
  url: string;
}

export class PaymentService {
  /**
   * Create a payment session for a specific feature
   */
  static async createCheckoutSession(
    userId: string, 
    featureId: string, 
    amount: number, 
    provider: PaymentProvider = "MOCK"
  ): Promise<PaymentSession> {
    const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
    
    // Save pending payment to DB
    await db.payment.create({
      data: {
        userId,
        amount,
        currency: "VND",
        status: "PENDING",
        provider: provider.toLowerCase(),
        providerTransactionId: paymentId,
        featureId,
      },
    });

    if (provider === "MOCK") {
      return {
        sessionId: paymentId,
        amount,
        currency: "VND",
        url: `/api/payments/mock-success?sessionId=${paymentId}`,
      };
    }

    // In a real scenario, integrate with Stripe/VNPay here
    throw new Error(`Provider ${provider} not implemented yet`);
  }

  /**
   * Complete a payment (used by webhook or mock success)
   */
  static async completePayment(transactionId: string) {
    const payment = await db.payment.findUnique({
      where: { providerTransactionId: transactionId },
    });

    if (!payment) throw new Error("Payment not found");
    if (payment.status === "COMPLETED") return payment;

    return await db.payment.update({
      where: { id: payment.id },
      data: { status: "COMPLETED" },
    });
  }

  /**
   * Check if user has access to a specific feature
   */
  static async checkAccess(userId: string, featureId: string): Promise<boolean> {
    // 1. Check for active premium subscription
    const subscription = await db.subscription.findFirst({
      where: {
        userId,
        status: "ACTIVE",
        plan: { not: "FREE" },
      },
    });

    if (subscription) return true;

    // 2. Check for one-time payment
    const payment = await db.payment.findFirst({
      where: {
        userId,
        featureId,
        status: "COMPLETED",
      },
    });

    return !!payment;
  }
}
