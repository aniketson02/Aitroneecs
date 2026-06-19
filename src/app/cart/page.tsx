"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/store";
import { useHydrated } from "@/lib/useHydrated";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, remove, setQty } = useCart();
  const hydrated = useHydrated();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  if (!hydrated) {
    return <Container className="py-24"><span className="sr-only">Loading cart</span></Container>;
  }

  if (items.length === 0) {
    return (
      <Container className="py-24">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <ShoppingBag className="h-14 w-14 text-line" strokeWidth={1} />
          <h1 className="font-display text-3xl">Your cart is empty</h1>
          <p className="text-ink-soft">
            Discover something worth keeping in the collection.
          </p>
          <ButtonLink href="/products" size="lg">
            Shop the collection
          </ButtonLink>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 lg:py-16">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Your Cart</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <div key={item.id} className="flex gap-5 py-6">
              <Link
                href={`/products/${item.slug}`}
                className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-surface"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-display text-xl hover:text-accent-deep"
                    >
                      {item.name}
                    </Link>
                    {item.option && (
                      <p className="mt-1 text-sm text-muted">{item.option}</p>
                    )}
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label="Remove item"
                    className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-display text-xl">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-3xl border border-line bg-surface p-7 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="text-success">Free</dd>
            </div>
          </dl>
          <div className="mt-5 flex justify-between border-t border-line pt-5">
            <span className="font-medium">Total</span>
            <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
          </div>
          <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
            Proceed to checkout
          </ButtonLink>
          <ButtonLink href="/products" variant="ghost" size="sm" className="mt-2 w-full">
            Continue shopping
          </ButtonLink>
        </aside>
      </div>
    </Container>
  );
}
