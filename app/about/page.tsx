import Image from "next/image";
import type { Metadata } from "next";
import { RiseWords, Reveal, UnrollImage } from "@/src/components/motion/Reveal";
import TideLine from "@/src/components/motion/TideLine";

export const metadata: Metadata = {
  title: "About Us",
  description: "Island Mantra — a summer wear brand that is truly Sri Lankan. Born of the island. Made for the world.",
};

const pillars = [
  {
    title: "Made to Move",
    body: "An islander’s carefree life always makes room for a day at the beach, a hike through a tropical rainforest or a lazy paddle down a river. So every Island Mantra garment is designed to let you move with ease – and look wonderful doing it.",
    image: "https://images.unsplash.com/photo-1710286145813-61acc1844cac?w=1400&q=75",
    imageAlt: "Woman in a white dress standing in shallow sea water",
  },
  {
    title: "Made for the Elements",
    body: "Island life means scorching sun, salty sea breeze and sudden tropical downpours. That is why we craft our pieces from sustainably sourced premium fabrics, chosen to endure the elements season after season while keeping you completely comfortable.",
    image: "https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?w=1400&q=75",
    imageAlt: "Coconut palms against a golden-hour sky",
  },
  {
    title: "Made by Island Hands",
    body: "Compassion and inclusivity sit at the heart of island communities, and they sit at the heart of ours. Every Island Mantra piece is crafted by skilled local artisans – the majority of them women – whose talent and care you can feel in every seam.",
    image: "https://images.unsplash.com/photo-1780504542528-b950bc6c6b39?w=1400&q=75",
    imageAlt: "An artisan’s hands stitching a garment",
  },
  {
    title: "Made Slowly",
    body: "A slower pace of life is one of the island’s greatest gifts. We bring that same unhurried spirit to how we make our clothes: free from rushed deadlines and unethical production practices. The result is a collection of unique pieces made for responsible global citizens – people who want to look good and feel good about what they wear.",
    image: "https://images.unsplash.com/photo-1769107805511-0bb7075fca27?w=1400&q=75",
    imageAlt: "Linen pieces on display in a bright boutique",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative flex h-[78svh] min-h-[480px] items-center justify-center overflow-hidden bg-ink">
        <div className="ken-burns absolute inset-0" style={{ animationDuration: "20s" }}>
          <Image
            src="https://images.unsplash.com/photo-1529348915581-73628f0cf212?w=2000&q=75"
            alt="Two coconut palms silhouetted over the sea at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 px-6 text-center text-white">
          <h1 className="label text-white/80">(About Us)</h1>
          <p className="tagline mt-5 text-[clamp(2.6rem,7.5vw,7rem)] leading-[0.95]">
            <RiseWords text="Born of the island. Made for the world." delay={0.3} />
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="px-4 py-24 sm:px-8 md:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="caps text-[13px] font-medium">Our Story</h2>
          <TideLine className="mx-auto mt-5" />
          <p className="tagline mt-10 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-snug">
            Island Mantra began with one simple wish: to create a summer wear brand that is truly Sri Lankan –
            one that carries the genuine spirit of island life in every piece.
          </p>
          <p className="mx-auto mt-8 max-w-xl text-[16px] leading-[1.8] text-ink-soft">
            Whether you are escaping on an exotic holiday or heading into an ordinary workday, our timeless
            pieces let you stand out with an effortless, elegant island allure.
          </p>
        </Reveal>
      </section>

      {/* Made to move / for the elements / by island hands / slowly */}
      <section className="px-4 pb-24 sm:px-8 md:pb-36">
        <div className="mx-auto max-w-[1280px] space-y-20 md:space-y-32">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <UnrollImage className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </UnrollImage>
              <Reveal className="max-w-md">
                <span className="label text-saffron-deep">(0{i + 1})</span>
                <h3 className="display mt-4 text-[clamp(2.4rem,4.5vw,4rem)] uppercase">{p.title}</h3>
                <p className="mt-5 text-[16px] leading-[1.8] text-ink-soft">{p.body}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* Closing line */}
      <section className="bg-sand px-4 py-24 text-center sm:px-8 md:py-32">
        <Reveal>
          <p className="tagline text-[clamp(2rem,5vw,4rem)] leading-tight">Sun-kissed. Salt-tested. Island-made.</p>
          <TideLine className="mx-auto mt-8" />
        </Reveal>
      </section>
    </>
  );
}
