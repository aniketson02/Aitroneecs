"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Category, Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/product/ProductGrid";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function CatalogView({
  products,
  categories,
  initialCategory = "all",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "all") list = list.filter((p) => p.categorySlug === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [products, category, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-sm outline-none transition-colors focus:border-ink"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 rounded-full border border-line bg-surface px-4 text-sm outline-none focus:border-ink"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip
            key={c.slug}
            active={category === c.slug}
            onClick={() => setCategory(c.slug)}
          >
            {c.name}
          </Chip>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-6">
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="rounded-3xl border border-dashed border-line py-24 text-center">
            <p className="font-display text-2xl">Nothing matches that.</p>
            <p className="mt-2 text-ink-soft">Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
        active ? "border-ink bg-ink text-canvas" : "border-line hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}
