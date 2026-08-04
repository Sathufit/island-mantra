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
import NewsletterForm from "@/src/components/ui/NewsletterForm";

export default async function HomePage() {
  const [newIn, bestSellers, categories, accessories] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
    getCategories(),
    getProductsByCategory("accessories"),
  ]);

  return (
    <>
      <HeroCarousel />

      <ProductCarousel title="New Arrivals" products={newIn} viewAllHref="/search?filter=new" />

      <ProductCarousel title="Best Sellers" products={bestSellers} viewAllHref="/search?filter=bestseller" />

      <CategoryBanner categories={categories} />

      <ProductCarousel
        title="Featured Accessories"
        products={accessories.slice(0, 8)}
        viewAllHref="/accessories"
      />

      <FlagshipStore />

      {/* ── NEWSLETTER ───────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-20">
        <div className="max-w-md mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-2">
            New things, occasionally.
          </h2>
          <p className="font-sans text-sm text-white/50 mb-8">
            New arrivals and stories from Hikkaduwa, in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
