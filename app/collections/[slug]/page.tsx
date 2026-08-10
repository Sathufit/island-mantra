"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { getCollection, getProductsByCollection } from "@/src/lib/api";
import { type Product } from "@/src/lib/data/products";
import { type Collection } from "@/src/lib/data/collections";
import ProductCard from "@/src/components/product/ProductCard";

const sizes = ["XS", "S", "M", "L", "XL"];

interface Filters {
  sizes: string[];
  priceMax: number;
  sort: "newest" | "price-asc" | "price-desc";
}

export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    sizes: [],
    priceMax: 20000,
    sort: "newest",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    Promise.all([getCollection(slug), getProductsByCollection(slug)]).then(
      ([col, prods]) => {
        setCollection(col ?? null);
        setProducts(prods);
        setFiltered(prods);
      }
    );
  }, [slug]);

  useEffect(() => {
    let result = [...products];

    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    result = result.filter((p) => p.price <= filters.priceMax);

    if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-desc")
      result.sort((a, b) => b.price - a.price);

    setFiltered(result);
  }, [filters, products]);

  const toggleSize = (size: string) => {
    setFilters((f) => ({
      ...f,
      sizes: f.sizes.includes(size)
        ? f.sizes.filter((s) => s !== size)
        : [...f.sizes, size],
    }));
  };

  if (!collection) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <p className="font-sans text-sm text-[#0A0A0A]/50">Loading…</p>
      </div>
    );
  }

  return (
    <div className="pt-0">
      {/* Full-bleed hero */}
      <div className="relative flex items-end bg-[#0A0A0A] overflow-hidden" style={{ height: "clamp(280px, 52vh, 560px)" }}>
        {collection.image && (
          <>
            <Image
              src={collection.image}
              alt={collection.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-10 md:pb-14 w-full">
          <nav className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/55 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">{collection.name}</span>
          </nav>
          <h1
            className="font-serif text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {collection.name}
          </h1>
          {collection.description && (
            <p className="font-sans text-sm text-white/60 mt-3 max-w-md leading-relaxed hidden md:block">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 border-b border-[#E7DCC8] pb-5">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-[#0A0A0A] hover:text-[#0A0A0A] transition-colors md:hidden"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
            </svg>
            Filter
          </button>
          <p className="hidden md:block font-sans text-xs text-[#0A0A0A]/50">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-[#0A0A0A]/50 hidden md:block">
              Sort by
            </span>
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  sort: e.target.value as Filters["sort"],
                }))
              }
              className="font-sans text-xs tracking-widest uppercase border border-[#E7DCC8] px-3 py-2 text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] bg-white"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low–High</option>
              <option value="price-desc">Price: High–Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-4">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 flex items-center justify-center font-sans text-xs border transition-colors ${
                        filters.sizes.includes(size)
                          ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                          : "border-[#E7DCC8] text-[#0A0A0A] hover:border-[#0A0A0A]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-4">
                  Price (up to Rs {filters.priceMax.toLocaleString()})
                </h3>
                <input
                  type="range"
                  min={3000}
                  max={20000}
                  step={500}
                  value={filters.priceMax}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      priceMax: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[#0A0A0A]"
                />
                <div className="flex justify-between font-sans text-xs text-[#0A0A0A]/50 mt-1">
                  <span>Rs 3,000</span>
                  <span>Rs 20,000</span>
                </div>
              </div>

              {(filters.sizes.length > 0 || filters.priceMax < 20000) && (
                <button
                  onClick={() =>
                    setFilters({ sizes: [], priceMax: 20000, sort: "newest" })
                  }
                  className="font-sans text-xs text-[#0A0A0A] underline underline-offset-2"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Mobile filter drawer */}
          {drawerOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setDrawerOpen(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-lg space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-sm tracking-widest uppercase text-[#0A0A0A]">
                    Filters
                  </h3>
                  <button onClick={() => setDrawerOpen(false)}>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-3">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-10 h-10 flex items-center justify-center font-sans text-xs border transition-colors ${
                          filters.sizes.includes(size)
                            ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                            : "border-[#E7DCC8] text-[#0A0A0A]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-full bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase py-3"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                <p className="font-serif text-2xl text-[#0A0A0A]">
                  No items found
                </p>
                <p className="font-sans text-sm text-[#0A0A0A]/60">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() =>
                    setFilters({ sizes: [], priceMax: 20000, sort: "newest" })
                  }
                  className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A] border border-[#0A0A0A] px-5 py-2.5 hover:bg-[#0A0A0A] hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
