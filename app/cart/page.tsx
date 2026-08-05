"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/src/store/cart";
import { formatPrice } from "@/src/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, hasHydrated, hydrateCart } =
    useCart();
  const total = subtotal();

  useEffect(() => {
    if (hasHydrated) hydrateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] mb-10">
          Your Bag
        </h1>

        {!hasHydrated ? (
          <div className="flex items-center justify-center py-24">
            <p className="font-sans text-sm text-[#0A0A0A]/50">Loading…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
            <svg
              width="56"
              height="56"
              fill="none"
              stroke="#E7DCC8"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p className="font-serif text-2xl text-[#0A0A0A]">Your bag is empty</p>
            <p className="font-sans text-sm text-[#0A0A0A]/60">
              Discover our island collections and find something you love.
            </p>
            <Link
              href="/"
              className="mt-2 inline-block bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#2A2A2A] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Line items */}
            <div className="md:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 border-b border-[#E7DCC8] pb-6"
                >
                  <Link href={`/products/${item.productSlug}`}>
                    <div className="relative w-24 h-32 flex-shrink-0 bg-[#F4EDE1] border border-[#E7DCC8]" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/products/${item.productSlug}`}>
                        <h3 className="font-serif text-base text-[#0A0A0A] hover:text-[#0A0A0A] transition-colors">
                          {item.productName}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#0A0A0A]/30 hover:text-[#0A0A0A] transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <p className="font-sans text-xs text-[#0A0A0A]/50 mt-1">
                      {item.size} · {item.color}
                    </p>
                    <p className="font-sans text-sm font-medium text-[#0A0A0A] mt-2">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center border border-[#E7DCC8] w-fit mt-3">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-[#0A0A0A] hover:bg-[#F4EDE1] transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="w-10 text-center text-xs font-sans">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-[#0A0A0A] hover:bg-[#F4EDE1] transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="md:col-span-1">
              <div className="bg-[#F4EDE1] p-6 sticky top-24">
                <h2 className="font-serif text-xl text-[#0A0A0A] mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 font-sans text-sm mb-5">
                  <div className="flex justify-between text-[#0A0A0A]">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-[#0A0A0A]/60">
                    <span>Shipping</span>
                    <span>{total >= 5000 ? "Free" : "Calculated at checkout"}</span>
                  </div>
                  <div className="border-t border-[#E7DCC8] pt-3 flex justify-between font-medium text-[#0A0A0A]">
                    <span>Total (LKR)</span>
                    <span className="font-serif text-lg">{formatPrice(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase text-center py-4 hover:bg-[#2A2A2A] transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/"
                  className="block text-center font-sans text-xs text-[#0A0A0A] tracking-widest uppercase hover:text-[#2A2A2A] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
