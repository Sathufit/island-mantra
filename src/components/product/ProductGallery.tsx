"use client";

import { useState } from "react";
import Image from "next/image";
import { type ProductImage } from "@/src/lib/data/products";

interface Props {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:w-20">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 bg-[#F4EDE1] transition-colors ${
              active === i ? "border-[#0A0A0A]" : "border-transparent"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt || `${productName} thumbnail ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        className="relative flex-1 aspect-[3/4] md:aspect-auto md:min-h-[600px] bg-[#F4EDE1] overflow-hidden"
        aria-label={`${productName} — image ${active + 1}`}
      >
        {images[active] && (
          <Image
            key={active}
            src={images[active].src}
            alt={images[active].alt || `${productName} — image ${active + 1}`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
