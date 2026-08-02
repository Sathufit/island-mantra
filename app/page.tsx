import Image from "next/image";
import Link from "next/link";
import {
  getCollections,
  getFeaturedProducts,
  getBestSellers,
} from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";
import NewsletterForm from "@/src/components/ui/NewsletterForm";

const instagramImages = [
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", alt: "Hikkaduwa beach" },
  { src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80", alt: "Coastal fashion" },
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", alt: "Island Mantra style" },
  { src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", alt: "Linen collection" },
  { src: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&q=80", alt: "Resort wear" },
  { src: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80", alt: "Hikkaduwa boutique" },
];

export default async function HomePage() {
  const [collections, newIn, bestSellers] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
    getBestSellers(),
  ]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}

      {/* Desktop: split panel — portrait image sits perfectly in tall right column */}
      <section
        className="hidden md:grid"
        style={{ gridTemplateColumns: "42% 58%", height: "96vh", minHeight: "640px" }}
      >
        {/* Left: text */}
        <div className="bg-[#0E4F52] flex flex-col justify-end px-14 xl:px-20 pb-16">
          <h1 className="font-serif text-white leading-[0.86]"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 6.5rem)" }}>
            Wear<br />the<br />Island.
          </h1>
          <p className="font-sans text-sm text-white/50 mt-6 mb-8 leading-relaxed max-w-[260px]">
            Coastal fashion born in Hikkaduwa. Linen, cotton, and handcraft.
          </p>
          <Link
            href="/collections/linen-edit"
            className="self-start font-sans text-xs tracking-[0.22em] uppercase text-white/75 border-b border-white/35 pb-px hover:text-white hover:border-white transition-colors"
          >
            Shop Collection
          </Link>
          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/25 mt-10">
            Hikkaduwa · Sri Lanka
          </p>
        </div>

        {/* Right: image — portrait image fills tall column naturally */}
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1702905060470-3711d2ec6a97?w=1200&q=90"
            alt="Island Mantra coastal fashion — model in flowing white dress on the shore"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "60% 55%" }}
            sizes="58vw"
          />
        </div>
      </section>

      {/* Mobile: full-bleed beach hero */}
      <section className="md:hidden relative h-screen min-h-[580px] flex items-end pb-14">
        <Image
          src="https://images.unsplash.com/photo-1702905060470-3711d2ec6a97?w=1000&q=90"
          alt="Island Mantra coastal fashion — model in flowing white dress on the shore"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "58% center" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="relative z-10 px-7 w-full">
          <h1 className="font-serif text-[3.25rem] text-white leading-[0.9] mb-5">
            Wear<br />the Island.
          </h1>
          <Link
            href="/collections/linen-edit"
            className="inline-block font-sans text-xs tracking-[0.22em] uppercase text-white/75 border-b border-white/35 pb-px hover:text-white transition-colors"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* ── NEW IN ───────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1F2A2B]">New In</h2>
            <Link
              href="/search?filter=new"
              className="font-sans text-xs tracking-[0.18em] uppercase text-[#1F2A2B]/50 hover:text-[#0E4F52] transition-colors"
            >
              All New
            </Link>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden px-5 sm:px-8">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {newIn.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-[72vw] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-4 gap-5 xl:gap-7">
            {newIn.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE BREAK ───────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "clamp(260px, 45vh, 560px)" }}>
        <Image
          src="https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=1800&q=85"
          alt="Island Mantra — south coast"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── COLLECTIONS ──────────────────────────────── */}
      <section className="bg-[#F4EDE1] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1F2A2B]">Collections</h2>
            <Link
              href="/search"
              className="font-sans text-xs tracking-[0.18em] uppercase text-[#1F2A2B]/50 hover:text-[#0E4F52] transition-colors"
            >
              All
            </Link>
          </div>

          {/* Desktop: editorial asymmetric grid */}
          <div className="hidden md:grid gap-2" style={{ gridTemplateColumns: "5fr 7fr", height: "580px" }}>
            <Link href={`/collections/${collections[0]?.slug ?? "linen-edit"}`}
              className="group relative overflow-hidden">
              <Image src={collections[0]?.image ?? ""} alt={collections[0]?.imageAlt ?? ""}
                fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="40vw" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-7 left-7">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">Collection</p>
                <h3 className="font-serif text-2xl text-white">{collections[0]?.name}</h3>
              </div>
            </Link>

            <div className="grid gap-2" style={{ gridTemplateRows: "1fr 1fr" }}>
              <div className="grid grid-cols-2 gap-2">
                {collections.slice(1, 3).map((c) => (
                  <Link key={c.slug} href={`/collections/${c.slug}`}
                    className="group relative overflow-hidden">
                    <Image src={c.image} alt={c.imageAlt} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="28vw" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-5 left-5">
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1">Collection</p>
                      <h3 className="font-serif text-lg text-white">{c.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/collections/${collections[3]?.slug ?? "accessories"}`}
                className="group relative overflow-hidden">
                <Image src={collections[3]?.image ?? ""} alt={collections[3]?.imageAlt ?? ""}
                  fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="55vw" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-7 left-7">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">Collection</p>
                  <h3 className="font-serif text-2xl text-white">{collections[3]?.name}</h3>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile 2×2 */}
          <div className="grid md:hidden grid-cols-2 gap-2">
            {collections.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`}
                className="group relative aspect-[3/4] overflow-hidden">
                <Image src={c.image} alt={c.imageAlt} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-serif text-lg text-white">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1F2A2B]">Best Sellers</h2>
            <Link
              href="/search?filter=bestseller"
              className="font-sans text-xs tracking-[0.18em] uppercase text-[#1F2A2B]/50 hover:text-[#0E4F52] transition-colors"
            >
              All
            </Link>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden px-5 sm:px-8">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {bestSellers.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-[72vw] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-4 gap-5 xl:gap-7">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────── */}
      <section className="bg-[#0E4F52]">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&q=80"
              alt="Island Mantra, Hikkaduwa"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-8 md:px-14 xl:px-20 py-16">
            <h2 className="font-serif text-3xl md:text-[2.5rem] text-white leading-snug mb-6">
              We started in<br />Hikkaduwa.
            </h2>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-3">
              A small space on Galle Road, a handful of linen pieces, one dress that sold out before we&apos;d properly unpacked.
            </p>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-10">
              Island Mantra grew from that. Clothes for the life here — loose, breathable, made by people who know the coast. Everything produced in Sri Lanka. No shortcuts.
            </p>
            <Link
              href="/about"
              className="self-start font-sans text-xs tracking-[0.2em] uppercase text-white/70 border-b border-white/30 pb-px hover:text-white hover:border-white transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── DELIVERY / RETURNS ───────────────────────── */}
      <section className="border-t border-[#E7DCC8] py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-[#E7DCC8] text-center">
            {[
              { title: "Islandwide Delivery", body: "Free on orders over Rs 5,000. Arrives in 2–4 business days." },
              { title: "Easy Returns", body: "14 days, no questions. We sort the rest." },
              { title: "Made in Sri Lanka", body: "Every piece made on the south coast, by hand." },
            ].map((item) => (
              <div key={item.title} className="md:px-12">
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#1F2A2B] mb-2">{item.title}</h3>
                <p className="font-sans text-xs text-[#1F2A2B]/50 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#1F2A2B]/40 text-center mb-8">
            @islandmantra.lk
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {instagramImages.map((img, i) => (
              <a
                key={i}
                href="https://instagram.com/islandmantra.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group block"
              >
                <Image src={img.src} alt={img.alt} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────── */}
      <section className="bg-[#0E4F52] py-20">
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
