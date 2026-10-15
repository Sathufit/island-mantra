"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Pauses smooth scrolling while an overlay (menu, modal) owns the screen. */
export function lockScroll(locked: boolean) {
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
}

/** Lenis smooth scrolling on desktop; skipped on touch devices and for reduced motion. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Mouse and trackpad only. Phones already scroll smoothly natively, and
    // Lenis's touch listeners make the browser wait on JavaScript before every
    // scroll frame — that was the lag on mobile.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    let frame = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page starts at the top, without Lenis easing back from the old position.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
