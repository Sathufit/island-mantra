"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/src/store/cart";
import { useCustomer } from "@/src/store/customer";
import MobileNav from "./MobileNav";

export const navCategories = [
  { name: "Women", slug: "women" },
  { name: "Men", slug: "men" },
  { name: "Kids", slug: "kids" },
  { name: "Accessories", slug: "accessories" },
];

// Pages that have a full-bleed hero — header starts transparent (white text) here
function isHeroPage(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/collections/") ||
    pathname === "/about" ||
    navCategories.some((c) => pathname === `/${c.slug}`)
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const { isLoggedIn, hydrateCustomer } = useCustomer();
  const pathname = usePathname();
  const count = totalItems();

  const hero = isHeroPage(pathname);
  // Transparent, white text over the hero image until scrolled — then solid white bg, black text
  const transparent = hero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    // Reset scroll state on route change
    setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    hydrateCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header
        className={`transition-all duration-300 ${
          transparent
            ? "bg-gradient-to-b from-black/40 to-transparent"
            : "bg-white border-b border-[#E7DCC8]"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 ${
            transparent ? "text-white" : "text-[#0A0A0A]"
          }`}
        >
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-1"
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
            className="font-serif text-xl tracking-widest uppercase absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            Island Mantra
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-sans">
            <Link href="/" className="hover:opacity-60 transition-opacity">
              Home
            </Link>
            {navCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="hover:opacity-60 transition-opacity"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="hover:opacity-60 transition-opacity"
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
            <Link
              href="/account"
              className="hover:opacity-60 transition-opacity"
              aria-label={isLoggedIn ? "Your account" : "Sign in"}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              onClick={toggleCart}
              className="relative hover:opacity-60 transition-opacity"
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
                <span
                  className={`absolute -top-2 -right-2 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${
                    transparent ? "bg-white text-[#0A0A0A]" : "bg-[#0A0A0A] text-white"
                  }`}
                >
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
