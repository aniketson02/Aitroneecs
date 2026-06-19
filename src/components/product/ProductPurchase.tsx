"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/store";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const option = product.options?.[0];
  const [selected, setSelected] = useState(option?.values[0]);

  const lineId = selected ? `${product.id}::${selected}` : product.id;

  function buildItem() {
    return {
      id: lineId,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      option: selected ? `${option?.name}: ${selected}` : undefined,
    };
  }

  return (
    <div className="space-y-6">
      {option && (
        <div>
          <p className="text-sm font-medium">
            {option.name}: <span className="text-ink-soft">{selected}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {option.values.map((v) => (
              <button
                key={v}
                onClick={() => setSelected(v)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  selected === v
                    ? "border-ink bg-ink text-canvas"
                    : "border-line hover:border-ink",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={() => add(buildItem())}>
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={() => {
            add(buildItem());
            router.push("/checkout");
          }}
        >
          Buy Now
        </Button>
      </div>

      <ul className="space-y-2 pt-2">
        {product.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-ink-soft">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
