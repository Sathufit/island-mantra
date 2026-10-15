"use client";

import { useEffect, useState, use } from "react";
import { getCollection, getProductsByCollection } from "@/src/lib/api";
import { type Product } from "@/src/lib/data/products";
import { type Collection } from "@/src/lib/data/collections";
import ProductListing from "@/src/components/product/ProductListing";

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection(slug).then((c) => setCollection(c ?? null));
    getProductsByCollection(slug)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <ProductListing
      title={collection?.name ?? "Collection"}
      tagline={collection?.description}
      image={collection?.image}
      imageAlt={collection?.imageAlt}
      products={products}
      loading={loading}
    />
  );
}
