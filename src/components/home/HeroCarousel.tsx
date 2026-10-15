"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RiseWords } from "@/src/components/motion/Reveal";
import { EASE, useFinePointer } from "@/src/lib/hooks";

interface Slide {
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  /** object-position so the subject stays in frame on tall phone screens */
  focus: string;
}

const slides: Slide[] = [
  {
    name: "Beach",
    tagline: "Dressed for island time.",
    image: "https://images.unsplash.com/photo-1779323539338-dc302420495c?w=2000&q=75",
    imageAlt: "Woman in a white linen outfit and sun hat walking along the beach",
    focus: "50% 40%",
  },
  {
    name: "Outdoor sitting",
    tagline: "Slow mornings. Easy linen.",
    image: "https://images.unsplash.com/photo-1783113298856-8b644c9cf7ce?w=2000&q=75",
    imageAlt: "Woman in a white linen shirt relaxing on a wooden lounger in a tropical garden",
    focus: "70% 50%",
  },
  {
    name: "Galle Fort",
    tagline: "Old walls. New summers.",
    image: "https://images.unsplash.com/photo-1743585826344-aea35e952642?w=2000&q=75",
    imageAlt: "Galle Fort ramparts with the lighthouse overlooking the ocean",
    focus: "60% 50%",
  },
  {
    name: "Sunset",
    tagline: "Carry the golden hour home.",
    image: "https://images.unsplash.com/photo-1599302592205-d7d683c83eea?w=2000&q=75",
    imageAlt: "Palm tree silhouetted against a golden sunset over the sea",
    focus: "50% 50%",
  },
];

const SLIDE_MS = 6000;
const WIPE_S = 0.9;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [tabHidden, setTabHidden] = useState(false);
  const reduce = useReducedMotion();
  const dragStart = useRef<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  // Only pause while the hero is scrolled off-screen or the tab is hidden —
  // hover-pausing got stuck after scrolling, when mouseleave never fired.
  const inView = useInView(ref, { amount: 0.2 });
  const paused = tabHidden || !inView;

  // Scroll parallax (desktop only): the picture sinks slower than the page and
  // the words drift up and fade. On phones it's a per-frame cost during scroll.
  const parallax = useFinePointer() && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const goTo = useCallback(
    (i: number) => {
      const next = (i + slides.length) % slides.length;
      if (next === index) return;
      setPrev(index);
      setIndex(next);
    },
    [index]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => goTo(index + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduce, goTo]);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Island Mantra"
      className="relative h-[100svh] min-h-[560px] touch-pan-y select-none overflow-hidden bg-lagoon"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (dragStart.current = null)}
    >
      <motion.div className="absolute inset-0" style={{ y: parallax ? imageY : 0 }}>
        {slides.map((slide, i) => {
          const active = i === index;
          const behind = i === prev;
          // Every slide stays mounted, so its photo is decoded once and never
          // flashes blank. The incoming slide washes up over the last one like
          // the tide; slides further back are clipped away instantly, unseen.
          const wipe = active && prev !== null && !reduce;
          return (
            <motion.div
              key={slide.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.name}`}
              aria-hidden={!active}
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: active ? 2 : behind ? 1 : 0 }}
              initial={{ clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: active || behind ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
              transition={wipe ? { duration: WIPE_S, ease: EASE } : { duration: 0 }}
            >
              {/* The slow zoom keeps running while a slide sits underneath the
                  incoming one, so nothing jumps during the wipe. */}
              <div
                className={`absolute inset-0 ${active || behind ? "ken-burns" : ""}`}
                style={{ animationDuration: `${SLIDE_MS + 1500}ms` }}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  fetchPriority={i === 0 ? "high" : "low"}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.focus }}
                />
              </div>
            </motion.div>
          );
        })}
        <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.12)_60%,rgba(0,0,0,0.34)_100%)]" />
      </motion.div>

      {/* Only the tagline, with ISLAND MANTRA in small letters below it */}
      <motion.div
        style={{ y: parallax ? textY : 0, opacity: parallax ? textOpacity : 1 }}
        className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-5 text-center text-white"
      >
        <h1 key={index} className="tagline max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] sm:max-w-none">
          <RiseWords text={slides[index].tagline} delay={prev === null ? 0.5 : 0.2} stagger={0.06} />
        </h1>
        <motion.p
          key={`brand-${index}`}
          className="caps mt-7 pl-[0.55em] text-[10px] tracking-[0.55em] text-white/85 sm:text-[11px]"
          initial={reduce ? false : { opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.55em" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
        >
          Island Mantra
        </motion.p>
      </motion.div>

      {/* Slide controls */}
      <div className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-[min(380px,78vw)] items-center gap-4 text-white">
        <span className="label w-10 text-white/80">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex flex-1 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.name}
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1}: ${slide.name}`}
              aria-current={i === index}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-px bg-white/30 transition-colors group-hover:bg-white/60" />
              <span
                key={i === index ? `fill-${index}` : "idle"}
                className="absolute inset-x-0 top-1/2 h-px origin-left bg-saffron"
                style={
                  i === index
                    ? {
                        animation: reduce ? "none" : `slideProgress ${SLIDE_MS}ms linear both`,
                        animationPlayState: paused ? "paused" : "running",
                        transform: reduce ? "scaleX(1)" : undefined,
                      }
                    : { transform: "scaleX(0)" }
                }
              />
            </button>
          ))}
        </div>
        <span className="label w-10 text-right text-white/50">{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
