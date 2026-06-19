import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aitroneecs makes intelligent electronics with intent — premium materials, quiet design, and technology built to last.",
};

const pillars = [
  {
    title: "Materials first",
    text: "Aluminium, glass, leather and titanium — real materials, honestly finished.",
  },
  {
    title: "Quiet intelligence",
    text: "AI that works in the background and respects your privacy by default.",
  },
  {
    title: "Built to last",
    text: "Two-year warranties and repairable design. We build things to keep.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deep text-canvas">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80"
          alt="A studio of designers at work"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep to-ink-deep/30" />
        <Container className="relative">
          <div className="flex min-h-[50vh] max-w-2xl flex-col justify-end py-20">
            <p className="eyebrow text-accent">Our story</p>
            <h1 className="mt-3 font-display text-5xl leading-tight tracking-tight sm:text-6xl">
              Technology with intent.
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-2xl leading-relaxed sm:text-3xl">
            Aitroneecs began with a simple frustration: most electronics are loud,
            disposable and forgettable. We wanted to make the opposite.
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Every product we ship is designed in-house and refined obsessively —
              from the weight in your hand to the sound of a button. We choose
              premium materials, tune our own audio, and write software that puts
              your privacy first.
            </p>
            <p>
              We&apos;re a small team based in India, shipping nationwide with free
              delivery, a two-year warranty and support from real people. We&apos;d
              rather make a few things exceptionally well than many things quickly.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-3xl border border-line bg-surface p-8">
              <h3 className="font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <ButtonLink href="/products" size="lg">
            Explore the collection
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
