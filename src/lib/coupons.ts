// Promo codes. Edit this list to manage your offers.
// Amounts are in whole INR.

type Coupon = {
  code: string;
  /** Percentage (0-100) or fixed-amount discount. */
  kind: "percent" | "flat";
  value: number;
  /** Minimum order subtotal required. */
  minSubtotal?: number;
  /** Cap on the discount for percent coupons. */
  maxDiscount?: number;
  label: string;
};

const COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    kind: "percent",
    value: 10,
    maxDiscount: 2500,
    label: "10% off your first order",
  },
  {
    code: "AITRO500",
    kind: "flat",
    value: 500,
    minSubtotal: 5000,
    label: "₹500 off orders over ₹5,000",
  },
  {
    code: "FESTIVE15",
    kind: "percent",
    value: 15,
    minSubtotal: 10000,
    maxDiscount: 5000,
    label: "15% off orders over ₹10,000",
  },
];

export type CouponResult =
  | { ok: true; code: string; discount: number; label: string }
  | { ok: false; message: string };

export function validateCoupon(rawCode: string, subtotal: number): CouponResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, message: "Enter a coupon code." };

  const coupon = COUPONS.find((c) => c.code === code);
  if (!coupon) return { ok: false, message: "That code isn't valid." };

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      ok: false,
      message: `Add ₹${(coupon.minSubtotal - subtotal).toLocaleString("en-IN")} more to use this code.`,
    };
  }

  let discount =
    coupon.kind === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  discount = Math.min(discount, subtotal); // never exceed the order

  return { ok: true, code: coupon.code, discount, label: coupon.label };
}
