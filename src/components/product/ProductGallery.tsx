"use client";

import Image from "next/image";
import { useState } from "react";
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
            className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-colors ${
              active === i ? "border-[#0E4F52]" : "border-transparent"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-[3/4] md:aspect-auto md:min-h-[600px] bg-[#F4EDE1] overflow-hidden">
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>
    </div>
  );
}
