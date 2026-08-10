import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Island Mantra — a boutique born in Hikkaduwa, Sri Lanka.",
};

export default function AboutPage() {
  return (
    <div className="pt-0">
      {/* Hero */}
      <div className="relative flex items-end bg-[#0A0A0A] overflow-hidden" style={{ height: "clamp(300px, 55vh, 600px)" }}>
        <Image
          src="https://images.unsplash.com/photo-1784537642955-9d371c0cbf91?w=1800&q=80"
          alt="Warmly lit boutique interior with linen clothing racks and plants"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="relative z-10 px-8 md:px-14 pb-12 md:pb-16 w-full">
          <h1 className="font-serif text-white leading-tight"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}>
            Our Story
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-2xl mx-auto px-8 py-20 md:py-28">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/40 mb-8">
          Hikkaduwa, Sri Lanka
        </p>
        <div className="space-y-6 font-sans text-base text-[#0A0A0A]/75 leading-[1.8]">
          <p>
            We started with a small space on Galle Road and a handful of linen pieces. One dress sold out before we&apos;d properly unpacked.
          </p>
          <p>
            The idea was straightforward: clothes that actually fit the life here. Loose. Breathable. Things you reach for every day — on the beach in the morning, at dinner by the water at night.
          </p>
          <p>
            Everything is made in Sri Lanka, with manufacturers and craftspeople on the south coast who we know by name. We use natural fibres — linen, organic cotton, TENCEL — because they perform better in this climate and last longer than the alternative.
          </p>
          <p>
            We don&apos;t follow a seasonal calendar. We make things when they&apos;re ready, and we keep making them as long as people want them. That&apos;s the whole model.
          </p>
        </div>
      </section>

      {/* Image grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="relative aspect-[4/3] bg-[#F4EDE1] border border-[#E7DCC8] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1769107805511-0bb7075fca27?w=1200&q=80"
              alt="Bright boutique interior with linen dresses on display"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square bg-[#F4EDE1] border border-[#E7DCC8] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1780504542528-b950bc6c6b39?w=800&q=80"
                alt="Craftsperson's hands hand-stitching a garment"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square bg-[#F4EDE1] border border-[#E7DCC8] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80"
                alt="Palm trees framing a turquoise tropical beach"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[2/1] col-span-2 bg-[#F4EDE1] border border-[#E7DCC8] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1762450322458-f6fa50c88b4f?w=1200&q=80"
                alt="White coastal building with palm trees, elevated view"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What we stand for — plain text, no icons */}
      <section className="bg-[#F4EDE1] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {[
              {
                title: "Made here",
                body: "Designed in Hikkaduwa, produced in Sri Lanka. We work with local manufacturers and craftspeople — people we've worked with since the beginning.",
              },
              {
                title: "Natural fibres",
                body: "Linen, organic cotton, TENCEL, seagrass. Materials that breathe in the heat, age well, and don't cost the environment more than they should.",
              },
              {
                title: "No seasons",
                body: "We don't release collections on a trend calendar. New pieces come out when they're ready. Our best sellers stay until they shouldn't.",
              },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="font-sans text-xs tracking-[0.22em] uppercase text-[#0A0A0A] mb-4">{v.title}</h3>
                <p className="font-sans text-sm text-[#0A0A0A]/65 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-16">
        <div className="max-w-xl mx-auto px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Come in.</h2>
          <p className="font-sans text-sm text-white/55 leading-relaxed mb-8">
            22 Galle Road, Hikkaduwa. Open every day.
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-white border-b border-white/40 pb-px hover:border-white transition-colors"
          >
            Find Us
          </Link>
        </div>
      </section>
    </div>
  );
}
