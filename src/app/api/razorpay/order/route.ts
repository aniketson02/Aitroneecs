import { NextResponse } from "next/server";
import { getRazorpay, isRazorpayConfigured, razorpayKeyId } from "@/lib/razorpay";

type Body = {
  amount: number; // whole INR
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const amount = Math.round(Number(body.amount));
  if (!amount || amount < 1) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  // Demo mode: no Razorpay keys yet → let the storefront complete a test order.
  if (!isRazorpayConfigured) {
    return NextResponse.json({ configured: false });
  }

  const razorpay = getRazorpay();
  try {
    const order = await razorpay!.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });
    return NextResponse.json({
      configured: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId,
    });
  } catch (err) {
    console.error("Razorpay order error", err);
    return NextResponse.json(
      { error: "Could not create payment order" },
      { status: 502 },
    );
  }
}
