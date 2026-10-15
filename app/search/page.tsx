"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts, getProducts } from "@/src/lib/api";
import { type Product } from "@/src/lib/data/products";
import ProductCard from "@/src/components/product/ProductCard";
import SunsetLoader from "@/src/components/ui/SunsetLoader";
import TideLine from "@/src/components/motion/TideLine";

const TITLES: Record<string, string> = { new: "New Arrivals", bestseller: "Best Sellers" };

function SearchContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const run = async () => {
      try {
        if (filter === "new") setResults((await getProducts()).filter((p) => p.isNew));
        else if (filter === "bestseller") setResults((await getProducts()).filter((p) => p.isBestSeller));
        else if (query.trim()) setResults(await searchProducts(query));
        else setResults(await getProducts());
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(run, 200);
    return () => clearTimeout(timer);
  }, [query, filter]);

  return (
    <div className="px-4 pb-24 pt-28 sm:px-8 md:pt-36">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="display text-[clamp(2.9rem,8vw,6.5rem)] uppercase">{TITLES[filter] ?? "Search"}</h1>
        <TideLine className="mt-5" />

        {!filter && (
          <div className="relative mt-10 max-w-2xl">
            <label htmlFor="search" className="sr-only">
              Search the shop
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Linen, dresses, Galle…"
              autoFocus
              className="tagline w-full border-0 border-b border-ink bg-transparent py-3 pr-10 text-3xl placeholder:text-muted/50 focus:outline-none md:text-4xl"
            />
          </div>
        )}

        {loading ? (
          <SunsetLoader label="Searching" />
        ) : results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="tagline text-3xl">Nothing washed up for that search.</p>
            <p className="mt-3 text-[15px] text-ink-soft">Try a different word, or browse the shop from the menu.</p>
          </div>
        ) : (
          <>
            <p className="caps mb-8 mt-10 text-[10px] text-muted">
              {results.length} {results.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw" />
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
