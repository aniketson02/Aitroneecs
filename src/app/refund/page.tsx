import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Our policy on returns, refunds and order cancellations at Aitroneecs.",
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" updated="20 June 2026">
      <p>
        We want you to love what you buy from Aitroneecs. If something isn&apos;t
        right, this policy explains how returns, refunds and cancellations work.
      </p>

      <h2>1. Cancellations</h2>
      <ul>
        <li>You can cancel an order any time before it is shipped for a full refund.</li>
        <li>To cancel, email <a href="mailto:support@aitroneecs.com">support@aitroneecs.com</a> with your order number as soon as possible.</li>
        <li>Once an order has shipped, it can no longer be cancelled, but you may return it under the policy below.</li>
      </ul>

      <h2>2. Returns</h2>
      <ul>
        <li>You may return most items within <strong>30 days</strong> of delivery.</li>
        <li>Items must be unused, in their original condition and packaging, with all accessories included.</li>
        <li>Certain items (such as items marked non-returnable, or products damaged through misuse) may not be eligible.</li>
      </ul>

      <h2>3. How to start a return</h2>
      <p>
        Email <a href="mailto:support@aitroneecs.com">support@aitroneecs.com</a> with
        your order number and the reason for return. We&apos;ll share return
        instructions and, where applicable, arrange a pickup.
      </p>

      <h2>4. Refunds</h2>
      <ul>
        <li>Once we receive and inspect your returned item, we&apos;ll notify you of the approval status.</li>
        <li>Approved refunds are issued to your original payment method via Razorpay.</li>
        <li>Refunds are typically processed within <strong>5–7 business days</strong> after approval; the time for funds to reflect depends on your bank or card issuer.</li>
      </ul>

      <h2>5. Damaged or defective items</h2>
      <p>
        If your item arrives damaged or defective, contact us within <strong>48
        hours</strong> of delivery with photos. We&apos;ll arrange a replacement or
        full refund at no cost to you.
      </p>

      <h2>6. Contact</h2>
      <p>
        For any return or refund query, email{" "}
        <a href="mailto:support@aitroneecs.com">support@aitroneecs.com</a> or use our{" "}
        <a href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}
