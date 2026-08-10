"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Slide {
  heading: string;
  subheading: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
}

const slides: Slide[] = [
  {
    heading: "Wear the Island.",
    subheading: "Coastal fashion born in Hikkaduwa, on the beach at sunrise.",
    href: "/women",
    cta: "Shop Women",
    image: "https://images.unsplash.com/photo-1779323539338-dc302420495c?w=1800&q=80",
    imageAlt: "Woman in a flowing white dress and hat walking on a tropical beach",
  },
  {
    heading: "Made for the Coast.",
    subheading: "Relaxed silhouettes for long lunches and longer evenings.",
    href: "/men",
    cta: "Shop Men",
    image: "https://images.unsplash.com/photo-1772583435283-b07bc9950497?w=1800&q=80",
    imageAlt: "Man in a white linen shirt standing on a tropical beach",
  },
  {
    heading: "Galle Fort, Sunset.",
    subheading: "Handcrafted accessories from artisans on the south coast.",
    href: "/accessories",
    cta: "Shop Accessories",
    image: "https://images.unsplash.com/photo-1566812548394-f6396d8bac5c?w=1800&q=80",
    imageAlt: "Handwoven straw bag hanging beachside with the ocean in view",
  },
  {
    heading: "New In.",
    subheading: "The latest arrivals, straight from the atelier.",
    href: "/search?filter=new",
    cta: "Shop New In",
    image: "https://images.unsplash.com/photo-1596433904500-97b901c5d274?w=1800&q=80",
    imageAlt: "Stack of folded linen garments in natural tones",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <section
      className="relative h-screen min-h-[560px] overflow-hidden bg-[#0A0A0A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.href + i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
          <div className="relative z-10 h-full flex flex-col items-start justify-end px-6 sm:px-10 md:px-16 pb-24 md:pb-28">
            <h1 className="font-serif text-white leading-[0.95]" style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}>
              {slide.heading}
            </h1>
            <p className="font-sans text-sm text-white/75 mt-4 mb-7 max-w-sm leading-relaxed">
              {slide.subheading}
            </p>
            <Link
              href={slide.href}
              className="font-sans text-xs tracking-[0.22em] uppercase text-white border-b border-white/60 pb-1 hover:border-white transition-colors"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Manual arrows */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: i === index ? "#fff" : "rgba(255,255,255,0.4)",
              transform: i === index ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
