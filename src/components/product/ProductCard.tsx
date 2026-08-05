"use client";

import { useState } from "react";
import Link from "next/link";
import { type Product } from "@/src/lib/data/products";
import { formatPrice } from "@/src/lib/utils";
import { useCart } from "@/src/store/cart";

export default function ProductCard({ product }: { product: Product }) {
  const [quickSize, setQuickSize] = useState(product.sizes[0] ?? "");
  const [quickAdded, setQuickAdded] = useState(false);
  const [quickError, setQuickError] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!quickSize) return;
    const color = product.variants[0]?.color ?? "";
    const variantId = product.variantMap[`${quickSize}|${color}`];
    if (!variantId) return;
    try {
      await addItem(variantId);
      setQuickAdded(true);
      setTimeout(() => setQuickAdded(false), 2000);
    } catch {
      setQuickError(true);
      setTimeout(() => setQuickError(false), 2000);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image placeholder */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F4EDE1] border border-[#E7DCC8]">
        {/* New / Sale badge — top left, minimal */}
        {(product.isNew || product.compareAtPrice) && (
          <div className="absolute top-3 left-3">
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase bg-white text-[#0A0A0A] px-2 py-1">
              {product.compareAtPrice ? "Sale" : "New"}
            </span>
          </div>
        )}

        {/* Quick-add — slides up on desktop hover */}
        <div
          className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block"
          onClick={(e) => e.stopPropagation()}
        >
          {product.sizes[0] !== "One Size" && (
            <div className="bg-white/95 px-3 pt-3 pb-1 flex gap-1 justify-center flex-wrap border-t border-[#E7DCC8]">
              {product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickSize(size);
                  }}
                  className={`w-9 h-8 text-[10px] font-sans border transition-colors ${
                    quickSize === size
                      ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                      : "border-[#E7DCC8] text-[#0A0A0A] hover:border-[#0A0A0A]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleQuickAdd}
            className={`w-full py-3 text-[10px] font-sans tracking-[0.18em] uppercase transition-colors duration-200 ${
              quickAdded
                ? "bg-[#2A2A2A] text-white"
                : quickError
                ? "bg-red-600 text-white"
                : "bg-[#0A0A0A] text-white hover:bg-[#2A2A2A]"
            }`}
          >
            {quickAdded ? "Added" : quickError ? "Try Again" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="font-sans text-sm text-[#0A0A0A] leading-snug group-hover:text-[#0A0A0A] transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-sans text-sm text-[#0A0A0A]/70">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="font-sans text-xs text-[#0A0A0A]/35 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        {product.variants.length > 1 && (
          <div className="flex gap-1.5 mt-2">
            {product.variants.map((v) => (
              <span
                key={v.color}
                title={v.color}
                className="w-3 h-3 rounded-full border border-[#E7DCC8]"
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
