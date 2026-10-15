"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { type ProductImage } from "@/src/lib/data/products";
import { UnrollImage } from "@/src/components/motion/Reveal";

interface Props {
  images: ProductImage[];
  productName: string;
}

/**
 * Mobile: full-width swipe gallery with a counter.
 * Desktop: images stacked in an editorial column beside the sticky details.
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

      {/* Desktop */}
      <div className="hidden gap-3 md:grid">
        {images.map((img, i) => (
          <UnrollImage key={img.src + i} className="relative aspect-[3/4] overflow-hidden bg-sand" delay={i === 0 ? 0.1 : 0}>
            <Image
              src={img.src}
              alt={img.alt || `${productName} — image ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1280px) 720px, 55vw"
              className="object-cover"
            />
          </UnrollImage>
        ))}
      </div>
    </>
  );
}
