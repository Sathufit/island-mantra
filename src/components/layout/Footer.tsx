"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navGroups } from "@/src/lib/data/navigation";
import { storeInfo } from "@/src/lib/data/store-info";
import { COORDS, useIslandNow } from "@/src/lib/island";
import { EASE } from "@/src/lib/hooks";
import { InstagramIcon, PlusMinus } from "@/src/components/ui/icons";
import { FitText, Magnetic, MaskLine } from "@/src/components/motion/Reveal";

const WORDMARK = "ISLAND MANTRA";

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);
  const island = useIslandNow();
  const reduce = useReducedMotion();

  return (
    <footer className="overflow-hidden bg-linen pt-20 text-ink md:pt-28">
      {/* Section 8 — footer menus: black letters in white strips, + / − */}
      <div className="mx-auto max-w-[1440px] space-y-2 px-4 sm:px-8">
        {navGroups.map((group) => {
          const isOpen = open === group.title;
          return (
            <div key={group.title} className="border border-line bg-paper">
              <button
                onClick={() => setOpen(isOpen ? null : group.title)}
                aria-expanded={isOpen}
                className="caps flex h-14 w-full items-center justify-between px-5 text-[12px] transition-colors duration-500 hover:bg-sand/50"
              >
                {group.title}
                <PlusMinus open={isOpen} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-col gap-4 px-5 pb-6 pt-1">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="link-draw caps text-[11px] text-ink-soft">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Section 9 — be in touch */}
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center md:py-24">
        <h2 className="caps text-[13px] font-medium">
          <MaskLine>Be in Touch</MaskLine>
        </h2>
        <p className="tagline mt-3 text-2xl text-ink-soft md:text-3xl">
          <MaskLine delay={0.08}>Follow the island life, one sunset at a time.</MaskLine>
        </p>
        <Magnetic className="mt-8" strength={0.45}>
          <a
            href={storeInfo.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
            aria-label="Island Mantra on Instagram"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink transition-colors duration-500 group-hover:border-saffron group-hover:bg-saffron">
              <InstagramIcon className="h-5 w-5" />
            </span>
            <span className="label text-muted">Instagram</span>
          </a>
        </Magnetic>
      </div>

      {/* Wordmark — letters rise out of the ground */}
      <div className="px-4 sm:px-8" aria-hidden>
        <motion.div
          className="mx-auto max-w-[1440px]"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        >
          <FitText text={WORDMARK} className="display leading-[0.78]">
            <span className="inline-flex overflow-hidden pb-[0.04em]">
              {WORDMARK.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { y: "105%" },
                    shown: { y: "0%", transition: { duration: 1.2, ease: EASE, delay: i * 0.045 } },
                  }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </span>
          </FitText>
        </motion.div>
      </div>

      {/* Section 10 — copyright, with the island's live time */}
      <div className="mt-6 border-t border-line">
        <div className="label mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-4 py-6 text-muted sm:flex-row sm:px-8">
          <span className="hidden sm:inline">{COORDS}</span>
          <span className="text-ink">© Island Mantra 2026 – All Rights Reserved</span>
          <span className="tabular-nums">
            {island ? `Hikkaduwa ${island.time} · Sunset ${island.sunset}` : "Hikkaduwa, Sri Lanka"}
          </span>
        </div>
      </div>
    </footer>
  );
}
