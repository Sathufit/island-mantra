import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-md mx-auto px-6">
        <div className="text-center mb-10">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/50 mb-3">
            Coming Soon
          </p>
          <h1 className="font-serif text-3xl text-[#0E4F52]">My Account</h1>
        </div>

        <div className="bg-[#F4EDE1] p-6 mb-6 text-center">
          <p className="font-sans text-xs text-[#1F2A2B]/60 leading-relaxed">
            Customer accounts — order history, saved addresses, and wishlists — are coming in Phase 2.
          </p>
        </div>

        {/* Login form (UI only) */}
        <div className="space-y-5 mb-8">
          <h2 className="font-serif text-xl text-[#0E4F52]">Sign In</h2>
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-2">
              Email
            </label>
            <input
              type="email"
              disabled
              placeholder="your@email.com"
              className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#1F2A2B] placeholder:text-[#1F2A2B]/30 py-2.5 focus:outline-none cursor-not-allowed opacity-50"
            />
          </div>
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-2">
              Password
            </label>
            <input
              type="password"
              disabled
              placeholder="••••••••"
              className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#1F2A2B] placeholder:text-[#1F2A2B]/30 py-2.5 focus:outline-none cursor-not-allowed opacity-50"
            />
          </div>
          <button
            disabled
            className="w-full bg-[#0E4F52] text-white font-sans text-xs tracking-widest uppercase py-4 opacity-50 cursor-not-allowed"
          >
            Sign In (Coming Soon)
          </button>
        </div>

        <div className="border-t border-[#E7DCC8] pt-8">
          <h2 className="font-serif text-xl text-[#0E4F52] mb-5">
            Create Account
          </h2>
          <button
            disabled
            className="w-full border border-[#0E4F52] text-[#0E4F52] font-sans text-xs tracking-widest uppercase py-4 opacity-50 cursor-not-allowed"
          >
            Register (Coming Soon)
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="font-sans text-xs text-[#0E4F52] tracking-widest uppercase underline underline-offset-2 hover:text-[#2E7D7B] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
