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

// The full catalog fetch (with calculated prices, variants, images, etc. for
// every product) takes several seconds against the backend and was being
// re-run from scratch on every single page — every category/collection/
// product/search page called this independently, and the homepage alone
// triggered it 3x in parallel for its different sections. Cache it in
// memory so repeat calls within the window reuse one in-flight/settled
// fetch instead of hitting the backend again.
/**
 * During `next build` an unreachable backend (CI, or a cold start) shouldn't
 * fail the build, so fall back to `fallback`. At runtime, rethrow instead: a
 * failed background refresh then keeps serving the last good cached page
 * rather than caching an empty one.
 */
export async function fallbackDuringBuild<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    if (process.env.NEXT_PHASE === "phase-production-build") return fallback;
    throw err;
  }
}

let productsCache: { promise: Promise<Product[]>; timestamp: number } | null = null;
const PRODUCTS_CACHE_TTL_MS = 60_000;

async function getAllProducts(): Promise<Product[]> {
  const now = Date.now();
  if (!productsCache || now - productsCache.timestamp > PRODUCTS_CACHE_TTL_MS) {
    const promise = fetchProducts()
      .then((raw) => raw.map((p) => mapProduct(p, relatedSlugsFor(p, raw))))
      .catch((err) => {
        productsCache = null;
        throw err;
      });
    productsCache = { promise, timestamp: now };
  }
  return productsCache.promise;
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
  return products.filter((p) => p.isNew).slice(0, 8);
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isBestSeller).slice(0, 8);
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
