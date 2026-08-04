"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-0 max-w-sm mx-auto"
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 font-sans text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-white/60 transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-white text-[#0A0A0A] font-sans text-xs tracking-widest uppercase hover:bg-[#F4EDE1] transition-colors flex-shrink-0"
      >
        Join
      </button>
    </form>
  );
}
