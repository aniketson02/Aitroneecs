import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { StoryStrip } from "@/components/home/StoryStrip";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories, getFeaturedProducts } from "@/lib/data";

// Refresh the homepage catalog from Supabase at most every 5 minutes.
export const revalidate = 300;

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
  ]);

  return (
    <>
      <Hero />
      <ValueProps />

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Most wanted</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
                Featured products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden shrink-0 items-center gap-1 text-sm text-ink-soft hover:text-ink sm:flex"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </section>

      <CategoryShowcase categories={categories} />
      <StoryStrip />
    </>
  );
}
