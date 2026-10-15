// Served from cache and refreshed in the background every 60 seconds, so
// visitors never wait on the backend for the homepage.
export const revalidate = 60;

import {
  fallbackDuringBuild,
  getFeaturedProducts,
  getBestSellers,
  getCategories,
  getProductsByCategory,
} from "@/src/lib/api";
import HeroCarousel from "@/src/components/home/HeroCarousel";
import ProductCarousel from "@/src/components/home/ProductCarousel";
import CategoryBanner from "@/src/components/home/CategoryBanner";
import FlagshipStore from "@/src/components/home/FlagshipStore";

export default async function HomePage() {
  const [newIn, bestSellers, categories, accessories] = await Promise.all([
    fallbackDuringBuild(getFeaturedProducts(), []),
    fallbackDuringBuild(getBestSellers(), []),
    getCategories(),
    fallbackDuringBuild(getProductsByCategory("accessories"), []),
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
