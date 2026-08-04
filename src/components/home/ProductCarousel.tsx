"use client";

import { useRef } from "react";
import Link from "next/link";
import ProductCard from "@/src/components/product/ProductCard";
import { type Product } from "@/src/lib/data/products";

interface Props {
  title: string;
  products: Product[];
  viewAllHref: string;
}

export default function ProductCarousel({ title, products, viewAllHref }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">{title}</h2>
          <div className="flex items-center gap-5">
            <Link
              href={viewAllHref}
              className="font-sans text-xs tracking-[0.18em] uppercase text-[#0A0A0A]/50 hover:text-[#0A0A0A] transition-colors"
            >
              View All
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                aria-label={`Scroll ${title} left`}
                className="w-8 h-8 flex items-center justify-center border border-[#E7DCC8] text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label={`Scroll ${title} right`}
                className="w-8 h-8 flex items-center justify-center border border-[#E7DCC8] text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5 sm:px-8"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-[72vw] sm:w-[45vw] md:w-[26vw] lg:w-[23vw] snap-start"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
