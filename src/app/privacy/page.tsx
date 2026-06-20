import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aitroneecs collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="20 June 2026">
      <p>
        Aitroneecs (&quot;we&quot;, &quot;us&quot;) respects your privacy. This
        policy explains what information we collect, how we use it, and the choices
        you have. By using <strong>aitroneecs.com</strong> you agree to this policy.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li><strong>Order &amp; contact details</strong> — name, email, phone, and shipping address you provide at checkout.</li>
        <li><strong>Payment information</strong> — handled directly by our payment processor (Razorpay). We do not store your full card or banking details.</li>
        <li><strong>Usage data</strong> — basic technical information such as device, browser and pages visited, used to improve the Site.</li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To process and deliver your orders and send order updates.</li>
        <li>To provide customer support and respond to your enquiries.</li>
        <li>To improve our products, website and service.</li>
        <li>To comply with legal and tax obligations.</li>
      </ul>

      <h2>3. Sharing your information</h2>
      <p>
        We share information only with service providers who help us run the store —
        such as our payment processor (<strong>Razorpay</strong>), our backend and
        hosting providers (<strong>Supabase</strong> and <strong>Vercel</strong>),
        and delivery partners — strictly to fulfil your order. We never sell your
        personal data.
      </p>

      <h2>4. Data security</h2>
      <p>
        We use industry-standard measures to protect your data. Payments are
        encrypted and processed by Razorpay, and order data is stored securely with
        access restricted to authorised systems. No method of transmission is 100%
        secure, but we work to protect your information at all times.
      </p>

      <h2>5. Cookies</h2>
      <p>
        We use essential cookies and local storage (for example, to remember the
        items in your cart). These are necessary for the Site to function.
      </p>

      <h2>6. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data
        by contacting us. We will respond within a reasonable time, subject to any
        legal retention requirements.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this policy occasionally. The latest version will always be
        posted on this page with its effective date.
      </p>

      <h2>8. Contact</h2>
      <p>
        For any privacy questions or requests, email{" "}
        <a href="mailto:support@aitroneecs.com">support@aitroneecs.com</a>.
      </p>
    </LegalLayout>
  );
}
