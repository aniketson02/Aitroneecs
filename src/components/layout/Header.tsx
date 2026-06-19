import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CartButton } from "@/components/cart/CartButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { getCategories } from "@/lib/data";

export async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Left: mobile menu + nav */}
          <div className="flex items-center gap-1">
            <MobileMenu categories={categories} />
            <nav className="hidden items-center gap-7 lg:flex">
              <div className="group relative">
                <button className="flex items-center gap-1 py-2 text-sm text-ink-soft transition-colors hover:text-ink">
                  Shop <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-surface p-3 shadow-xl shadow-ink/5">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/categories/${c.slug}`}
                        className="rounded-xl px-4 py-3 transition-colors hover:bg-canvas"
                      >
                        <span className="block font-medium">{c.name}</span>
                        <span className="block text-xs text-muted">{c.tagline}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href="/products"
                className="py-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                All Products
              </Link>
              <Link
                href="/about"
                className="py-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Center: wordmark */}
          <Link
            href="/"
            className="font-display text-2xl tracking-tight lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            Aitroneecs
          </Link>

          {/* Right: search + cart */}
          <div className="flex items-center gap-1">
            <Link
              href="/products"
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5"
            >
              <Search className="h-5 w-5" strokeWidth={1.6} />
            </Link>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
