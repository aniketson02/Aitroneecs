import "server-only";
import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

export const isRazorpayConfigured = Boolean(keyId && keySecret);

export const razorpayKeyId = keyId;

let client: Razorpay | null = null;

export function getRazorpay(): Razorpay | null {
  if (!keyId || !keySecret) return null;
  if (!client) client = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return client;
}
