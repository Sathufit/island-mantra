import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts } from "@/src/lib/api";
import ProductView from "@/src/components/product/ProductView";

// Each product page is rendered on the server the first time it's visited,
// then served from cache and refreshed in the background every 60 seconds —
// visitors no longer wait on the backend (or download the whole catalogue).
export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => undefined);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description || undefined,
    openGraph: product.images[0] ? { images: [product.images[0].src] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product.relatedSlugs);
  return <ProductView product={product} related={related} />;
}
