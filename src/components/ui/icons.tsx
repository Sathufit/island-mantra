import { cn } from "@/src/lib/utils";

/** "+" that morphs into "−" when open (vertical stroke rotates flat). */
export function PlusMinus({ open, className }: { open: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-block h-3 w-3", className)}>
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      <span
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-50%) rotate(${open ? 90 : 0}deg) scaleY(${open ? 0 : 1})` }}
      />
    </span>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className} aria-hidden>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" strokeLinejoin="round" />
      <path d="M9 8.6c0 3.3 2.9 6.4 6.3 6.4l1.1-1.4-1.8-.9-.8.8c-1.2-.5-2.3-1.5-2.8-2.8l.8-.8-.9-1.8L9.6 8.6" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ dir = "right", className }: { dir?: "left" | "right"; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={cn("h-4 w-4", dir === "left" && "rotate-180", className)}
      aria-hidden
    >
      <path d="M4 12h15M14 6.5l5.5 5.5-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={cn("h-5 w-5", className)} aria-hidden>
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}
