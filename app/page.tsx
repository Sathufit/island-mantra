import Image from "next/image";
import Link from "next/link";
import {
  getCollections,
  getFeaturedProducts,
  getBestSellers,
} from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";
import NewsletterForm from "@/src/components/ui/NewsletterForm";

const trustItems = [
  "Free delivery on orders over Rs 5,000",
  "Islandwide delivery in 2–4 days",
  "Handcrafted in Sri Lanka",
  "Easy 14-day returns",
  "New arrivals every week",
  "Linen · Cotton · Natural fibres",
];

const instagramImages = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    alt: "Hikkaduwa beach",
  },
  {
    src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80",
    alt: "Coastal fashion",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    alt: "Island Mantra style",
  },
  {
    src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    alt: "Linen collection",
  },
  {
    src: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&q=80",
    alt: "Resort wear",
  },
  {
    src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
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
      {/* ── HERO ────────────────────────────────────────── */}

      {/* Desktop: split panel hero */}
      <section
        className="hidden md:grid"
        style={{ gridTemplateColumns: "45% 55%", height: "95vh", minHeight: "640px", maxHeight: "900px" }}
      >
        {/* Left: text panel */}
        <div className="bg-[#0E4F52] relative flex flex-col justify-end px-14 xl:px-20 pb-20 overflow-hidden">
          {/* Subtle vertical rule */}
          <div className="absolute top-0 right-0 w-px h-full bg-white/10" />

          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#E1704B] mb-5 animate-fade-up">
            New Collection · 2025
          </p>
          <h1 className="font-serif text-6xl xl:text-[5.25rem] text-white leading-[0.88] animate-fade-up delay-200">
            Wear<br />the<br />Island.
          </h1>
          <p className="font-sans text-base text-white/60 leading-relaxed mt-7 mb-10 max-w-[280px] animate-fade-up delay-300">
            Coastal fashion born in Hikkaduwa. Linen, cotton, and handcraft — made for the Sri Lankan way of life.
          </p>
          <div className="flex gap-6 items-center animate-fade-up delay-400">
            <Link
              href="/collections/linen-edit"
              className="bg-white text-[#0E4F52] font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#F4EDE1] transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="font-sans text-xs tracking-[0.15em] uppercase text-white/55 hover:text-white transition-colors flex items-center gap-2"
            >
              Our Story
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Bottom location tag */}
          <div className="absolute bottom-9 left-14 xl:left-20 flex items-center gap-3 animate-fade-in delay-600">
            <div className="w-8 h-px bg-white/25" />
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/25">
              Hikkaduwa, Sri Lanka
            </p>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=85"
            alt="Island Mantra coastal fashion"
            fill
            priority
            className="object-cover object-center"
            sizes="55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

          {/* Floating info card */}
          <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-sm p-5 animate-fade-in delay-600">
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#1F2A2B]/45 mb-1">
              Now Available
            </p>
            <p className="font-serif text-xl text-[#0E4F52]">2025 Collection</p>
            <p className="font-sans text-xs text-[#1F2A2B]/45 mt-1">
              16 new pieces · Islandwide delivery
            </p>
          </div>
        </div>
      </section>

      {/* Mobile: full-bleed hero */}
      <section className="md:hidden relative h-screen min-h-[600px] flex items-end pb-16">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85"
          alt="Island Mantra — Hikkaduwa beach, Sri Lanka"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E4F52]/80 via-[#0E4F52]/15 to-transparent" />

        <div className="relative z-10 px-6 w-full">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#E1704B] mb-4 animate-fade-up">
            New Collection · 2025
          </p>
          <h1 className="font-serif text-5xl text-white leading-[0.95] mb-5 animate-fade-up delay-200">
            Wear<br />the Island.
          </h1>
          <p className="font-sans text-sm text-white/70 mb-7 max-w-xs leading-relaxed animate-fade-up delay-300">
            Coastal fashion born in Hikkaduwa. Linen, cotton, and handcraft.
          </p>
          <Link
            href="/collections/linen-edit"
            className="inline-block bg-white text-[#0E4F52] font-sans text-xs tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[#F4EDE1] transition-colors animate-fade-up delay-400"
          >
            Shop Collection
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 scroll-bounce">
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" style={{ opacity: 0.5 }}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── TRUST MARQUEE STRIP ─────────────────────────── */}
      <div className="bg-[#F4EDE1] border-b border-[#E7DCC8] overflow-hidden py-3">
        <div className="marquee-track flex items-center whitespace-nowrap">
          {[...trustItems, ...trustItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 px-7 font-sans text-[11px] tracking-[0.16em] text-[#0E4F52]"
            >
              <span className="text-[#E1704B]" style={{ fontSize: "7px" }}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── NEW IN ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/45 mb-2">
                Just Arrived
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52]">New In</h2>
            </div>
            <Link
              href="/search?filter=new"
              className="font-sans text-xs tracking-widest uppercase text-[#0E4F52] border-b border-[#0E4F52] pb-0.5 hover:text-[#2E7D7B] transition-colors hidden md:block"
            >
              View All New
            </Link>
          </div>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden -mx-0 px-4 sm:px-6">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3">
            {newIn.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[72vw] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/search?filter=new"
              className="font-sans text-xs tracking-widest uppercase text-[#0E4F52] border-b border-[#0E4F52] pb-0.5"
            >
              View All New
            </Link>
          </div>
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-4 gap-6">
            {newIn.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS (EDITORIAL GRID) ────────────────── */}
      <section className="bg-[#F4EDE1] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/45 mb-2">
              Browse
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52]">
              Our Collections
            </h2>
          </div>

          {/* Desktop: editorial asymmetric grid */}
          <div
            className="hidden md:grid gap-2"
            style={{ gridTemplateColumns: "5fr 7fr", height: "600px" }}
          >
            {/* Featured: Linen Edit */}
            <Link
              href={`/collections/${collections[0]?.slug ?? "linen-edit"}`}
              className="group relative overflow-hidden"
            >
              <Image
                src={collections[0]?.image ?? ""}
                alt={collections[0]?.imageAlt ?? ""}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="40vw"
              />
              <div className="absolute inset-0 bg-[#0E4F52]/20 group-hover:bg-[#0E4F52]/45 transition-colors duration-400" />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/60 mb-2">
                    Collection
                  </p>
                  <h3 className="font-serif text-3xl text-white leading-tight">
                    {collections[0]?.name}
                  </h3>
                  <p className="font-sans text-xs text-white/60 mt-3 leading-relaxed max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {collections[0]?.description?.slice(0, 70)}…
                  </p>
                  <span className="mt-4 inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>

            {/* Right: 3 collections */}
            <div className="grid gap-2" style={{ gridTemplateRows: "1fr 1fr" }}>
              {/* Top row: 2 collections */}
              <div className="grid grid-cols-2 gap-2">
                {collections.slice(1, 3).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    className="group relative overflow-hidden"
                  >
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="28vw"
                    />
                    <div className="absolute inset-0 bg-[#0E4F52]/20 group-hover:bg-[#0E4F52]/45 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <p className="font-sans text-[9px] tracking-widest uppercase text-white/55 mb-1">
                          Collection
                        </p>
                        <h3 className="font-serif text-xl text-white">{c.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Bottom: full-width Accessories */}
              <Link
                href={`/collections/${collections[3]?.slug ?? "accessories"}`}
                className="group relative overflow-hidden"
              >
                <Image
                  src={collections[3]?.image ?? ""}
                  alt={collections[3]?.imageAlt ?? ""}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="55vw"
                />
                <div className="absolute inset-0 bg-[#0E4F52]/20 group-hover:bg-[#0E4F52]/45 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center px-8">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/60 mb-2">
                      Collection
                    </p>
                    <h3 className="font-serif text-3xl text-white">
                      {collections[3]?.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile: 2x2 grid */}
          <div className="grid md:hidden grid-cols-2 gap-2">
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
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E4F52]/65 via-[#0E4F52]/10 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/55 mb-1">
                      Collection
                    </p>
                    <h3 className="font-serif text-lg text-white leading-tight">{c.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES / PILLARS ──────────────────────────── */}
      <section className="py-14 border-b border-[#E7DCC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-[#E7DCC8]">
            {[
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="#0E4F52" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 16s0 2 2 2h14c2 0 2-2 2-2" strokeLinecap="round" />
                  </svg>
                ),
                title: "Islandwide Delivery",
                sub: "Free on orders over Rs 5,000. Delivered in 2–4 business days.",
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="#0E4F52" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M9 14l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 10h11a4 4 0 010 8h-1" strokeLinecap="round" />
                  </svg>
                ),
                title: "Easy Returns",
                sub: "14-day hassle-free returns. No questions asked.",
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="#0E4F52" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" />
                  </svg>
                ),
                title: "Made in Sri Lanka",
                sub: "Every piece handcrafted by local artisans on the south coast.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center md:px-12"
              >
                <div className="w-12 h-12 rounded-full bg-[#F4EDE1] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg text-[#0E4F52] mb-1.5">{f.title}</h3>
                <p className="font-sans text-xs text-[#1F2A2B]/55 leading-relaxed max-w-[200px]">
                  {f.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/45 mb-2">
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
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden px-4 sm:px-6">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3">
            {bestSellers.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[72vw] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/search?filter=bestseller"
              className="font-sans text-xs tracking-widest uppercase text-[#0E4F52] border-b border-[#0E4F52] pb-0.5"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ─────────────────────────────────── */}
      <section className="bg-[#0E4F52]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&q=80"
              alt="Island Mantra — Hikkaduwa boutique"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay quote */}
            <div className="absolute inset-0 bg-[#0E4F52]/30" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-serif text-2xl md:text-3xl text-white/90 leading-snug italic">
                "Unhurried, intentional,<br />and rooted in the landscape."
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-snug mb-6">
              Born on the<br />South Coast
            </h2>
            <p className="font-sans text-sm text-white/65 leading-relaxed mb-4">
              Island Mantra began with a simple idea: that clothes should feel as good as the moment you&apos;re in. We design each piece with the pace of Sri Lankan coastal life in mind.
            </p>
            <p className="font-sans text-sm text-white/65 leading-relaxed mb-10">
              Everything is made locally, with natural fabrics and a commitment to craft. No fast fashion, no shortcuts.
            </p>
            {/* Stats row */}
            <div className="flex gap-10 mb-10 border-t border-white/10 pt-8">
              {[
                { num: "100%", label: "Natural fabrics" },
                { num: "2025", label: "Founded" },
                { num: "SL", label: "Made here" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl text-white">{s.num}</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-white/40 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="self-start font-sans text-xs tracking-[0.2em] uppercase text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM STRIP ─────────────────────────────── */}
      <section className="py-16 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/45 mb-2">
              Follow Along
            </p>
            <h2 className="font-serif text-2xl text-[#0E4F52]">@islandmantra.lk</h2>
            <p className="font-sans text-xs text-[#1F2A2B]/45 mt-2">
              Tag us to be featured
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {instagramImages.map((img, i) => (
              <a
                key={i}
                href="https://instagram.com/islandmantra.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group block"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-108"
                  sizes="(max-width: 640px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-[#0E4F52]/0 group-hover:bg-[#0E4F52]/35 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
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

      {/* ── NEWSLETTER ──────────────────────────────────── */}
      <section className="bg-[#0E4F52] py-20 relative overflow-hidden">
        {/* Decorative circle */}
        <div
          className="absolute -right-24 -top-24 w-64 h-64 rounded-full"
          style={{ background: "rgba(46,125,123,0.3)" }}
        />
        <div
          className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full"
          style={{ background: "rgba(225,112,75,0.15)" }}
        />

        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3 leading-snug">
            Join the Island
          </h2>
          <p className="font-sans text-sm text-white/55 mb-9 leading-relaxed">
            New arrivals, stories from Hikkaduwa, and exclusive offers — straight to your inbox.
          </p>
          <NewsletterForm />
          <p className="font-sans text-[11px] text-white/30 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
