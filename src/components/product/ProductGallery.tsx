"use client";

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
            className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 bg-[#F4EDE1] transition-colors ${
              active === i ? "border-[#0A0A0A]" : "border-transparent"
            }`}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>

      {/* Main image placeholder */}
      <div
        className="relative flex-1 aspect-[3/4] md:aspect-auto md:min-h-[600px] bg-[#F4EDE1] overflow-hidden"
        aria-label={`${productName} — image ${active + 1}`}
      />
    </div>
  );
}
