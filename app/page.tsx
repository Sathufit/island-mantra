import Image from "next/image";
import Link from "next/link";
import {
  getCollections,
  getFeaturedProducts,
  getBestSellers,
} from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";

const instagramImages = [
  {
    src: "https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=600&q=80",
    alt: "Island lifestyle",
  },
  {
    src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80",
    alt: "Coastal fashion",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    alt: "Island Mantra style",
  },
  {
    src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    alt: "Linen collection",
  },
  {
    src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    alt: "Resort wear",
  },
  {
    src: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80",
    alt: "Accessories",
  },
];

export default async function HomePage() {
  const [collections, newIn, bestSellers] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
    getBestSellers(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[560px] flex items-end pb-16 md:pb-24">
        <Image
          src="https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=1800&q=85"
          alt="Island Mantra — coastal fashion in Sri Lanka"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E4F52]/70 via-[#0E4F52]/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/80 mb-4">
            New Collection · 2025
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.05] mb-6 max-w-xl">
            Wear<br />the Island.
          </h1>
          <p className="font-sans text-base md:text-lg text-white/80 mb-8 max-w-md leading-relaxed">
            Coastal fashion born in Hikkaduwa. Linen, cotton, and handcraft — made for the Sri Lankan way of life.
          </p>
          <Link
            href="/collections/linen-edit"
            className="inline-block bg-white text-[#0E4F52] font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#F4EDE1] transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* New In */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/50 mb-2">
              Just Arrived
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52]">
              New In
            </h2>
          </div>
          <Link
            href="/search?filter=new"
            className="font-sans text-xs tracking-widest uppercase text-[#0E4F52] border-b border-[#0E4F52] pb-0.5 hover:text-[#2E7D7B] transition-colors hidden md:block"
          >
            View All New
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newIn.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 md:hidden text-center">
          <Link
            href="/search?filter=new"
            className="font-sans text-xs tracking-widest uppercase text-[#0E4F52] border-b border-[#0E4F52] pb-0.5"
          >
            View All New
          </Link>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="bg-[#F4EDE1] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/50 mb-2">
              Browse
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52]">
              Our Collections
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#0E4F52]/30 group-hover:bg-[#0E4F52]/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-4 md:p-6">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 mb-1">
                      Collection
                    </p>
                    <h3 className="font-serif text-lg md:text-xl text-white leading-tight">
                      {c.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/50 mb-2">
              Most Loved
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52]">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/search?filter=bestseller"
            className="font-sans text-xs tracking-widest uppercase text-[#0E4F52] border-b border-[#0E4F52] pb-0.5 hover:text-[#2E7D7B] transition-colors hidden md:block"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Story Block */}
      <section className="bg-[#0E4F52]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&q=80"
              alt="Island Mantra — Hikkaduwa boutique"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-snug mb-6">
              Born on the<br />South Coast
            </h2>
            <p className="font-sans text-base text-white/75 leading-relaxed mb-4">
              Island Mantra began with a simple idea: that clothes should feel as good as the moment you&apos;re in. We design each piece with the pace of Sri Lankan coastal life in mind — unhurried, intentional, and rooted in the landscape.
            </p>
            <p className="font-sans text-base text-white/75 leading-relaxed mb-8">
              Everything is made locally, with natural fabrics and a commitment to craft. No fast fashion, no shortcuts.
            </p>
            <Link
              href="/about"
              className="self-start font-sans text-xs tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Visit us in Hikkaduwa */}
      <section className="bg-[#F4EDE1] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/50 mb-4">
                Find Us
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52] mb-6">
                Visit Us in Hikkaduwa
              </h2>
              <address className="font-sans text-base text-[#1F2A2B] not-italic leading-relaxed mb-6">
                <strong className="font-semibold">Island Mantra</strong><br />
                22 Galle Road<br />
                Hikkaduwa, Galle District<br />
                Sri Lanka 80240
              </address>
              <div className="space-y-1 font-sans text-sm text-[#1F2A2B]/70 mb-8">
                <p>Mon–Fri: 10:00 AM – 7:00 PM</p>
                <p>Sat–Sun: 9:00 AM – 8:00 PM</p>
              </div>
              <a
                href="https://wa.me/94771234567"
                className="inline-flex items-center gap-2 font-sans text-sm text-[#0E4F52] border border-[#0E4F52] px-5 py-2.5 hover:bg-[#0E4F52] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
            {/* Map placeholder */}
            <div className="relative h-72 md:h-96 bg-[#E7DCC8] flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-[#0E4F52] flex items-center justify-center mx-auto mb-3">
                  <svg
                    width="18"
                    height="18"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-[#1F2A2B]/60">
                  22 Galle Road, Hikkaduwa
                </p>
                <p className="font-sans text-xs text-[#1F2A2B]/40 mt-1">
                  Map coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Strip */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/50 mb-2">
              Follow Along
            </p>
            <h2 className="font-serif text-2xl text-[#0E4F52]">
              @islandmantra.lk
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {instagramImages.map((img, i) => (
              <a
                key={i}
                href="https://instagram.com/islandmantra.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-[#0E4F52]/0 group-hover:bg-[#0E4F52]/30 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0E4F52] py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-3">
            Stay Connected
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
            Join the Island
          </h2>
          <p className="font-sans text-sm text-white/70 mb-8 leading-relaxed">
            New arrivals, stories from Hikkaduwa, and exclusive offers — straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-0 max-w-sm mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 font-sans text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-white text-[#0E4F52] font-sans text-xs tracking-widest uppercase hover:bg-[#F4EDE1] transition-colors flex-shrink-0"
            >
              Join
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
