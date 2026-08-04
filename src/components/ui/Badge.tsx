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
        variant === "new" && "bg-[#0A0A0A] text-white",
        variant === "sale" && "bg-[#0A0A0A] text-white",
        variant === "bestseller" && "bg-[#F4EDE1] text-[#0A0A0A]",
        variant === "neutral" && "bg-[#E7DCC8] text-[#0A0A0A]",
        className
      )}
    >
      {children}
    </span>
  );
}
