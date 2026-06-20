import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";

type Body = {
  productId: string;
  author: string;
  rating: number;
  title?: string;
  body?: string;
};

export async function POST(request: Request) {
  let payload: Body;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const author = (payload.author ?? "").trim();
  const rating = Number(payload.rating);
  const title = (payload.title ?? "").trim().slice(0, 120);
  const body = (payload.body ?? "").trim().slice(0, 2000);

  if (!payload.productId || author.length < 2 || !(rating >= 1 && rating <= 5)) {
    return NextResponse.json(
      { ok: false, message: "Please add your name and a star rating." },
      { status: 400 },
    );
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Reviews aren't available yet. Please try later." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("reviews").insert({
    product_id: payload.productId,
    author_name: author.slice(0, 80),
    rating: Math.round(rating),
    title,
    body,
    status: "approved",
  });

  if (error) {
    console.error("Review insert failed", error);
    return NextResponse.json(
      { ok: false, message: "Could not save your review. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
