/** Loading state: a small sun dipping into the horizon. */
export default function SunsetLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-5 py-24">
      <div className="relative h-8 w-16 overflow-hidden">
        <span
          className="absolute left-1/2 top-2 h-7 w-7 -ml-3.5 rounded-full bg-saffron"
          style={{ animation: "sunset 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite" }}
        />
        <span className="absolute inset-x-0 bottom-0 h-px bg-ink/40" />
      </div>
      <span className="caps text-[10px] text-muted">{label}…</span>
    </div>
  );
}
