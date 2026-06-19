import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types";
import { Container } from "@/components/ui/Container";

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const [lead, ...rest] = categories;
  if (!lead) return null;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Browse by category</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
              Find your category
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden shrink-0 items-center gap-1 text-sm text-ink-soft hover:text-ink sm:flex"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <CategoryTile category={lead} large />
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.slice(0, 4).map((c) => (
              <CategoryTile key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CategoryTile({ category, large }: { category: Category; large?: boolean }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group relative overflow-hidden rounded-3xl bg-surface ${
        large ? "min-h-[24rem] lg:min-h-full" : "min-h-[12rem]"
      }`}
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-canvas">
        <div>
          <h3 className={`font-display ${large ? "text-3xl" : "text-2xl"}`}>
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-canvas/70">{category.tagline}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-canvas/15 backdrop-blur transition-colors group-hover:bg-canvas group-hover:text-ink">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
