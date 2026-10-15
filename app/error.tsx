"use client";

import Link from "next/link";
import TideLine from "@/src/components/motion/TideLine";

/** Shown if a page can't load (e.g. the backend is waking up). */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
      <TideLine />
      <h1 className="tagline mt-8 text-3xl md:text-4xl">The tide’s a little slow right now.</h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        We couldn’t load this page just now. Please try again in a moment.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn btn-solid">
          <span>Try Again</span>
        </button>
        <Link href="/" className="btn btn-outline">
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
