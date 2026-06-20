import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data";

// Refresh category pages from Supabase at most every 5 minutes.
export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deep text-canvas">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/40 to-ink-deep/20" />
        <Container className="relative">
          <div className="flex min-h-[42vh] flex-col justify-end py-16">
            <p className="eyebrow text-accent">{category.tagline}</p>
            <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-canvas/75">
              {category.description}
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-14 lg:py-20">
        <p className="text-sm text-muted">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <div className="mt-8">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <p className="py-20 text-center text-ink-soft">
              No products in this category yet.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
