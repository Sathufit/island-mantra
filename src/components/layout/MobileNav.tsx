"use client";

import Link from "next/link";
import { useEffect } from "react";

const links = [
  { label: "Linen Edit", href: "/collections/linen-edit" },
  { label: "Coastal Dresses", href: "/collections/coastal-dresses" },
  { label: "Island Tees", href: "/collections/island-tees" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Search", href: "/search" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: Props) {
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
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7DCC8]">
          <span className="font-serif text-lg text-[#0E4F52] tracking-widest uppercase">
            Island Mantra
          </span>
          <button onClick={onClose} className="text-[#1F2A2B]" aria-label="Close menu">
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

        <nav className="flex-1 overflow-y-auto py-4">
          <p className="px-6 py-2 text-[10px] font-sans tracking-widest uppercase text-[#1F2A2B]/40">
            Collections
          </p>
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-6 py-3 text-sm text-[#1F2A2B] font-sans tracking-wide hover:bg-[#F4EDE1] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#E7DCC8] my-4" />
          {links.slice(4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-6 py-3 text-sm text-[#1F2A2B] font-sans tracking-wide hover:bg-[#F4EDE1] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-[#E7DCC8] text-xs font-sans text-[#1F2A2B]/60">
          Islandwide Delivery · LKR only
        </div>
      </div>
    </>
  );
}
