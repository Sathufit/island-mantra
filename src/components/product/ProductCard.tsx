"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/src/lib/data/products";
import { formatPrice } from "@/src/lib/utils";
import { useCart } from "@/src/store/cart";

const ONE_SIZE = "One Size";

interface Props {
  product: Product;
  sizes?: string;
  /** Position in a list, shown as a small mono index. */
  index?: number;
}

export default function ProductCard({ product, sizes, index }: Props) {
  const [quickSize, setQuickSize] = useState(product.sizes[0] ?? "");
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "error">("idle");
  const { addItem } = useCart();

  const primary = product.images[0];
  const secondary = product.images[1];
  const oneSize = !product.sizes.length || product.sizes[0] === ONE_SIZE;
  const imgSizes = sizes ?? "(min-width: 1024px) 24vw, (min-width: 640px) 42vw, 72vw";

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "adding") return;
    const color = product.variants[0]?.color ?? "";
    const variantId = product.variantMap[`${quickSize}|${color}`];
    if (!variantId) return;
    setStatus("adding");
    try {
      await addItem(variantId);
      setStatus("added");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block" draggable={false}>
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        {primary && (
          <Image
            src={primary.src}
            alt={primary.alt || product.name}
            fill
            sizes={imgSizes}
            draggable={false}
            className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}
        {/* Second photo washes up over the first on hover */}
        {secondary && (
          <div className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]">
            <Image src={secondary.src} alt="" aria-hidden fill sizes={imgSizes} draggable={false} className="object-cover" />
          </div>
        )}

        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {product.isNew ? <span className="label bg-paper/90 px-2 py-1 text-ink">New</span> : <span />}
          {index !== undefined && (
            <span className="label text-white/0 transition-colors duration-500 group-hover:text-white/90">
              {String(index).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Quick add — rises on hover (mouse) */}
        <div
          className="absolute inset-x-3 bottom-3 hidden translate-y-[calc(100%+14px)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 sm:block"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="bg-paper/95 backdrop-blur-sm">
            {!oneSize && (
              <div className="flex flex-wrap justify-center gap-1 px-2 pt-2">
                {product.sizes.slice(0, 6).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickSize(size);
                    }}
                    aria-pressed={quickSize === size}
                    className={`h-7 min-w-8 px-1.5 text-[10px] transition-colors ${
                      quickSize === size ? "bg-ink text-paper" : "text-ink hover:bg-sand"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={handleQuickAdd}
              disabled={status === "adding"}
              className="caps h-10 w-full text-[10px] text-ink transition-colors hover:text-saffron-deep disabled:opacity-60"
            >
              {status === "adding"
                ? "Adding…"
                : status === "added"
                ? "Added ✓"
                : status === "error"
                ? "Try again"
                : oneSize
                ? "+ Add to bag"
                : `+ Add size ${quickSize}`}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-[15px] leading-snug text-ink">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-1 text-[13px] leading-relaxed text-muted">{product.description}</p>
        )}
        <p className="label mt-2 text-[11px] text-ink">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
