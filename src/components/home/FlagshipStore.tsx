"use client";

import Image from "next/image";
import { storeInfo } from "@/src/lib/data/store-info";
import { useIslandNow } from "@/src/lib/island";
import { Magnetic, MaskLine, Parallax, Reveal, UnrollImage } from "@/src/components/motion/Reveal";
import TideLine from "@/src/components/motion/TideLine";

/** Section 7 — store photo on the left, details panel on the right, with live store status. */
export default function FlagshipStore() {
  const island = useIslandNow();

  return (
    <section aria-labelledby="flagship-heading" className="px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        <UnrollImage className="relative aspect-[4/3] overflow-hidden bg-sand md:aspect-auto md:min-h-[620px]">
          <Parallax amount={8}>
            <Image
              src="https://images.unsplash.com/photo-1770550145372-b055bf691a87?w=1600&q=75"
              alt="The Island Mantra flagship store on Galle Road, Hikkaduwa"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </Parallax>
          {/* Live status chip */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 bg-paper/90 px-3 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              {island?.isOpen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-70" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${island?.isOpen ? "bg-saffron" : "bg-muted"}`} />
            </span>
            <span className="label text-ink">
              {island ? (island.isOpen ? `Open now · ${island.storeNote}` : `Closed · ${island.storeNote}`) : "Hikkaduwa"}
            </span>
          </div>
        </UnrollImage>

        <div className="flex items-center bg-paper px-6 py-14 sm:px-12 md:px-16 lg:px-24">
          <div className="w-full max-w-md">
            <h2 id="flagship-heading" className="caps text-[13px] font-medium sm:text-[14px]">
              <MaskLine>Visit Our Flagship Store</MaskLine>
            </h2>
            <p className="tagline mt-4 text-[clamp(2.4rem,4vw,3.6rem)] leading-none">
              <MaskLine delay={0.1}>Step into the island.</MaskLine>
            </p>
            <TideLine className="mt-6" />
            <Reveal delay={0.15}>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                Run your fingers over the linen, find your perfect fit and stay a while. Our team will help you
                build a wardrobe for wherever the season takes you.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 text-[14px]">
                <div className="col-span-2">
                  <dt className="label text-muted">Address</dt>
                  <dd className="mt-1.5">{storeInfo.address}</dd>
                </div>
                <div>
                  <dt className="label text-muted">Opening hours</dt>
                  <dd className="mt-1.5">{storeInfo.hours}</dd>
                </div>
                <div>
                  <dt className="label text-muted">Sunset today</dt>
                  <dd className="mt-1.5 tabular-nums">{island ? `${island.sunset} — stay for it` : "—"}</dd>
                </div>
              </dl>
              <Magnetic className="mt-10">
                <a href={storeInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  <span>Get Directions</span>
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
