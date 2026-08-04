import { formatPrice } from "@/src/lib/utils";

interface Props {
  price: number;
}

export default function BNPLBadge({ price }: Props) {
  const installment = Math.ceil(price / 3);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="font-sans text-xs text-[#0A0A0A]/60">
        or 3 ×{" "}
        <span className="font-medium text-[#0A0A0A]">{formatPrice(installment)}</span>{" "}
        with
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="font-sans text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#0A0A0A] text-white">
          Mintpay
        </span>
        <span className="font-sans text-[10px] text-[#0A0A0A]/40">|</span>
        <span className="font-sans text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#0A0A0A] text-white">
          Koko
        </span>
      </span>
    </div>
  );
}
