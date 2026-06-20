import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Delivery timelines, charges and coverage for Aitroneecs orders across India.",
};

export default function ShippingPage() {
  return (
    <LegalLayout title="Shipping Policy" updated="20 June 2026">
      <p>
        We ship across India and work to get your order to you quickly and safely.
        Here&apos;s what to expect.
      </p>

      <h2>1. Shipping charges</h2>
      <p>
        <strong>Shipping is free</strong> on all orders across India. Any applicable
        taxes are included in the price shown at checkout.
      </p>

      <h2>2. Processing time</h2>
      <p>
        Orders are processed within <strong>1–2 business days</strong>. You&apos;ll
        receive a confirmation by email once your order is placed, and tracking
        details once it ships.
      </p>

      <h2>3. Delivery time</h2>
      <ul>
        <li>Metro cities: typically <strong>2–4 business days</strong> after dispatch.</li>
        <li>Other locations: typically <strong>4–7 business days</strong> after dispatch.</li>
        <li>Delivery times are estimates and may vary due to location, courier delays or factors beyond our control.</li>
      </ul>

      <h2>4. Tracking</h2>
      <p>
        Once dispatched, we&apos;ll email you a tracking link so you can follow your
        order to your door.
      </p>

      <h2>5. Delays</h2>
      <p>
        Occasionally, deliveries may be delayed due to weather, courier issues or
        regional restrictions. If your order is significantly delayed, contact{" "}
        <a href="mailto:support@aitroneecs.com">support@aitroneecs.com</a> and
        we&apos;ll help.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about a delivery? Email{" "}
        <a href="mailto:support@aitroneecs.com">support@aitroneecs.com</a> or use our{" "}
        <a href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}
