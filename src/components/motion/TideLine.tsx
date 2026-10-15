"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/utils";

/** A hand-drawn wave that draws itself in when it scrolls into view. */
export default function TideLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      aria-hidden
      className={cn("h-3 w-[120px] text-saffron", className)}
    >
      <motion.path
        d="M1 6c7.5 0 7.5-4.5 15-4.5S23.5 6 31 6s7.5-4.5 15-4.5S53.5 6 61 6s7.5-4.5 15-4.5S83.5 6 91 6s7.5-4.5 15-4.5S113.5 6 119 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
