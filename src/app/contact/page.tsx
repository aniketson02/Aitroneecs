"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm outline-none transition-colors focus:border-ink";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <Container className="py-14 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">We&apos;re listening</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Questions about a product, an order, or anything else? Reach us directly
          or send a message — we reply within one business day.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <ContactRow icon={Mail} label="Email" value="support@aitroneecs.com" />
          <ContactRow icon={Phone} label="Phone" value="+91 90000 00000" />
          <ContactRow icon={MapPin} label="Studio" value="Pune, Maharashtra, India" />
        </div>

        <div className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-7 w-7" strokeWidth={2.5} />
              </span>
              <h2 className="font-display text-2xl">Message sent</h2>
              <p className="text-ink-soft">Thank you — we&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <label className="block">
                <span className="mb-1.5 block text-sm text-ink-soft">Name</span>
                <input required className={inputCls} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-ink-soft">Email</span>
                <input required type="email" className={inputCls} autoComplete="email" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-ink-soft">Message</span>
                <textarea required rows={5} className={`${inputCls} h-auto py-3`} />
              </label>
              <Button type="submit" size="lg" className="w-full">
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-accent">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
