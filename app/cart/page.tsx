"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/src/store/cart";
import { formatPrice } from "@/src/lib/utils";
import { paymentMethods } from "@/src/lib/data/payments";
import SunsetLoader from "@/src/components/ui/SunsetLoader";
import TideLine from "@/src/components/motion/TideLine";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, cartLoaded } = useCart();
  const total = subtotal();

  return (
    <div className="min-h-[70vh] px-4 pb-24 pt-28 sm:px-8 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <h1 className="display text-[clamp(2.9rem,8vw,6.5rem)] uppercase">Your Bag</h1>

        {!cartLoaded ? (
          <SunsetLoader label="Opening your bag" />
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-24 text-center md:py-32"
          >
            <TideLine className="mb-8 w-[160px]" />
            <p className="tagline max-w-md text-3xl leading-snug md:text-4xl">
              Your bag is as empty as a beach at dawn.
            </p>
            <Link href="/" className="btn btn-solid mt-10">
              <span>Start Exploring</span>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_380px] md:gap-16">
            {/* Line items */}
            <ul className="border-t border-line">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.4 } }}
                    className="flex gap-5 overflow-hidden border-b border-line py-6"
                  >
                    <Link
                      href={`/products/${item.productSlug}`}
                      className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-sand sm:h-36 sm:w-28"
                    >
                      {item.image && (
                        <Image src={item.image} alt={item.imageAlt} fill sizes="112px" className="object-cover" />
                      )}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Link href={`/products/${item.productSlug}`} className="text-[15px] hover:underline">
                            {item.productName}
                          </Link>
                          <p className="mt-1 text-[13px] text-muted">
                            {[item.color, item.size].filter(Boolean).join(", ")}
                          </p>
                        </div>
                        <p className="whitespace-nowrap text-[14px]">{formatPrice(item.price * item.quantity)}</p>
                      </div>

                      <div className="mt-auto flex items-center gap-6 pt-4">
                        <div className="flex items-center border border-line">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.productName}`}
                            className="flex h-9 w-9 items-center justify-center text-lg transition-colors hover:bg-sand"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[13px]" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.productName}`}
                            className="flex h-9 w-9 items-center justify-center text-lg transition-colors hover:bg-sand"
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="link-draw caps text-[10px] text-muted hover:text-ink">
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Order summary */}
            <aside className="md:sticky md:top-24 md:self-start">
              <div className="border border-line bg-sand p-6 sm:p-8">
                <h2 className="caps text-[13px] font-medium">Order Summary</h2>
                <dl className="mt-6 space-y-3 text-[14px]">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 text-muted">
                    <dt>Delivery</dt>
                    <dd className="text-right">Calculated at checkout</dd>
                  </div>
                  <div className="flex justify-between border-t border-line pt-4 text-[15px] font-medium">
                    <dt>Total</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                </dl>

                <Link href="/checkout" className="btn btn-solid mt-8 w-full">
                  <span>Checkout</span>
                </Link>
                <p className="tagline mt-4 text-center text-[17px] text-ink-soft">
                  Every piece is handcrafted in Sri Lanka by local artisans.
                </p>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="caps text-[10px] text-muted">We accept</p>
                  <ul className="mt-3 space-y-2 text-[13px]">
                    {paymentMethods.map((m) => (
                      <li key={m.id} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-saffron" />
                        {m.label}
                        {!m.available && <span className="text-muted">— coming soon</span>}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[12px] leading-relaxed text-muted">
                    Bank transfer: {paymentMethods.find((m) => m.id === "bank_transfer")?.note}
                  </p>
                </div>
              </div>

              <Link href="/" className="link-draw caps mt-6 inline-block text-[11px]">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
