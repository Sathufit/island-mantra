"use client";

import { useEffect, useState } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True on devices with a mouse — hover effects and the custom cursor only run there. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
