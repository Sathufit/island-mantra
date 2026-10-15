import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fallbackDuringBuild, getCategory, getProductsByCategory } from "@/src/lib/api";
import ProductListing from "@/src/components/product/ProductListing";

// Rendered on the server and cached; refreshed in the background every 60s.
export const revalidate = 60;
// Only the four categories exist; anything else is a 404.
export const dynamicParams = false;

const VALID_SLUGS = ["women", "men", "kids", "accessories"] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return (VALID_SLUGS as readonly string[]).includes(slug);
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = isValidSlug(slug) ? await getCategory(slug) : undefined;
  return category ? { title: category.name, description: category.tagline } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const [category, products] = await Promise.all([
    getCategory(slug),
    fallbackDuringBuild(getProductsByCategory(slug), []),
  ]);

  return (
    <ProductListing
      title={category?.name ?? slug}
      tagline={category?.tagline}
      image={category?.image}
      imageAlt={category?.imageAlt}
      products={products}
      loading={false}
    />
  );
}
