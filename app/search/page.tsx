"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts, getProducts } from "@/src/lib/api";
import { type Product } from "@/src/lib/data/products";
import ProductCard from "@/src/components/product/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const filter = searchParams.get("filter") ?? "";

  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const search = async () => {
      if (filter === "new") {
        const all = await getProducts();
        setResults(all.filter((p) => p.isNew));
      } else if (filter === "bestseller") {
        const all = await getProducts();
        setResults(all.filter((p) => p.isBestSeller));
      } else if (query.trim()) {
        setResults(await searchProducts(query));
      } else {
        setResults(await getProducts());
      }
      setLoading(false);
    };
    const timer = setTimeout(search, 200);
    return () => clearTimeout(timer);
  }, [query, filter]);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0E4F52] mb-8">
          {filter === "new"
            ? "New Arrivals"
            : filter === "bestseller"
            ? "Best Sellers"
            : "Search"}
        </h1>

        {!filter && (
          <div className="relative max-w-xl mb-10">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full border-b-2 border-[#0E4F52] bg-transparent font-sans text-xl text-[#1F2A2B] placeholder:text-[#1F2A2B]/30 py-3 pr-10 focus:outline-none"
              autoFocus
            />
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#0E4F52"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {loading ? (
          <p className="font-sans text-sm text-[#1F2A2B]/50">Searching…</p>
        ) : results.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-serif text-2xl text-[#0E4F52] mb-3">
              No results found
            </p>
            <p className="font-sans text-sm text-[#1F2A2B]/60">
              Try a different search term or browse our collections.
            </p>
          </div>
        ) : (
          <>
            <p className="font-sans text-xs text-[#1F2A2B]/50 mb-6">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
