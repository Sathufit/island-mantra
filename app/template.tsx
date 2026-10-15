"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Re-mounts on every navigation, so each page eases in. Opacity only — a
 * transform here would trap the pages' position: fixed elements. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
