"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { paymentMethods } from "@/src/lib/data/payments";
import { RiseWords, Reveal } from "@/src/components/motion/Reveal";
import TideLine from "@/src/components/motion/TideLine";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order");
  const pay = paymentMethods.find((m) => m.id === searchParams.get("pay"));

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pb-20 pt-28">
      <div className="max-w-lg text-center">
        <p className="caps text-[10px] text-muted">Order confirmed{order ? ` · No. ${order}` : ""}</p>
        <h1 className="tagline mt-5 text-[clamp(2.2rem,5vw,3.4rem)] leading-tight">
          <RiseWords text="Thank you. Your island pieces are on their way." />
        </h1>
        <TideLine className="mx-auto mt-8" />
        <Reveal delay={0.6}>
          <p className="mt-8 text-[15px] leading-relaxed text-ink-soft">
            We’ve received your order and will be in touch soon.
            {pay?.note ? ` ${pay.note}` : ""}
          </p>
          <Link href="/" className="btn btn-solid mt-10">
            <span>Continue Shopping</span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
