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
            "bg-[#0A0A0A] text-white hover:bg-[#2A2A2A] focus-visible:ring-[#0A0A0A]",
          variant === "outline" &&
            "border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white focus-visible:ring-[#0A0A0A]",
          variant === "ghost" &&
            "text-[#0A0A0A] hover:bg-[#F4EDE1] focus-visible:ring-[#0A0A0A]",
          variant === "coral" &&
            "bg-[#0A0A0A] text-white hover:bg-[#262626] focus-visible:ring-[#0A0A0A]",
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
