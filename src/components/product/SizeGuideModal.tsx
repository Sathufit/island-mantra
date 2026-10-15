"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SizeTables from "@/src/components/content/SizeTables";
import { CloseIcon } from "@/src/components/ui/icons";
import { type Product } from "@/src/lib/data/products";
import { lockScroll } from "@/src/components/motion/SmoothScroll";

export default function SizeGuideModal({ category }: { category?: Product["category"] }) {
  const [open, setOpen] = useState(false);
  const initial = category === "men" || category === "kids" ? category : "women";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    lockScroll(true);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="link-draw caps text-[10px] text-ink-soft">
        Size Guide
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Size guide">
            <motion.div
              className="absolute inset-0 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              data-lenis-prevent
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto bg-linen p-6 sm:p-10"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="caps text-[13px] font-medium">Size Guide</h2>
                <button onClick={() => setOpen(false)} aria-label="Close size guide" className="-mr-2 p-2">
                  <CloseIcon />
                </button>
              </div>
              <SizeTables initial={initial} />
              <p className="mt-8 text-[13px] text-muted">
                Between sizes? Choose the larger size for a breezier feel.{" "}
                <Link href="/size-guide" className="link-draw text-ink">
                  How to measure
                </Link>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
