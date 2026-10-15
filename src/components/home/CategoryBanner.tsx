import Image from "next/image";
import Link from "next/link";
import { type Category } from "@/src/lib/data/categories";
import { MaskLine, Parallax, UnrollImage } from "@/src/components/motion/Reveal";

/** Section 5 — four category pictures in a 2 × 2 grid with title, line and button. */
export default function CategoryBanner({ categories }: { categories: Category[] }) {
  return (
    <section aria-label="Shop by category" className="px-4 sm:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 md:gap-4">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            data-cursor={c.cta}
            className="group relative block aspect-[4/5] overflow-hidden bg-lagoon sm:aspect-[16/11] md:aspect-[5/4]"
          >
            <UnrollImage className="absolute inset-0" delay={(i % 2) * 0.12}>
              <Parallax amount={10}>
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
              </Parallax>
            </UnrollImage>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            {/* Thambili glow that warms the tile on hover — golden hour */}
            <div className="absolute inset-0 hidden bg-gradient-to-t from-saffron/45 via-saffron/0 to-transparent opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100 [@media(hover:hover)]:block" />

            <div className="absolute inset-x-0 top-0 flex justify-between p-6 text-white/75 sm:p-8">
              <span className="label">({String(i + 1).padStart(2, "0")})</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 md:p-10">
              <h2 className="display text-[clamp(2.8rem,6vw,5.5rem)] uppercase">
                <MaskLine>{c.name}</MaskLine>
              </h2>
              <p className="tagline mt-2 text-xl sm:text-2xl">{c.tagline}</p>
              <span className="btn btn-outline-light mt-6 min-h-[44px] px-7">
                <span>{c.cta}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
