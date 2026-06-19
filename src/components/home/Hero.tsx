import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-deep text-canvas">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=2000&q=80"
          alt="Premium headphones in soft light"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/70 to-transparent" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[78vh] max-w-2xl flex-col justify-center py-24">
          <p className="eyebrow animate-fade-up text-accent">Intelligent Electronics</p>
          <h1 className="animate-fade-up font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Technology,
            <br />
            beautifully made.
          </h1>
          <p className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-canvas/70">
            A curated collection of audio, wearables and smart-home devices —
            engineered with intent and finished like jewellery.
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-3">
            <ButtonLink href="/products" variant="light" size="lg">
              Shop the collection
            </ButtonLink>
            <ButtonLink
              href="/categories/audio"
              size="lg"
              className="border border-canvas/30 bg-transparent text-canvas hover:bg-canvas hover:text-ink"
            >
              Explore Audio
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
