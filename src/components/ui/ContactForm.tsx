"use client";

export default function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 py-2.5 focus:outline-none focus:border-[#0A0A0A] transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 py-2.5 focus:outline-none focus:border-[#0A0A0A] transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-2"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Order enquiry, sizing, etc."
          className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 py-2.5 focus:outline-none focus:border-[#0A0A0A] transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block font-sans text-xs tracking-widest uppercase text-[#0A0A0A] mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="How can we help?"
          className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 py-2.5 focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#2A2A2A] transition-colors"
      >
        Send Message
      </button>
      <p className="font-sans text-xs text-[#0A0A0A]/40">
        We reply within 24 hours on business days.
      </p>
    </form>
  );
}
