"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/store";
import { useHydrated } from "@/lib/useHydrated";
import { validateCoupon } from "@/lib/coupons";
import { formatPrice } from "@/lib/utils";

type Form = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const empty: Form = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const hydrated = useHydrated();

  const total = subtotal();
  const discount = coupon?.discount ?? 0;
  const payable = Math.max(0, total - discount);

  useEffect(() => {
    if (hydrated && items.length === 0 && !loading) {
      router.replace("/products");
    }
  }, [hydrated, items.length, loading, router]);

  if (!hydrated || items.length === 0) return null;

  function update(key: keyof Form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function applyCoupon() {
    setCouponError(null);
    const result = validateCoupon(couponInput, total);
    if (result.ok) {
      setCoupon({ code: result.code, discount: result.discount, label: result.label });
    } else {
      setCoupon(null);
      setCouponError(result.message);
    }
  }

  function valid(): boolean {
    return (
      form.name.trim().length > 1 &&
      /^\S+@\S+\.\S+$/.test(form.email) &&
      /^\d{10}$/.test(form.phone.replace(/\D/g, "")) &&
      form.address.trim().length > 4 &&
      form.city.trim().length > 1 &&
      form.state.trim().length > 1 &&
      /^\d{6}$/.test(form.pincode.trim())
    );
  }

  async function finishOrder(payment: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    const res = await fetch("/api/razorpay/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payment,
        customer: form,
        items,
        amount: payable,
        couponCode: coupon?.code,
        discount,
      }),
    });
    const data = await res.json();
    if (data.verified) {
      clear();
      router.push(`/order/success?order=${encodeURIComponent(data.orderNumber)}`);
    } else {
      setError("We could not verify your payment. You have not been charged.");
      setLoading(false);
    }
  }

  async function handlePay() {
    setError(null);
    if (!valid()) {
      setError("Please complete all fields with valid details.");
      return;
    }
    setLoading(true);

    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: payable }),
    });
    const order = await orderRes.json();

    // Demo mode — no Razorpay keys configured yet.
    if (order.configured === false) {
      await finishOrder({
        razorpay_order_id: "demo",
        razorpay_payment_id: "demo",
        razorpay_signature: "demo",
      });
      return;
    }

    if (!order.orderId) {
      setError(order.error ?? "Could not start payment. Please try again.");
      setLoading(false);
      return;
    }

    const ok = await loadRazorpay();
    if (!ok || !window.Razorpay) {
      setError("Could not load the payment gateway. Check your connection.");
      setLoading(false);
      return;
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "Aitroneecs",
      description: "Order payment",
      order_id: order.orderId,
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: "#16140f" },
      handler: (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => finishOrder(response),
      modal: { ondismiss: () => setLoading(false) },
    });
    rzp.open();
  }

  return (
    <Container className="py-12 lg:py-16">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Checkout</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <div>
          <h2 className="font-display text-2xl">Shipping details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" className="sm:col-span-2">
              <input
                className={inputCls}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
              />
            </Field>
            <Field label="Email">
              <input
                className={inputCls}
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
              />
            </Field>
            <Field label="Phone (10-digit)">
              <input
                className={inputCls}
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                autoComplete="tel"
              />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <input
                className={inputCls}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                autoComplete="street-address"
              />
            </Field>
            <Field label="City">
              <input
                className={inputCls}
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </Field>
            <Field label="State">
              <input
                className={inputCls}
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </Field>
            <Field label="PIN code">
              <input
                className={inputCls}
                inputMode="numeric"
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value)}
                autoComplete="postal-code"
              />
            </Field>
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-3xl border border-line bg-surface p-7 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Your order</h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-canvas">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 justify-between gap-2 text-sm">
                  <div>
                    <p className="font-medium leading-snug">{item.name}</p>
                    <p className="text-muted">Qty {item.qty}</p>
                  </div>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="mt-6 border-t border-line pt-5">
            {coupon ? (
              <div className="flex items-center justify-between rounded-xl bg-success/10 px-4 py-3 text-sm">
                <span className="font-medium text-success">
                  {coupon.code} applied — {coupon.label}
                </span>
                <button
                  onClick={() => {
                    setCoupon(null);
                    setCouponInput("");
                  }}
                  className="text-muted hover:text-ink"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code"
                    className="h-11 flex-1 rounded-xl border border-line bg-canvas px-4 text-sm uppercase outline-none focus:border-ink"
                  />
                  <Button variant="outline" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
                {couponError && (
                  <p className="mt-2 text-xs text-accent-deep">{couponError}</p>
                )}
                <p className="mt-2 text-xs text-muted">Try WELCOME10 for 10% off.</p>
              </div>
            )}
          </div>

          <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <dt>Discount ({coupon?.code})</dt>
                <dd>−{formatPrice(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="text-success">Free</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-line pt-4">
            <span className="font-medium">Total</span>
            <span className="font-display text-2xl">{formatPrice(payable)}</span>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-deep">
              {error}
            </p>
          )}

          <Button
            size="lg"
            className="mt-5 w-full"
            onClick={handlePay}
            disabled={loading}
          >
            <Lock className="h-4 w-4" />
            {loading ? "Processing…" : `Pay ${formatPrice(payable)}`}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="h-4 w-4" /> Secured by Razorpay · UPI, cards & more
          </p>
        </aside>
      </div>
    </Container>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none transition-colors focus:border-ink";

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-sm text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
