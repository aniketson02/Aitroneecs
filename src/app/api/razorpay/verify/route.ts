import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getServiceClient } from "@/lib/supabase/server";
import type { CartItem } from "@/types";

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type Body = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customer: Customer;
  items: CartItem[];
  amount: number;
};

function orderNumber() {
  return `AIT-${Date.now().toString(36).toUpperCase()}`;
}

async function persistOrder(
  body: Body,
  status: "paid",
): Promise<string> {
  const number = orderNumber();
  const supabase = getServiceClient();
  if (!supabase) return number;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      order_number: number,
      customer_name: body.customer.name,
      email: body.customer.email,
      phone: body.customer.phone,
      shipping_address: {
        address: body.customer.address,
        city: body.customer.city,
        state: body.customer.state,
        pincode: body.customer.pincode,
      },
      amount: body.amount,
      currency: "INR",
      status,
      razorpay_order_id: body.razorpay_order_id,
      razorpay_payment_id: body.razorpay_payment_id,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Supabase order insert failed", error);
    return number;
  }

  const items = body.items.map((i) => ({
    order_id: data.id,
    product_id: i.id,
    name: i.name + (i.option ? ` (${i.option})` : ""),
    unit_price: i.price,
    qty: i.qty,
  }));
  await supabase.from("order_items").insert(items);

  return number;
}

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Demo mode: no secret configured → accept the test order without a signature.
  if (!secret) {
    const number = await persistOrder(body, "paid");
    return NextResponse.json({ verified: true, demo: true, orderNumber: number });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  const number = await persistOrder(body, "paid");
  return NextResponse.json({ verified: true, orderNumber: number });
}
