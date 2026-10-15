"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { type ProductImage } from "@/src/lib/data/products";
import { UnrollImage } from "@/src/components/motion/Reveal";

interface Props {
  images: ProductImage[];
  productName: string;
}

/**
 * Mobile: full-width swipe gallery with a counter.
 * Desktop: one large photo with thumbnails to switch between them.
 */
export default function ProductGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  if (images.length === 0) {
    return <div className="aspect-[3/4] bg-sand" aria-hidden />;
  }

  return (
    <>
      {/* Mobile */}
      <div className="relative md:hidden">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory overflow-x-auto sm:-mx-8"
        >
          {images.map((img, i) => (
            <div key={img.src + i} className="relative aspect-[3/4] w-full flex-shrink-0 snap-start bg-sand">
              <Image
                src={img.src}
                alt={img.alt || `${productName} — image ${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-px transition-all duration-500 ${i === active ? "w-6 bg-ink" : "w-3 bg-ink/30"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: thumbnails beside one large photo, so the gallery is about as
          tall as the details and the page scrolls as one */}
      <div className="hidden gap-3 md:flex">
        {images.length > 1 && (
          <div className="flex w-20 flex-shrink-0 flex-col gap-3">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                onClick={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={`relative aspect-[3/4] overflow-hidden bg-sand transition-opacity duration-500 ${
                  i === active ? "opacity-100 ring-1 ring-ink ring-offset-2 ring-offset-linen" : "opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <UnrollImage className="relative aspect-[4/5] max-h-[calc(100vh-7rem)] flex-1 overflow-hidden bg-sand" delay={0.1}>
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              // The new photo washes up over the old one, which stays put underneath
              // until it's covered (instead of leaving a blank frame).
              style={{ zIndex: 2 }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ zIndex: 1, transition: { duration: 0.7 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={images[active].src}
                alt={images[active].alt || `${productName} — image ${active + 1}`}
                fill
                priority={active === 0}
                sizes="(min-width: 1280px) 640px, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {images.length > 1 && (
            <span className="label absolute bottom-4 right-4 z-10 bg-paper/85 px-2 py-1 text-ink">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          )}
        </UnrollImage>
      </div>
    </>
  );
}
