"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order");

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F4EDE1] flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#0A0A0A]/50 mb-3">
          Order Confirmed
        </p>
        <h1 className="font-serif text-3xl text-[#0A0A0A] mb-4">
          Thank you{order ? ` — order #${order}` : ""}
        </h1>
        <p className="font-sans text-sm text-[#0A0A0A]/70 leading-relaxed mb-8">
          We've received your order and will begin preparing it for islandwide
          delivery. Pay in cash when it arrives.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#2A2A2A] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
