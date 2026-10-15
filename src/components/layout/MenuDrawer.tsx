"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navGroups } from "@/src/lib/data/navigation";
import { storeInfo } from "@/src/lib/data/store-info";
import { useIslandNow } from "@/src/lib/island";
import { EASE } from "@/src/lib/hooks";
import { lockScroll } from "@/src/components/motion/SmoothScroll";
import { CloseIcon, InstagramIcon, PlusMinus, WhatsAppIcon } from "@/src/components/ui/icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

// Picture shown beside the menu for whichever group is open.
const groupImages: Record<string, { src: string; alt: string }> = {
  Home: { src: "https://images.unsplash.com/photo-1779323539338-dc302420495c?w=1000&q=75", alt: "Woman in white linen on the beach" },
  Shop: { src: "https://images.unsplash.com/photo-1777888511471-ca288dd1162f?w=1000&q=75", alt: "Flowing dress on a tropical beach path" },
  Information: { src: "https://images.unsplash.com/photo-1770550145372-b055bf691a87?w=1000&q=75", alt: "The Island Mantra flagship store" },
  "Terms of Use": { src: "https://images.unsplash.com/photo-1599302592205-d7d683c83eea?w=1000&q=75", alt: "Palm tree at sunset" },
};

export default function MenuDrawer({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState("Home");
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const island = useIslandNow();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const rows = ["Home", ...navGroups.map((g) => g.title)];
  const image = groupImages[expanded ?? hovered] ?? groupImages.Home;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-lagoon text-linen"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Top bar mirrors the header so the menu feels like the same surface */}
          <div className="mx-auto grid h-16 w-full max-w-[1440px] flex-shrink-0 grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close menu"
              className="-ml-2 flex h-11 w-11 items-center justify-center justify-self-start transition-transform duration-500 hover:rotate-90"
            >
              <CloseIcon />
            </button>
            <Link href="/" className="justify-self-center whitespace-nowrap pl-[0.42em] text-[clamp(11px,3.4vw,15px)] font-medium uppercase tracking-[0.42em]">
              Island Mantra
            </Link>
            <span className="label justify-self-end text-linen/50">Menu</span>
          </div>

          <div className="mx-auto grid w-full max-w-[1440px] flex-1 gap-10 px-4 pb-8 pt-6 sm:px-8 md:grid-cols-[1.2fr_1fr] md:gap-16 md:pt-12">
            {/* Links */}
            <nav className="flex flex-col justify-center">
              {rows.map((title, i) => {
                const group = navGroups.find((g) => g.title === title);
                const isOpen = expanded === title;
                const row = (
                  <span className="display block text-[clamp(2.6rem,7.5vw,5.75rem)] uppercase">
                    {title}
                  </span>
                );
                return (
                  <div key={title} className="border-b border-linen/15" onPointerEnter={() => setHovered(title)}>
                    <span className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.07 }}
                      >
                        {group ? (
                          <button
                            onClick={() => setExpanded(isOpen ? null : title)}
                            aria-expanded={isOpen}
                            className="group flex w-full items-center justify-between py-2 text-left transition-colors hover:text-saffron"
                          >
                            {row}
                            <PlusMinus open={isOpen} className="h-5 w-5" />
                          </button>
                        ) : (
                          <Link href="/" className="block py-2 transition-colors hover:text-saffron">
                            {row}
                          </Link>
                        )}
                      </motion.span>
                    </span>

                    <AnimatePresence initial={false}>
                      {group && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <ul className="flex flex-wrap gap-x-8 gap-y-3 pb-6 pt-1">
                            {group.links.map((link, li) => (
                              <motion.li
                                key={link.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: EASE, delay: 0.08 + li * 0.05 }}
                              >
                                <Link
                                  href={link.href}
                                  data-active={pathname === link.href}
                                  className="link-draw caps text-[12px] text-linen/80 hover:text-linen"
                                >
                                  {link.label}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <motion.div
                className="mt-8 flex gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.8 } }}
              >
                <Link href="/account" className="link-draw label text-linen/60 hover:text-linen">
                  My Account
                </Link>
                <Link href="/search" className="link-draw label text-linen/60 hover:text-linen">
                  Search
                </Link>
              </motion.div>
            </nav>

            {/* Picture + live island info */}
            <motion.aside
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 1, ease: EASE } }}
            >
              <div className="relative hidden flex-1 overflow-hidden bg-lagoon-soft md:block md:min-h-[320px]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={image.src}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    <Image src={image.src} alt={image.alt} fill sizes="40vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-linen/15 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="label text-linen/45">Hikkaduwa</dt>
                  <dd className="mt-1.5 text-sm tabular-nums">{island?.time ?? "—"}</dd>
                </div>
                <div>
                  <dt className="label text-linen/45">Sunset today</dt>
                  <dd className="mt-1.5 text-sm tabular-nums">{island?.sunset ?? "—"}</dd>
                </div>
                <div>
                  <dt className="label text-linen/45">Flagship store</dt>
                  <dd className="mt-1.5 flex items-center gap-2 text-sm">
                    {island && (
                      <span className="relative flex h-2 w-2">
                        {island.isOpen && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-60" />
                        )}
                        <span className={`relative inline-flex h-2 w-2 rounded-full ${island.isOpen ? "bg-saffron" : "bg-linen/40"}`} />
                      </span>
                    )}
                    {island ? (island.isOpen ? "Open now" : "Closed") : "—"}
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between border-t border-linen/15 pt-5">
                <p className="tagline text-lg text-linen/80">Follow the island life, one sunset at a time.</p>
                <div className="flex items-center gap-4">
                  <a href={storeInfo.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-saffron">
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a href={storeInfo.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-saffron">
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
