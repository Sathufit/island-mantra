import { cn } from "@/src/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "coral";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          size === "sm" && "text-xs px-4 py-2",
          size === "md" && "text-sm px-6 py-3",
          size === "lg" && "text-base px-8 py-4",
          variant === "primary" &&
            "bg-[#0E4F52] text-white hover:bg-[#2E7D7B] focus-visible:ring-[#0E4F52]",
          variant === "outline" &&
            "border border-[#0E4F52] text-[#0E4F52] hover:bg-[#0E4F52] hover:text-white focus-visible:ring-[#0E4F52]",
          variant === "ghost" &&
            "text-[#0E4F52] hover:bg-[#F4EDE1] focus-visible:ring-[#0E4F52]",
          variant === "coral" &&
            "bg-[#E1704B] text-white hover:bg-[#c85e3c] focus-visible:ring-[#E1704B]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
