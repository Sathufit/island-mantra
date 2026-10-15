"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/src/lib/hooks";
import { COORDS, useIslandNow } from "@/src/lib/island";
import { lockScroll } from "./SmoothScroll";

/**
 * First visit of a session only: a sun rises over the horizon while the counter
 * runs to 100, then the screen lifts away in two layers (lagoon, then thambili).
 */
export default function Preloader() {
  // Rendered from the first paint; CSS keeps it hidden unless the inline
  // script in the layout marked this as the session's first visit.
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(0);
  const island = useIslandNow();

  useEffect(() => {
    if (document.documentElement.dataset.preload !== "1") {
      setOpen(false);
      return;
    }

    lockScroll(true);
    const start = performance.now();
    const duration = 1900;
    let frame = 0;
    let done: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else
        done = setTimeout(() => {
          setOpen(false);
          lockScroll(false);
          try {
            sessionStorage.setItem("im-loaded", "1");
          } catch {
            /* storage unavailable */
          }
        }, 350);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
      lockScroll(false);
    };
  }, []);

  // The sun climbs with the counter: from below the horizon to resting on it.
  const sunY = 100 - count;

  return (
    <AnimatePresence onExitComplete={() => delete document.documentElement.dataset.preload}>
      {open && (
        <>
          <motion.div
            key="saffron"
            className="preload-cover fixed inset-0 z-[98] bg-saffron"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.05, ease: EASE, delay: 0.14 }}
          />
          <motion.div
            key="lagoon"
            className="preload-cover fixed inset-0 z-[99] flex-col justify-between bg-lagoon p-5 text-linen md:p-10"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <div className="label flex justify-between text-linen/55">
              <span>Island Mantra</span>
              <span>Hikkaduwa, Sri Lanka</span>
            </div>

            {/* Sunrise */}
            <div className="relative mx-auto h-[28vw] max-h-[220px] w-[56vw] max-w-[440px] overflow-hidden">
              <div
                className="absolute left-1/2 aspect-square w-[44%] -translate-x-1/2 rounded-full bg-saffron shadow-[0_0_120px_30px_rgba(232,119,46,0.35)]"
                style={{ bottom: 0, transform: `translate(-50%, ${sunY}%)` }}
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-linen/40" />
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="label space-y-1 text-linen/55">
                <p>{COORDS}</p>
                <p>{island ? `${island.time} local` : " "}</p>
              </div>
              <span className="display text-[22vw] tabular-nums md:text-[13vw]">{String(count).padStart(3, "0")}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
