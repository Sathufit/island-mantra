"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ProductCard from "@/src/components/product/ProductCard";
import { type Product } from "@/src/lib/data/products";
import { ArrowIcon } from "@/src/components/ui/icons";
import { MaskLine } from "@/src/components/motion/Reveal";
import { EASE } from "@/src/lib/hooks";

interface Props {
  title: string;
  products: Product[];
  viewAllHref: string;
  tone?: "linen" | "paper";
}

export default function ProductCarousel({ title, products, viewAllHref, tone = "linen" }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft >= max - 8);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, products.length]);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch already swipes natively).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !scrollerRef.current) return;
    drag.current = { x: e.clientX, left: scrollerRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = scrollerRef.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    setDragging(false);
    // Let the snap settle on the nearest card after a drag.
    if (moved) scrollerRef.current?.scrollBy({ left: 1, behavior: "smooth" });
  };
  // A drag shouldn't count as a click on the card underneath.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (products.length === 0) return null;

  const headingId = `carousel-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section aria-labelledby={headingId} className={`py-20 md:py-28 ${tone === "paper" ? "bg-paper" : ""}`}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-5 md:mb-10">
          <div className="flex items-baseline gap-3">
            <h2 id={headingId} className="caps text-[13px] font-medium sm:text-[14px]">
              <MaskLine>{title}</MaskLine>
            </h2>
            <span className="label text-muted">({String(products.length).padStart(2, "0")})</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label={`Previous ${title.toLowerCase()}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-500 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label={`Next ${title.toLowerCase()}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-500 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowIcon />
            </button>
            <Link href={viewAllHref} className="link-draw caps ml-3 text-[11px] sm:ml-5">
              View All
            </Link>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={update}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className={`scrollbar-hide -mx-4 flex gap-5 overflow-x-auto px-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 ${
            dragging ? "snap-none" : "snap-x snap-mandatory scroll-px-4"
          }`}
        >
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              data-card
              className="w-[72vw] flex-shrink-0 snap-start sm:w-[calc((100%-20px)/2.3)] md:w-[calc((100%-40px)/3.2)] lg:w-[calc((100%-60px)/4)]"
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: Math.min(i, 4) * 0.09 }}
            >
              <ProductCard product={p} index={i + 1} />
            </motion.div>
          ))}
        </div>

        {/* Scroll position, as a thin tide line */}
        <div className="mt-8 h-px w-full bg-line">
          <div
            className="h-px origin-left bg-ink transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(0.12, progress)})` }}
          />
        </div>
      </div>
    </section>
  );
}
