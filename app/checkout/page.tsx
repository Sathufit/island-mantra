import Link from "next/link";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#0A0A0A]/50 mb-3">
          Coming Soon
        </p>
        <h1 className="font-serif text-3xl text-[#0A0A0A] mb-4">
          Checkout is on the way
        </h1>
        <p className="font-sans text-sm text-[#0A0A0A]/70 leading-relaxed mb-4">
          We&apos;re setting up our secure payment system — Visa, Mastercard, PayHere, Mintpay, and Koko BNPL are all coming in Phase 2.
        </p>
        <p className="font-sans text-sm text-[#0A0A0A]/70 leading-relaxed mb-8">
          Want to place an order now? Get in touch via WhatsApp and we&apos;ll sort it out personally.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/94771234567"
            className="inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#2A2A2A] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order via WhatsApp
          </a>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center border border-[#0A0A0A] text-[#0A0A0A] font-sans text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
