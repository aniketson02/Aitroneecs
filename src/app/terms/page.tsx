import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of Aitroneecs and purchases made on our store.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="20 June 2026">
      <p>
        Welcome to Aitroneecs. These Terms &amp; Conditions (&quot;Terms&quot;)
        govern your access to and use of the website <strong>aitroneecs.com</strong>{" "}
        (the &quot;Site&quot;) and any purchases you make through it. By using the
        Site, you agree to these Terms. If you do not agree, please do not use the
        Site.
      </p>

      <h2>1. Use of the site</h2>
      <p>
        You agree to use the Site only for lawful purposes and in a way that does
        not infringe the rights of, or restrict the use of the Site by, anyone
        else. You must be at least 18 years old, or use the Site under the
        supervision of a parent or guardian, to place an order.
      </p>

      <h2>2. Products &amp; pricing</h2>
      <ul>
        <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.</li>
        <li>We make every effort to display products and prices accurately, but errors may occur. We reserve the right to correct any errors and to change prices without notice.</li>
        <li>Product images are for illustration; actual products may vary slightly in appearance.</li>
        <li>All orders are subject to availability and our acceptance.</li>
      </ul>

      <h2>3. Orders &amp; payment</h2>
      <p>
        When you place an order, you make an offer to purchase the products at the
        listed price. We may accept or decline your order. Payments are processed
        securely through <strong>Razorpay</strong>; we do not store your card or
        banking details on our servers.
      </p>

      <h2>4. Shipping, returns &amp; refunds</h2>
      <p>
        Delivery, returns and refunds are governed by our{" "}
        <a href="/shipping">Shipping Policy</a> and{" "}
        <a href="/refund">Refund &amp; Cancellation Policy</a>, which form part of
        these Terms.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        All content on the Site — including text, graphics, logos, images and
        software — is the property of Aitroneecs or its licensors and is protected
        by applicable laws. You may not reproduce or reuse it without our written
        permission.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Aitroneecs shall not be liable for
        any indirect, incidental or consequential damages arising from your use of
        the Site or products purchased through it. Our total liability for any claim
        will not exceed the amount you paid for the relevant order.
      </p>

      <h2>7. Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. Changes take effect when posted
        on this page. Your continued use of the Site after changes are posted
        constitutes acceptance of the revised Terms.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These Terms are governed by the laws of India, and any disputes are subject
        to the exclusive jurisdiction of the courts of Pune, Maharashtra.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms? Email us at{" "}
        <a href="mailto:support@aitroneecs.com">support@aitroneecs.com</a> or visit
        our <a href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}
