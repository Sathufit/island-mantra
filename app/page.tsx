export const dynamic = "force-dynamic";

import {
  getFeaturedProducts,
  getBestSellers,
  getCategories,
  getProductsByCategory,
} from "@/src/lib/api";
import HeroCarousel from "@/src/components/home/HeroCarousel";
import ProductCarousel from "@/src/components/home/ProductCarousel";
import CategoryBanner from "@/src/components/home/CategoryBanner";
import FlagshipStore from "@/src/components/home/FlagshipStore";

// A cold or unreachable backend shouldn't take the whole homepage down —
// the product sections just hide themselves when they come back empty.
async function safe<T>(promise: Promise<T[]>): Promise<T[]> {
  try {
    return await promise;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [newIn, bestSellers, categories, accessories] = await Promise.all([
    safe(getFeaturedProducts()),
    safe(getBestSellers()),
    getCategories(),
    safe(getProductsByCategory("accessories")),
  ]);

  return (
    <>
      {/* Section 2 */}
      <HeroCarousel />

      {/* Section 3 */}
      <ProductCarousel title="New Arrivals" products={newIn} viewAllHref="/search?filter=new" />

      {/* Section 4 */}
      <ProductCarousel title="Best Sellers" products={bestSellers} viewAllHref="/search?filter=bestseller" tone="paper" />

      {/* Section 5 */}
      <div className="pt-20 md:pt-28">
        <CategoryBanner categories={categories} />
      </div>

      {/* Section 6 */}
      <ProductCarousel title="Featured Accessories" products={accessories.slice(0, 8)} viewAllHref="/accessories" />

      {/* Section 7 */}
      <FlagshipStore />
    </>
  );
}
