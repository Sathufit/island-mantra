import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Island Mantra — a boutique born in Hikkaduwa, Sri Lanka. The story behind the brand.",
};

export default function AboutPage() {
  return (
    <div className="pt-0">
      {/* Full-bleed hero — starts at y=0, sits behind the fixed bar */}
      <div className="relative h-80 md:h-[500px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1551803091-e20673f15770?w=1600&q=85"
          alt="Island Mantra boutique in Hikkaduwa, Sri Lanka"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E4F52]/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/70 mb-3">
            About Us
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-white">
            Our Story
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/40 mb-4">
          Hikkaduwa, Sri Lanka
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52] mb-8 leading-snug">
          Born from the rhythm<br />of the south coast
        </h2>
        <div className="space-y-5 font-sans text-base text-[#1F2A2B]/80 leading-relaxed">
          <p>
            Island Mantra was born out of a simple frustration: great design shouldn&apos;t have to be imported. Sri Lanka has sun, sea, extraordinary craft traditions, and an island culture that the world pays premium prices to experience — so why wasn&apos;t there a local brand that reflected all of that, properly?
          </p>
          <p>
            We opened our doors in Hikkaduwa, on the Galle Road that hugs the southwestern coastline. Our first collection was small — a handful of linen pieces and one dress that we couldn&apos;t keep in stock. From that, Island Mantra grew.
          </p>
          <p>
            Everything we make is designed in Hikkaduwa and produced in Sri Lanka, working with local manufacturers and artisans who share our commitment to quality and fair practice. We use natural fabrics — linen, organic cotton, TENCEL — because they are better for the island we live on, and they simply wear better in a tropical climate.
          </p>
          <p>
            Our design philosophy is straightforward: clothes should be beautiful, easy to wear, and made to last. We don&apos;t chase trends. We build pieces around the life our customers actually live — beach mornings, afternoon markets, evening dinners, long coast road drives.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F4EDE1] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl text-[#0E4F52]">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Made Locally",
                body: "Every garment is designed and produced in Sri Lanka. We work exclusively with local manufacturers and artisans, keeping the craft and the value on the island.",
              },
              {
                title: "Natural Fabrics",
                body: "Linen, organic cotton, TENCEL, and seagrass. We choose materials that breathe in the heat, get better with wear, and don't cost the earth.",
              },
              {
                title: "Slow Fashion",
                body: "We release new pieces when they're ready, not to a trend calendar. Our pieces are designed to outlast seasons — buy less, choose well, make it last.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center px-4">
                <h3 className="font-serif text-xl text-[#0E4F52] mb-4">{v.title}</h3>
                <p className="font-sans text-sm text-[#1F2A2B]/70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80"
              alt="Linen collection made in Sri Lanka"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80"
                alt="Handmade accessories"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80"
                alt="Coastal dresses"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-square md:col-span-2 md:aspect-[2/1]">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80"
                alt="Island lifestyle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0E4F52] py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Come Find Us in Hikkaduwa
          </h2>
          <p className="font-sans text-sm text-white/70 leading-relaxed mb-8">
            We&apos;re on Galle Road, right on the coast. Come in, feel the fabrics, and try things on.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-white text-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-[#0E4F52] transition-colors"
          >
            Get Directions & Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
