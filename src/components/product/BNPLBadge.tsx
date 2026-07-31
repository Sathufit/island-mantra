import { formatPrice } from "@/src/lib/utils";

interface Props {
  price: number;
}

export default function BNPLBadge({ price }: Props) {
  const installment = Math.ceil(price / 3);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="font-sans text-xs text-[#1F2A2B]/60">
        or 3 ×{" "}
        <span className="font-medium text-[#1F2A2B]">{formatPrice(installment)}</span>{" "}
        with
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="font-sans text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#0E4F52] text-white">
          Mintpay
        </span>
        <span className="font-sans text-[10px] text-[#1F2A2B]/40">|</span>
        <span className="font-sans text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#1F2A2B] text-white">
          Koko
        </span>
      </span>
    </div>
  );
}
