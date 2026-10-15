"use client";

import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import { getCategory, getProductsByCategory } from "@/src/lib/api";
import { type Product } from "@/src/lib/data/products";
import { type Category } from "@/src/lib/data/categories";
import ProductListing from "@/src/components/product/ProductListing";

const VALID_SLUGS = ["women", "men", "kids", "accessories"] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return (VALID_SLUGS as readonly string[]).includes(slug);
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = use(params);
  if (!isValidSlug(slug)) notFound();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategory(slug).then((c) => setCategory(c ?? null));
    getProductsByCategory(slug)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <ProductListing
      title={category?.name ?? slug}
      tagline={category?.tagline}
      image={category?.image}
      imageAlt={category?.imageAlt}
      products={products}
      loading={loading}
    />
  );
}
