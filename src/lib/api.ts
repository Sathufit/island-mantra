import { type Product } from "./data/products";
import { collections, type Collection } from "./data/collections";
import { categories, type Category } from "./data/categories";
import { fetchProducts, type MedusaProduct } from "./medusa/client";
import { mapProduct } from "./medusa/map";

function relatedSlugsFor(product: MedusaProduct, all: MedusaProduct[]): string[] {
  return all
    .filter(
      (p) =>
        p.id !== product.id &&
        p.collection?.handle &&
        p.collection.handle === product.collection?.handle
    )
    .slice(0, 2)
    .map((p) => p.handle);
}

async function getAllProducts(): Promise<Product[]> {
  const raw = await fetchProducts();
  return raw.map((p) => mapProduct(p, relatedSlugsFor(p, raw)));
}

export async function getProducts(): Promise<Product[]> {
  return getAllProducts();
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCollection(
  collectionSlug: string
): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.collectionSlug === collectionSlug);
}

export async function getRelatedProducts(slugs: string[]): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => slugs.includes(p.slug));
}

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollection(
  slug: string
): Promise<Collection | undefined> {
  return collections.find((c) => c.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategory(
  slug: string
): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getProductsByCategory(
  categorySlug: Product["category"]
): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category === categorySlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isNew).slice(0, 4);
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isBestSeller).slice(0, 4);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.toLowerCase();
  const products = await getAllProducts();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.collectionName.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}
