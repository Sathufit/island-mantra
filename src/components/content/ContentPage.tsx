import Link from "next/link";
import { Reveal } from "@/src/components/motion/Reveal";
import TideLine from "@/src/components/motion/TideLine";

interface Props {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
  width?: "narrow" | "wide";
}

/** Shared frame for the text pages: Terms, Privacy, Shipping & Returns, Size Guide. */
export default function ContentPage({ title, intro, updated, children, width = "narrow" }: Props) {
  return (
    <div className="px-4 pb-24 pt-28 sm:px-8 md:pt-40">
      <div className={`mx-auto ${width === "wide" ? "max-w-4xl" : "max-w-2xl"}`}>
        <Reveal>
          <h1 className="display text-[clamp(2.9rem,8vw,6.5rem)] uppercase">{title}</h1>
          <TideLine className="mt-5" />
          {updated && <p className="caps mt-6 text-[10px] text-muted">Last updated: {updated}</p>}
          {intro && <p className="tagline mt-6 text-2xl leading-snug text-ink-soft md:text-[28px]">{intro}</p>}
        </Reveal>
        <Reveal delay={0.1} className="mt-12 md:mt-16">
          {children}
        </Reveal>
        <div className="mt-16 border-t border-line pt-8 text-[14px] text-muted">
          Questions?{" "}
          <Link href="/contact" className="link-draw text-ink">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

/** A numbered or plain section inside a ContentPage. */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="caps mb-4 text-[12px] font-medium">{title}</h2>
      <div className="space-y-4 text-[15px] leading-[1.75] text-ink-soft">{children}</div>
    </section>
  );
}

export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-[15px] font-medium text-ink">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
