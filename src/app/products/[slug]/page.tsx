import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Price } from "@/components/ui/Price";
import { Stars } from "@/components/ui/Stars";
import { Gallery } from "@/components/product/Gallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getCategoryBySlug,
} from "@/lib/data";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [product.images[0].url],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [category, related] = await Promise.all([
    getCategoryBySlug(product.categorySlug),
    getRelatedProducts(product),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Aitroneecs" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/products" className="hover:text-ink">
            Products
          </Link>{" "}
          {category && (
            <>
              /{" "}
              <Link href={`/categories/${category.slug}`} className="hover:text-ink">
                {category.name}
              </Link>{" "}
            </>
          )}
          / <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Gallery images={product.images} name={product.name} />

          <div className="lg:py-4">
            {product.badge && (
              <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-deep">
                {product.badge}
              </span>
            )}
            <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg text-ink-soft">{product.tagline}</p>

            <div className="mt-5 flex items-center gap-4">
              <Stars rating={product.rating} reviews={product.reviews} />
              {product.stock > 0 ? (
                <span className="text-sm text-success">In stock</span>
              ) : (
                <span className="text-sm text-muted">Out of stock</span>
              )}
            </div>

            <Price
              price={product.price}
              compareAt={product.compareAtPrice}
              size="lg"
              className="mt-6"
            />

            <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6 text-center text-xs text-ink-soft">
              <div className="flex flex-col items-center gap-2">
                <Truck className="h-5 w-5 text-accent" strokeWidth={1.5} />
                Free shipping
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" strokeWidth={1.5} />
                2-year warranty
              </div>
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-5 w-5 text-accent" strokeWidth={1.5} />
                30-day returns
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Details</p>
            <h2 className="mt-2 font-display text-3xl">Specifications</h2>
          </div>
          <dl className="divide-y divide-line">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 py-3.5">
                <dt className="text-ink-soft">{s.label}</dt>
                <dd className="text-right font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-3xl tracking-tight">You may also like</h2>
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
