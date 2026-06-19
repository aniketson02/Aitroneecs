import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CatalogView } from "@/components/product/CatalogView";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Shop the full Aitroneecs collection — premium audio, wearables, smart-home and charging technology.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <header className="max-w-2xl">
          <p className="eyebrow">The collection</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            All Products
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Every device we make, in one place. Filter by category, search, and sort
            to find exactly what you&apos;re after.
          </p>
        </header>
        <div className="mt-12">
          <CatalogView
            products={products}
            categories={categories}
            initialCategory={category ?? "all"}
          />
        </div>
      </Container>
    </div>
  );
}
