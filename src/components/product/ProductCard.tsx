"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/src/lib/data/products";
import { formatPrice } from "@/src/lib/utils";
import Badge from "@/src/components/ui/Badge";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const image = product.images[0];
  const hoverImage = product.images[1] ?? product.images[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F4EDE1]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <Image
          src={hoverImage.src}
          alt={hoverImage.alt}
          fill
          className="object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.compareAtPrice && <Badge variant="sale">Sale</Badge>}
          {product.isBestSeller && !product.isNew && (
            <Badge variant="bestseller">Best Seller</Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <p className="font-sans text-[10px] tracking-widest uppercase text-[#1F2A2B]/50 mb-1">
          {product.collectionName}
        </p>
        <h3 className="font-serif text-base text-[#1F2A2B] leading-snug">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="font-sans text-sm font-medium text-[#0E4F52]">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="font-sans text-xs text-[#1F2A2B]/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        {/* Colour dots */}
        {product.variants.length > 1 && (
          <div className="flex gap-1.5 mt-2">
            {product.variants.map((v) => (
              <span
                key={v.color}
                title={v.color}
                className="w-3 h-3 rounded-full border border-[#E7DCC8] flex-shrink-0"
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
