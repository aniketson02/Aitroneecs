import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/lib/data";

export async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="mt-24 bg-ink-deep text-canvas">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl">Aitroneecs</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-canvas/60">
              Intelligent electronics, beautifully made. Designed with intent,
              built to last, shipped free across India.
            </p>
          </div>

          <div>
            <p className="eyebrow text-accent">Shop</p>
            <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-canvas">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-accent">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
              <li>
                <Link href="/about" className="hover:text-canvas">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-canvas">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-canvas">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-accent">Support</p>
            <ul className="mt-4 space-y-2.5 text-sm text-canvas/70">
              <li>
                <Link href="/shipping" className="hover:text-canvas">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-canvas">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-canvas">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-canvas">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-canvas/10 pt-8 text-xs text-canvas/50 lg:flex-row lg:justify-between">
          <p>© {new Date().getFullYear()} Aitroneecs. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/terms" className="hover:text-canvas">Terms</Link>
            <Link href="/privacy" className="hover:text-canvas">Privacy</Link>
            <Link href="/refund" className="hover:text-canvas">Refunds</Link>
            <Link href="/shipping" className="hover:text-canvas">Shipping</Link>
          </nav>
          <p>Crafted in India · Secured by Razorpay</p>
        </div>
      </Container>
    </footer>
  );
}
