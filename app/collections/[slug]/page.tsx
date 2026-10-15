import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, getProductsByCollection } from "@/src/lib/api";
import ProductListing from "@/src/components/product/ProductListing";

// Rendered on the server and cached; refreshed in the background every 60s.
export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  return collection ? { title: collection.name, description: collection.description } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();
  const products = await getProductsByCollection(slug);

  return (
    <ProductListing
      title={collection.name}
      tagline={collection.description}
      image={collection.image}
      imageAlt={collection.imageAlt}
      products={products}
      loading={false}
    />
  );
}
