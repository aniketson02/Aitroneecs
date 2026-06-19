import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function StoryStrip() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-surface">
            <Image
              src="https://images.unsplash.com/photo-1593344484962-796055d4a3a4?auto=format&fit=crop&w=1400&q=80"
              alt="Detail of a precisely machined device"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Our philosophy</p>
            <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              Considered down to the last millimetre.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              We start with a feeling, not a feature list. Every Aitroneecs product
              is shaped by real materials — aluminium, glass, leather — and refined
              until nothing is left to remove.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              The result is technology that feels quieter, lasts longer, and earns a
              permanent place in your life.
            </p>
            <ButtonLink href="/about" variant="outline" size="lg" className="mt-8">
              Read our story
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
