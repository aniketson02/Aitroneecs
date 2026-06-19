"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart/store";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, close, remove, setQty } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={close} />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-xl">
                Your Cart{items.length > 0 ? ` (${items.length})` : ""}
              </h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-line" strokeWidth={1} />
                <p className="text-ink-soft">Your cart is empty.</p>
                <Button variant="outline" onClick={close}>
                  Continue shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-line py-4">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={close}
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-surface"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={close}
                              className="font-medium leading-snug hover:text-accent-deep"
                            >
                              {item.name}
                            </Link>
                            {item.option && (
                              <p className="text-xs text-muted">{item.option}</p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            aria-label="Remove item"
                            className="text-muted hover:text-ink"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-medium">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-display text-xl">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Shipping & taxes calculated at checkout.
                  </p>
                  <ButtonLink
                    href="/checkout"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={close}
                  >
                    Checkout
                  </ButtonLink>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
