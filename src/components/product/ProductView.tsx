"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { type Product } from "@/src/lib/data/products";
import { useCart } from "@/src/store/cart";
import { formatPrice } from "@/src/lib/utils";
import ProductGallery from "@/src/components/product/ProductGallery";
import ProductCard from "@/src/components/product/ProductCard";
import SizeGuideModal from "@/src/components/product/SizeGuideModal";
import { PlusMinus } from "@/src/components/ui/icons";
import { Reveal } from "@/src/components/motion/Reveal";

const ONE_SIZE = "One Size";

/** Interactive product page body; the data is loaded and cached on the server. */
export default function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color ?? "");
  const [quantity, setQuantity] = useState(1);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "error">("idle");

  const { addItem } = useCart();

  const handleAddToBag = async () => {
    const variantId = product.variantMap[`${selectedSize}|${selectedColor}`];
    if (!variantId) return;
    setStatus("adding");
    try {
      await addItem(variantId, quantity);
      setStatus("added");
      setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
    }
  };

  const oneSize = !product.sizes.length || product.sizes[0] === ONE_SIZE;
  const panels = [
    { id: "fabric", title: "Fabric & Care", body: [product.fabric, product.care].filter(Boolean).join("\n\n") },
    { id: "delivery", title: "Delivery & Returns", body: product.shipping },
  ].filter((p) => p.body);

  const addLabel =
    status === "adding" ? "Adding…" : status === "added" ? "Added to Bag ✓" : status === "error" ? "Try Again" : "Add to Bag";

  return (
    <div className="pb-28 pt-16 md:pb-0">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-8 px-4 sm:px-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-14 md:pt-8 lg:gap-20">
        <ProductGallery images={product.images} productName={product.name} />

        {/* Details */}
        <div className="md:py-2">
          <Reveal>
            <nav aria-label="Breadcrumb" className="caps flex flex-wrap gap-2 text-[10px] text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <span aria-hidden>/</span>
              <Link href={`/${product.category}`} className="hover:text-ink">{product.category}</Link>
            </nav>

            <h1 className="display mt-5 text-[clamp(2.4rem,4.2vw,3.75rem)]">{product.name}</h1>
            <p className="label mt-4 text-[13px]">{formatPrice(product.price)}</p>

            {product.description && (
              <p className="mt-6 text-[15px] leading-[1.75] text-ink-soft">{product.description}</p>
            )}

            {/* Colour */}
            {product.variants.length > 0 && (
              <fieldset className="mt-8">
                <legend className="caps text-[10px] text-muted">
                  Colour — <span className="text-ink">{selectedColor}</span>
                </legend>
                <div className="mt-3 flex gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.color}
                      onClick={() => setSelectedColor(v.color)}
                      aria-label={v.color}
                      aria-pressed={selectedColor === v.color}
                      className={`h-8 w-8 rounded-full p-[3px] ring-1 transition-all duration-300 ${
                        selectedColor === v.color ? "ring-ink" : "ring-transparent hover:ring-line"
                      }`}
                    >
                      <span className="block h-full w-full rounded-full border border-black/10" style={{ backgroundColor: v.colorHex }} />
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Size */}
            {!oneSize && (
              <fieldset className="mt-7">
                <div className="flex items-center justify-between">
                  <legend className="caps text-[10px] text-muted">
                    Size — <span className="text-ink">{selectedSize}</span>
                  </legend>
                  <SizeGuideModal category={product.category} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`h-11 min-w-12 border px-3 text-[13px] transition-colors duration-300 ${
                        selectedSize === size ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Quantity + add */}
            <div className="mt-8 flex gap-3">
              <div className="flex items-center border border-line">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-12 w-11 items-center justify-center text-lg hover:bg-sand"
                >
                  −
                </button>
                <span className="w-8 text-center text-[14px]" aria-live="polite">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-12 w-11 items-center justify-center text-lg hover:bg-sand"
                >
                  +
                </button>
              </div>
              <button onClick={handleAddToBag} disabled={status === "adding"} className="btn btn-solid flex-1">
                <span>{addLabel}</span>
              </button>
            </div>
            {status === "error" && (
              <p role="alert" className="mt-3 text-[13px] text-terracotta">
                We couldn’t add this to your bag. Please try again.
              </p>
            )}

            <p className="tagline mt-5 text-[17px] text-ink-soft">
              Every piece is handcrafted in Sri Lanka by local artisans.
            </p>

            {/* Fabric & delivery panels */}
            <div className="mt-8 border-t border-line">
              {panels.map((panel) => {
                const isOpen = openPanel === panel.id;
                return (
                  <div key={panel.id} className="border-b border-line">
                    <button
                      onClick={() => setOpenPanel(isOpen ? null : panel.id)}
                      aria-expanded={isOpen}
                      className="caps flex h-14 w-full items-center justify-between text-[11px]"
                    >
                      {panel.title}
                      <PlusMinus open={isOpen} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="whitespace-pre-line pb-6 text-[14px] leading-[1.75] text-ink-soft">{panel.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Sticky add-to-bag bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px]">{product.name}</p>
          <p className="text-[12px] text-muted">
            {formatPrice(product.price)}
            {!oneSize && ` · ${selectedSize}`}
          </p>
        </div>
        <button onClick={handleAddToBag} disabled={status === "adding"} className="btn btn-solid min-h-[44px] px-6">
          <span>{status === "added" ? "Added ✓" : status === "adding" ? "Adding…" : "Add to Bag"}</span>
        </button>
      </div>

      {related.length > 0 && (
        <section className="mt-20 bg-sand px-4 py-16 sm:px-8 md:mt-28 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="caps mb-10 text-[13px] font-medium">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} sizes="(min-width: 768px) 24vw, 48vw" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
