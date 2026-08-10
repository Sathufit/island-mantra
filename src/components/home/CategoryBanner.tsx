import Image from "next/image";
import Link from "next/link";
import { type Category } from "@/src/lib/data/categories";

export default function CategoryBanner({ categories }: { categories: Category[] }) {
  return (
    <section className="py-16 md:py-24 bg-[#F4EDE1]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group relative aspect-[3/4] overflow-hidden block bg-[#0A0A0A]"
            >
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent group-hover:from-black/70 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="font-serif text-xl md:text-2xl text-white mb-2">{c.name}</h3>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/60 pb-0.5">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
