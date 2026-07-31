"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/src/store/cart";
import MobileNav from "./MobileNav";

const collections = [
  { name: "Linen Edit", slug: "linen-edit" },
  { name: "Coastal Dresses", slug: "coastal-dresses" },
  { name: "Island Tees", slug: "island-tees" },
  { name: "Accessories", slug: "accessories" },
];

// Pages that have a full-bleed dark hero — header starts transparent here
function isHeroPage(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/collections/") ||
    pathname === "/about"
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const pathname = usePathname();
  const count = totalItems();

  const hero = isHeroPage(pathname);
  // Show transparent background only on hero pages when not scrolled
  const transparent = hero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    // Reset scroll state on route change
    setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <header
        className={`transition-all duration-300 ${
          transparent
            ? "bg-gradient-to-b from-black/50 to-transparent"
            : "bg-[#0E4F52] shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-white font-serif text-xl tracking-widest uppercase absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            Island Mantra
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-white text-xs tracking-widest uppercase font-sans">
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#F4EDE1] transition-colors">
                Collections
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {collectionsOpen && (
                /* pt-2 keeps the gap inside the hoverable parent — no mouse-leave gap */
                <div className="absolute top-full left-0 pt-2 w-52 z-50">
                  <div className="bg-white shadow-lg py-2">
                    {collections.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/collections/${c.slug}`}
                        className="block px-5 py-2.5 text-[#1F2A2B] text-xs tracking-widest uppercase hover:bg-[#F4EDE1] transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className="hover:text-[#F4EDE1] transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-[#F4EDE1] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="text-white hover:text-[#F4EDE1] transition-colors"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              onClick={toggleCart}
              className="relative text-white hover:text-[#F4EDE1] transition-colors"
              aria-label="Open cart"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E1704B] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
