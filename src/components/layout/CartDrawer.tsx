"use client";

import { useCart } from "@/src/store/cart";
import { formatPrice } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const total = subtotal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7DCC8]">
          <h2 className="font-serif text-lg text-[#0E4F52] tracking-wide">
            Your Bag ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="text-[#1F2A2B]"
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg
                width="48"
                height="48"
                fill="none"
                stroke="#E7DCC8"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-serif text-xl text-[#1F2A2B]">Your bag is empty</p>
              <p className="font-sans text-sm text-[#1F2A2B]/60">
                Discover our island collections
              </p>
              <button
                onClick={closeCart}
                className="mt-2 text-xs font-sans tracking-widest uppercase text-[#0E4F52] border-b border-[#0E4F52] pb-0.5 hover:text-[#2E7D7B] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-24 flex-shrink-0 bg-[#F4EDE1]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#1F2A2B]">{item.productName}</p>
                    <p className="font-sans text-xs text-[#1F2A2B]/60 mt-0.5">
                      {item.size} · {item.color}
                    </p>
                    <p className="font-sans text-sm text-[#0E4F52] font-medium mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#E7DCC8]">
                        <button
                          className="w-7 h-7 flex items-center justify-center text-[#1F2A2B] hover:bg-[#F4EDE1] transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className="w-8 text-center text-xs font-sans">
                          {item.quantity}
                        </span>
                        <button
                          className="w-7 h-7 flex items-center justify-center text-[#1F2A2B] hover:bg-[#F4EDE1] transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-xs font-sans text-[#1F2A2B]/40 hover:text-[#E1704B] transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#F4EDE1]">
            {total < 5000 ? (
              <>
                <p className="font-sans text-xs text-[#1F2A2B]/65 mb-2 text-center">
                  Add{" "}
                  <strong className="text-[#0E4F52]">
                    {formatPrice(5000 - total)}
                  </strong>{" "}
                  more for free shipping
                </p>
                <div className="w-full bg-[#E7DCC8] rounded-full h-1">
                  <div
                    className="bg-[#0E4F52] h-1 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((total / 5000) * 100, 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="font-sans text-xs text-[#0E4F52] text-center font-medium">
                ✓ You qualify for free shipping!
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E7DCC8] space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-[#1F2A2B]">Subtotal</span>
              <span className="font-serif text-lg text-[#0E4F52]">
                {formatPrice(total)}
              </span>
            </div>
            <p className="font-sans text-xs text-[#1F2A2B]/50">
              Shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#0E4F52] text-white text-sm font-sans tracking-widest uppercase text-center py-4 hover:bg-[#2E7D7B] transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center text-xs font-sans tracking-widest uppercase text-[#0E4F52] hover:text-[#2E7D7B] transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
