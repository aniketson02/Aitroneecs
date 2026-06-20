import "server-only";
import type { Category, Product, Review } from "@/types";
import { products as seedProducts } from "@/data/products";
import { categories as seedCategories } from "@/data/categories";
import { seedReviews } from "@/data/reviews";
import { getPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";

/**
 * Data layer for the storefront.
 *
 * When Supabase is configured (env vars present) catalog data is read from the
 * database; otherwise it transparently falls back to the bundled seed catalog
 * so the site is fully functional before the backend is wired.
 */

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  category_slug: string;
  featured: boolean;
  stock: number;
  rating: number;
  reviews: number;
  badge: string | null;
  highlights: string[];
  specs: { label: string; value: string }[];
  options: { name: string; values: string[] }[] | null;
  images: { url: string; alt: string }[];
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    categorySlug: row.category_slug,
    featured: row.featured,
    stock: row.stock,
    rating: row.rating,
    reviews: row.reviews,
    badge: row.badge ?? undefined,
    highlights: row.highlights ?? [],
    specs: row.specs ?? [],
    options: row.options ?? undefined,
    images: row.images ?? [],
  };
}

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured) {
    const supabase = getPublicClient();
    const { data, error } = await supabase!
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) {
      return data.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        imageUrl: c.image_url,
        sortOrder: c.sort_order,
      }));
    }
  }
  return [...seedCategories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured) {
    const supabase = getPublicClient();
    const { data, error } = await supabase!
      .from("products_with_images")
      .select("*");
    if (!error && data) return (data as ProductRow[]).map(mapProduct);
  }
  return seedProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.categorySlug === slug);
}

export async function getReviews(productId: string): Promise<Review[]> {
  if (isSupabaseConfigured) {
    const supabase = getPublicClient();
    const { data, error } = await supabase!
      .from("reviews")
      .select("id, author_name, rating, title, body, created_at")
      .eq("product_id", productId)
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((r) => ({
        id: String(r.id),
        author: r.author_name,
        rating: r.rating,
        title: r.title,
        body: r.body,
        date: r.created_at,
      }));
    }
    // No rows yet (or table missing) → fall through to seed.
  }
  return seedReviews[productId] ?? [];
}

export async function getRelatedProducts(
  product: Product,
  limit = 3,
): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}
