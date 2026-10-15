"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/src/store/cart";
import { useCustomer } from "@/src/store/customer";
import MenuDrawer from "./MenuDrawer";

const HERO_CATEGORY_PAGES = ["/women", "/men", "/kids", "/accessories"];

// Pages that open on a full-bleed picture — the header starts transparent with
// white letters there, per the layout guide.
function isHeroPage(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/collections/") ||
    HERO_CATEGORY_PAGES.includes(pathname)
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, hasHydrated, hydrateCart } = useCart();
  const { hydrateCustomer } = useCustomer();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const count = totalItems();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const overImage = isHeroPage(pathname) && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    hydrateCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasHydrated) hydrateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-500 ${
          overImage
            ? "border-b border-transparent bg-transparent text-white"
            : "border-b border-line bg-paper text-ink"
        }`}
      >
        {/* Soft shade behind white letters so they stay readable on bright photos */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent transition-opacity duration-500 ${
            overImage ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
          {/* Left — menu */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="group -ml-2 flex h-11 w-11 flex-col items-start justify-center gap-[5px] pl-2 justify-self-start"
          >
            <span className="h-px w-[22px] bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[14px]" />
            <span className="h-px w-[22px] bg-current" />
            <span className="h-px w-[22px] bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[18px]" />
          </button>

          {/* Centre — wordmark, doubles as the Home button */}
          <Link href="/" aria-label="Island Mantra — home" className="justify-self-center">
            <motion.span
              className="block whitespace-nowrap pl-[0.42em] text-[clamp(11px,3.4vw,15px)] font-medium uppercase"
              initial={reduce ? false : { letterSpacing: "0.8em", opacity: 0 }}
              animate={{ letterSpacing: "0.42em", opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Island Mantra
            </motion.span>
          </Link>

          {/* Right — bag, opens the Shopping Bag page */}
          <Link
            href="/cart"
            aria-label={count > 0 ? `Shopping bag, ${count} item${count === 1 ? "" : "s"}` : "Shopping bag"}
            className="-mr-2 flex h-11 w-11 items-center justify-center justify-self-end"
          >
            <span className="relative block h-[24px] w-[20px]">
              <svg viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="absolute inset-0" aria-hidden>
                <path d="M6.5 7.5V5a3.5 3.5 0 0 1 7 0v2.5" />
                <rect x="1.5" y="7.5" width="17" height="15" />
              </svg>
              {count > 0 && (
                <span
                  key={count}
                  className="animate-pop absolute inset-x-0 bottom-[3px] text-center text-[9px] font-medium leading-none"
                >
                  {count}
                </span>
              )}
            </span>
          </Link>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={closeMenu} />
    </>
  );
}
