"use client";

import { useEffect, useState } from "react";

export const HIKKADUWA = { lat: 6.1395, lon: 80.1063, tzHours: 5.5 };
export const COORDS = "6.1395° N, 80.1063° E";

const OPEN_MINUTE = 10 * 60; // 10:00
const CLOSE_MINUTE = 22 * 60; // 22:00

/** Wall-clock parts for Sri Lanka (Asia/Colombo, no DST). */
function colomboParts(now: Date) {
  const shifted = new Date(now.getTime() + HIKKADUWA.tzHours * 3600_000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes(),
    seconds: shifted.getUTCSeconds(),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");
const hhmm = (minutes: number) => `${pad(Math.floor(minutes / 60) % 24)}:${pad(Math.round(minutes) % 60)}`;

/**
 * Local sunset time in Hikkaduwa for the given day, in minutes after midnight,
 * using NOAA's general solar position equations (accurate to a minute or two).
 */
export function sunsetMinutes(now: Date): number {
  const { year, month, day } = colomboParts(now);
  const dayOfYear = Math.floor((Date.UTC(year, month, day) - Date.UTC(year, 0, 0)) / 86_400_000);
  const g = ((2 * Math.PI) / 365) * (dayOfYear - 1);
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 -
    0.399912 * Math.cos(g) +
    0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) -
    0.002697 * Math.cos(3 * g) +
    0.00148 * Math.sin(3 * g);
  const lat = (HIKKADUWA.lat * Math.PI) / 180;
  const zenith = (90.833 * Math.PI) / 180;
  const hourAngle = Math.acos(Math.cos(zenith) / (Math.cos(lat) * Math.cos(decl)) - Math.tan(lat) * Math.tan(decl));
  const utcMinutes = 720 - 4 * (HIKKADUWA.lon - (hourAngle * 180) / Math.PI) - eqTime;
  return utcMinutes + HIKKADUWA.tzHours * 60;
}

export interface IslandNow {
  time: string;
  sunset: string;
  isOpen: boolean;
  /** "Opens at 10:00" / "Closes at 22:00" */
  storeNote: string;
}

function snapshot(now: Date): IslandNow {
  const { minutes, seconds } = colomboParts(now);
  const isOpen = minutes >= OPEN_MINUTE && minutes < CLOSE_MINUTE;
  return {
    time: `${hhmm(minutes)}:${pad(seconds)}`,
    sunset: hhmm(sunsetMinutes(now)),
    isOpen,
    storeNote: isOpen ? `Closes at ${hhmm(CLOSE_MINUTE)}` : `Opens at ${hhmm(OPEN_MINUTE)}`,
  };
}

/**
 * Live Hikkaduwa clock, sunset and store status. Returns null until mounted so
 * server and client markup agree (time is inherently client-only).
 */
export function useIslandNow(): IslandNow | null {
  const [now, setNow] = useState<IslandNow | null>(null);
  useEffect(() => {
    const tick = () => setNow(snapshot(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}
