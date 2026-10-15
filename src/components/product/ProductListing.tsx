"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type Product } from "@/src/lib/data/products";
import ProductCard from "@/src/components/product/ProductCard";
import SunsetLoader from "@/src/components/ui/SunsetLoader";
import { RiseWords } from "@/src/components/motion/Reveal";

type Sort = "featured" | "price-asc" | "price-desc";

interface Props {
  title: string;
  tagline?: string;
  image?: string;
  imageAlt?: string;
  products: Product[];
  loading: boolean;
}

export default function ProductListing({ title, tagline, image, imageAlt, products, loading }: Props) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const reduce = useReducedMotion();

  // Only offer the sizes this range actually comes in.
  const availableSizes = useMemo(() => {
    const seen = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => s !== "One Size" && seen.add(s)));
    return [...seen];
  }, [products]);

  const visible = useMemo(() => {
    let result = sizes.length ? products.filter((p) => p.sizes.some((s) => sizes.includes(s))) : [...products];
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, sizes, sort]);

  const toggleSize = (s: string) => setSizes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[62svh] min-h-[420px] items-end overflow-hidden bg-ink">
        {image && (
          <div className="ken-burns absolute inset-0" style={{ animationDuration: "18s" }}>
            <Image src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-12 text-white sm:px-8 md:pb-16">
          <h1 className="display text-[clamp(3.5rem,11vw,10rem)] uppercase">{title}</h1>
          {tagline && (
            <p className="tagline mt-3 text-[clamp(1.3rem,2.6vw,2rem)]">
              <RiseWords text={tagline} delay={0.3} />
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-8">
        {loading ? (
          <SunsetLoader />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center py-28 text-center">
            <p className="tagline text-3xl">New pieces are on their way.</p>
            <p className="mt-3 max-w-sm text-[15px] text-ink-soft">
              We’re putting the finishing touches on this range. Check back soon.
            </p>
            <Link href="/" className="btn btn-outline mt-8">
              <span>Back to Home</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="sticky top-16 z-20 -mx-4 flex flex-wrap items-center justify-between gap-4 border-b border-line bg-linen px-4 py-4 sm:-mx-8 sm:px-8 md:bg-linen/95 md:backdrop-blur">
              <div className="flex flex-wrap items-center gap-2">
                <span className="caps mr-2 text-[10px] text-muted">
                  {visible.length} {visible.length === 1 ? "piece" : "pieces"}
                </span>
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    aria-pressed={sizes.includes(s)}
                    className={`h-8 min-w-9 border px-2 text-[11px] transition-colors duration-300 ${
                      sizes.includes(s) ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                {sizes.length > 0 && (
                  <button onClick={() => setSizes([])} className="link-draw caps ml-2 text-[10px] text-muted">
                    Clear
                  </button>
                )}
              </div>
              <label className="caps flex items-center gap-2 text-[10px] text-muted">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="caps cursor-pointer border-0 bg-transparent py-1 text-[10px] text-ink focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </div>

            {visible.length === 0 ? (
              <div className="py-24 text-center">
                <p className="tagline text-2xl">Nothing in that size just yet.</p>
                <button onClick={() => setSizes([])} className="btn btn-outline mt-6">
                  <span>Clear Filters</span>
                </button>
              </div>
            ) : (
              <motion.div layout={!reduce} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {visible.map((p, i) => (
                    <motion.div
                      key={p.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 8) * 0.05 }}
                    >
                      <ProductCard product={p} sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </>
  );
}
