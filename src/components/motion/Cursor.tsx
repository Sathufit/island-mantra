"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/src/lib/hooks";

/**
 * A small dot that tracks the pointer (mouse only). Elements with
 * `data-cursor="Label"` grow it into a thambili disc showing that label.
 *
 * Position is written straight to the element's transform on every pointer
 * event — no spring and no React re-render — so it stays locked to the mouse.
 * Only the size/colour change is animated.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [overLink, setOverLink] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    let lastLabel: string | null = null;
    let lastLink = false;
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (!shown) {
        shown = true;
        setVisible(true);
      }
      // Only touch React state when what's under the pointer actually changes.
      const target = e.target as HTMLElement | null;
      const nextLabel = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor || null;
      const nextLink = !nextLabel && Boolean(target?.closest("a, button, label, select, [role='button']"));
      if (nextLabel !== lastLabel) {
        lastLabel = nextLabel;
        setLabel(nextLabel);
      }
      if (nextLink !== lastLink) {
        lastLink = nextLink;
        setOverLink(nextLink);
      }
    };
    const leave = () => {
      shown = false;
      setVisible(false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [fine]);

  if (!fine) return null;

  const size = label ? 84 : overLink ? 36 : 9;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)", mixBlendMode: label ? "normal" : "difference" }}
    >
      <div
        className="flex items-center justify-center rounded-full transition-[width,height,background-color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "#e8772e" : "#ffffff",
        }}
      >
        {label && <span className="label animate-[pop_0.4s_ease-out] text-[10px] text-ink">{label}</span>}
      </div>
    </div>
  );
}
