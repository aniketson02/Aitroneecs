"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/store";
import { useHydrated } from "@/lib/useHydrated";

export function CartButton() {
  const open = useCart((s) => s.open);
  const items = useCart((s) => s.items);
  const hydrated = useHydrated();

  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <button
      onClick={open}
      aria-label={`Open cart, ${count} items`}
      className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
