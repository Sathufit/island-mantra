"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/src/store/cart";
import { formatPrice } from "@/src/lib/utils";
import { CloseIcon } from "@/src/components/ui/icons";

/** Confirms an add-to-bag without leaving the page; auto-dismisses. */
export default function AddedToast() {
  const { justAdded, dismissAdded } = useCart();

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(dismissAdded, 4500);
    return () => clearTimeout(t);
  }, [justAdded, dismissAdded]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-40 flex justify-end px-4 sm:px-8">
      <AnimatePresence>
        {justAdded && (
          <motion.div
            key={justAdded.id + justAdded.quantity}
            initial={{ opacity: 0, y: -16, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-full max-w-sm border border-line bg-paper p-4 shadow-[0_18px_50px_-20px_rgba(31,27,22,0.35)]"
          >
            <div className="flex items-start justify-between">
              <p className="caps text-[10px] text-muted">Added to your bag</p>
              <button onClick={dismissAdded} aria-label="Dismiss" className="-mr-1 -mt-1 p-1">
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-4">
              <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-sand">
                {justAdded.image && (
                  <Image src={justAdded.image} alt={justAdded.imageAlt} fill sizes="64px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{justAdded.productName}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {[justAdded.color, justAdded.size].filter(Boolean).join(", ")}
                </p>
                <p className="mt-1 text-sm">{formatPrice(justAdded.price)}</p>
              </div>
            </div>
            <Link href="/cart" onClick={dismissAdded} className="btn btn-solid mt-4 w-full">
              <span>View Bag</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
