import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <Container className="py-24">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </span>
        <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">
          Thank you for your order
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Your payment was successful and your order is confirmed. A confirmation
          will be sent to your email shortly.
        </p>
        {order && (
          <p className="mt-6 rounded-full border border-line bg-surface px-5 py-2 text-sm">
            Order number: <span className="font-medium">{order}</span>
          </p>
        )}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/products" size="lg">
            Continue shopping
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
