import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex flex-col">
      <div className="relative flex-1 flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=1200&q=80"
          alt="Ocean waves"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E4F52]/85 to-[#0E4F52]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <p className="font-sans text-8xl md:text-[140px] font-serif text-white/20 leading-none mb-0 select-none">
            404
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-white mt-2 mb-4">
            Lost at sea?
          </h1>
          <p className="font-sans text-base text-white/70 leading-relaxed mb-8 max-w-md">
            The page you&apos;re looking for has drifted away. Let&apos;s get you back to the island.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-block bg-white text-[#0E4F52] font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#F4EDE1] transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/collections/linen-edit"
              className="inline-block border border-white text-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              Shop Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
