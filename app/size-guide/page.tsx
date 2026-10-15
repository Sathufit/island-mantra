import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/src/components/content/ContentPage";
import SizeTables from "@/src/components/content/SizeTables";
import { howToMeasure, measureTip } from "@/src/lib/data/size-guide";

export const metadata: Metadata = { title: "Size Guide" };

export default function SizeGuidePage() {
  return (
    <ContentPage
      title="Size Guide"
      width="wide"
      intro="Island Mantra pieces are designed for an easy, relaxed fit. If you’re between sizes, choose the larger size for a breezier feel, or the smaller size for a closer fit."
    >
      <p className="-mt-6 mb-12 text-[15px] text-ink-soft md:-mt-10">
        Not sure?{" "}
        <Link href="/contact" className="link-draw text-ink">
          Message us
        </Link>{" "}
        – we’re happy to help you find your fit.
      </p>

      <SizeTables />

      <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1fr]">
        <Section title="How to measure">
          <ul className="space-y-3">
            {howToMeasure.map((m) => (
              <li key={m.label}>
                <span className="font-medium text-ink">{m.label}:</span> {m.text}
              </li>
            ))}
          </ul>
        </Section>
        <div className="flex items-center bg-sand p-8">
          <p className="tagline text-2xl leading-snug">{measureTip}</p>
        </div>
      </div>
    </ContentPage>
  );
}
