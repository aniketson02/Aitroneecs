import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/data";

const base = "https://aitroneecs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const staticRoutes = ["", "/products", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...categories.map((c) => ({
      url: `${base}/categories/${c.slug}`,
      lastModified: new Date(),
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
