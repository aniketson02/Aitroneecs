"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/lib/cart/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
          {product.badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-canvas">
              {product.badge}
            </span>
          )}
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              add({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0].url,
              });
            }}
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-3 right-3 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-canvas text-ink opacity-0 shadow-lg transition-all duration-300 hover:bg-ink hover:text-canvas group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </Link>

      <div className="mt-4 px-0.5">
        <p className="eyebrow text-muted">{product.tagline}</p>
        <h3 className="mt-1.5 font-display text-lg leading-snug">
          <Link href={`/products/${product.slug}`} className="hover:text-accent-deep">
            {product.name}
          </Link>
        </h3>
        <Price
          price={product.price}
          compareAt={product.compareAtPrice}
          className="mt-2"
        />
      </div>
    </motion.article>
  );
}
