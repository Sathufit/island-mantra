import Link from "next/link";
import TideLine from "@/src/components/motion/TideLine";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
      <p className="tagline select-none text-[clamp(6rem,20vw,11rem)] leading-none text-saffron/60">404</p>
      <TideLine className="mt-2" />
      <h1 className="tagline mt-8 text-3xl md:text-4xl">This page has drifted out to sea.</h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        Let’s get you back to the island.
      </p>
      <Link href="/" className="btn btn-solid mt-10">
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
