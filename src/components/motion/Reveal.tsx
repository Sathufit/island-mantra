"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { EASE, useFinePointer } from "@/src/lib/hooks";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** Distance in px the content rises from. */
  y?: number;
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image frame that "unrolls" like a bolt of linen as it enters the viewport:
 * a clip-path wipe from the bottom while the image settles from a slight zoom.
 * The viewport observer sits on the unclipped outer frame — an element clipped
 * to nothing never registers as intersecting, so it can't observe itself.
 */
export function UnrollImage({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "rolled"}
      whileInView="open"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{
          rolled: { clipPath: "inset(100% 0% 0% 0%)" },
          open: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: EASE, delay } },
        }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            rolled: { scale: 1.2 },
            open: { scale: 1, transition: { duration: 1.8, ease: EASE, delay } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Words rise one after another out of a mask. Plays on mount by default, or
 * when `show` flips true, or when scrolled into view with `onView`.
 */
export function RiseWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  show = true,
  onView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  show?: boolean;
  onView?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const state = show ? "shown" : "hidden";
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      {...(onView
        ? { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } }
        : { animate: state })}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              shown: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** A line that slides up from a mask when scrolled into view. */
export function MaskLine({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "110%" }, shown: { y: "0%", transition: { duration: 1, ease: EASE, delay } } }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Pulls its child toward the pointer while hovered (mouse only). */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Image layer that drifts against the scroll for depth. Wrap in an overflow-hidden frame. */
export function Parallax({ children, amount = 12, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ y: reduce ? 0 : y, top: `-${amount}%`, bottom: `-${amount}%` }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Sizes one line of text so it spans its container exactly. */
export function FitText({ text, children, className = "" }: { text: string; children?: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(100);

  const fit = useRef(() => {});
  fit.current = () => {
    if (!wrap.current || !inner.current) return;
    const current = parseFloat(getComputedStyle(inner.current).fontSize);
    const next = (current * wrap.current.clientWidth) / inner.current.scrollWidth;
    setSize((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
  };

  useLayoutEffect(() => {
    const run = () => fit.current();
    run();
    const ro = new ResizeObserver(run);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(run);
    return () => ro.disconnect();
  }, [text]);

  // Kerning doesn't scale perfectly linearly, so re-measure until it settles.
  useLayoutEffect(() => fit.current(), [size]);

  return (
    <div ref={wrap} className="w-full">
      <span ref={inner} className={`block w-max whitespace-nowrap ${className}`} style={{ fontSize: size }} aria-label={text}>
        {children ?? text}
      </span>
    </div>
  );
}
