import { cn } from "@/src/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "new" | "sale" | "bestseller" | "neutral";
  className?: string;
}

export default function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[10px] font-sans font-semibold tracking-widest uppercase px-2 py-0.5",
        variant === "new" && "bg-[#0E4F52] text-white",
        variant === "sale" && "bg-[#E1704B] text-white",
        variant === "bestseller" && "bg-[#F4EDE1] text-[#0E4F52]",
        variant === "neutral" && "bg-[#E7DCC8] text-[#1F2A2B]",
        className
      )}
    >
      {children}
    </span>
  );
}
