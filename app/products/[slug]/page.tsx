"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getRelatedProducts } from "@/src/lib/api";
import { type Product } from "@/src/lib/data/products";
import { useCart } from "@/src/store/cart";
import { formatPrice } from "@/src/lib/utils";
import ProductGallery from "@/src/components/product/ProductGallery";
import BNPLBadge from "@/src/components/product/BNPLBadge";
import ProductCard from "@/src/components/product/ProductCard";
import SizeGuideModal from "@/src/components/product/SizeGuideModal";
import Badge from "@/src/components/ui/Badge";

type AccordionKey = "description" | "fabric" | "shipping";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<AccordionKey>("description");
  const [addedMessage, setAddedMessage] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    getProduct(slug).then((p) => {
      if (!p) return notFound();
      setProduct(p);
      setSelectedSize(p.sizes[0] ?? "");
      setSelectedColor(p.variants[0]?.color ?? "");
      getRelatedProducts(p.relatedSlugs).then(setRelated);
    });
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;
    addItem({
      productSlug: product.slug,
      productName: product.name,
      price: product.price,
      image: product.images[0].src,
      imageAlt: product.images[0].alt,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const toggleAccordion = (key: AccordionKey) => {
    setOpenAccordion((prev) => (prev === key ? "description" : key));
  };

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <p className="font-sans text-sm text-[#1F2A2B]/50">Loading…</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="font-sans text-xs tracking-widest uppercase text-[#1F2A2B]/50 mb-8 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#0E4F52] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.collectionSlug}`}
            className="hover:text-[#0E4F52] transition-colors"
          >
            {product.collectionName}
          </Link>
          <span>/</span>
          <span className="text-[#1F2A2B]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.compareAtPrice && <Badge variant="sale">Sale</Badge>}
              {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
            </div>

            <p className="font-sans text-xs tracking-widest uppercase text-[#1F2A2B]/50 mb-2">
              {product.collectionName}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1F2A2B] mb-4 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-3">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif text-2xl text-[#0E4F52]">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="font-sans text-sm text-[#1F2A2B]/40 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <BNPLBadge price={product.price} />
            </div>

            <div className="border-t border-[#E7DCC8] my-5" />

            {/* Colour */}
            <div className="mb-5">
              <p className="font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-3">
                Colour: <span className="font-medium">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.color}
                    title={v.color}
                    onClick={() => setSelectedColor(v.color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === v.color
                        ? "border-[#0E4F52] scale-110"
                        : "border-transparent hover:border-[#E7DCC8]"
                    }`}
                    style={{ backgroundColor: v.colorHex }}
                    aria-label={v.color}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            {product.sizes[0] !== "One Size" && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-sans text-xs tracking-widest uppercase text-[#1F2A2B]">
                    Size: <span className="font-medium">{selectedSize}</span>
                  </p>
                  <SizeGuideModal />
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 font-sans text-xs border transition-colors ${
                        selectedSize === size
                          ? "border-[#0E4F52] bg-[#0E4F52] text-white"
                          : "border-[#E7DCC8] text-[#1F2A2B] hover:border-[#0E4F52]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-3">
                Quantity
              </p>
              <div className="flex items-center border border-[#E7DCC8] w-fit">
                <button
                  className="w-10 h-10 flex items-center justify-center text-[#1F2A2B] hover:bg-[#F4EDE1] transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease"
                >
                  –
                </button>
                <span className="w-12 text-center font-sans text-sm">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center text-[#1F2A2B] hover:bg-[#F4EDE1] transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 font-sans text-sm tracking-widest uppercase transition-all duration-200 ${
                addedMessage
                  ? "bg-[#2E7D7B] text-white"
                  : "bg-[#0E4F52] text-white hover:bg-[#2E7D7B]"
              }`}
            >
              {addedMessage ? "Added to Bag ✓" : "Add to Bag"}
            </button>

            {/* Delivery note */}
            <p className="font-sans text-xs text-[#1F2A2B]/50 text-center mt-3">
              Islandwide delivery in 2–4 business days
            </p>

            <div className="border-t border-[#E7DCC8] mt-8" />

            {/* Accordions */}
            {(
              [
                {
                  key: "description" as const,
                  label: "Description",
                  content: product.description,
                },
                {
                  key: "fabric" as const,
                  label: "Fabric & Care",
                  content: `${product.fabric}\n\n${product.care}`,
                },
                {
                  key: "shipping" as const,
                  label: "Shipping & Returns",
                  content: product.shipping,
                },
              ] as { key: AccordionKey; label: string; content: string }[]
            ).map((item) => (
              <div key={item.key} className="border-b border-[#E7DCC8]">
                <button
                  onClick={() => toggleAccordion(item.key)}
                  className="w-full flex items-center justify-between py-4 font-sans text-xs tracking-widest uppercase text-[#1F2A2B] hover:text-[#0E4F52] transition-colors"
                >
                  {item.label}
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className={`transition-transform duration-200 ${
                      openAccordion === item.key ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openAccordion === item.key && (
                  <div className="pb-5">
                    <p className="font-sans text-sm text-[#1F2A2B]/70 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky mobile add-to-cart bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E7DCC8] px-4 py-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {product.sizes[0] !== "One Size" ? (
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="flex-1 border border-[#E7DCC8] px-3 py-3 font-sans text-xs text-[#1F2A2B] focus:outline-none focus:border-[#0E4F52] bg-white"
          >
            {product.sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <div className="flex-1 flex items-center px-3 border border-[#E7DCC8]">
            <span className="font-sans text-xs text-[#1F2A2B]/60">One Size</span>
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className={`flex-[2] py-3 font-sans text-xs tracking-widest uppercase transition-all duration-200 ${
            addedMessage
              ? "bg-[#2E7D7B] text-white"
              : "bg-[#0E4F52] text-white"
          }`}
        >
          {addedMessage ? "Added ✓" : "Add to Bag"}
        </button>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-[#F4EDE1] py-16 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl text-[#0E4F52] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
