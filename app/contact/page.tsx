import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Island Mantra — visit us in Hikkaduwa or reach out via WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#1F2A2B]/50 mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E4F52]">
            Contact Us
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Form */}
          <div>
            <h2 className="font-serif text-xl text-[#0E4F52] mb-6">
              Send a Message
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#1F2A2B] placeholder:text-[#1F2A2B]/30 py-2.5 focus:outline-none focus:border-[#0E4F52] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#1F2A2B] placeholder:text-[#1F2A2B]/30 py-2.5 focus:outline-none focus:border-[#0E4F52] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Order enquiry, sizing, etc."
                  className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#1F2A2B] placeholder:text-[#1F2A2B]/30 py-2.5 focus:outline-none focus:border-[#0E4F52] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-sans text-xs tracking-widest uppercase text-[#1F2A2B] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full border-b border-[#E7DCC8] bg-transparent font-sans text-sm text-[#1F2A2B] placeholder:text-[#1F2A2B]/30 py-2.5 focus:outline-none focus:border-[#0E4F52] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0E4F52] text-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#2E7D7B] transition-colors"
              >
                Send Message
              </button>
              <p className="font-sans text-xs text-[#1F2A2B]/40">
                We reply within 24 hours on business days.
              </p>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-10">
            {/* WhatsApp */}
            <div>
              <h2 className="font-serif text-xl text-[#0E4F52] mb-4">
                WhatsApp
              </h2>
              <p className="font-sans text-sm text-[#1F2A2B]/70 mb-4">
                The fastest way to reach us. We&apos;re available on WhatsApp for order enquiries, custom requests, and anything else.
              </p>
              <a
                href="https://wa.me/94771234567"
                className="inline-flex items-center gap-2 border border-[#0E4F52] text-[#0E4F52] font-sans text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#0E4F52] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +94 77 123 4567
              </a>
            </div>

            {/* Visit */}
            <div>
              <h2 className="font-serif text-xl text-[#0E4F52] mb-4">
                Visit the Store
              </h2>
              <address className="font-sans text-sm text-[#1F2A2B]/70 not-italic leading-relaxed mb-4">
                <strong className="text-[#1F2A2B] font-semibold">Island Mantra</strong><br />
                22 Galle Road<br />
                Hikkaduwa, Galle District<br />
                Sri Lanka 80240
              </address>
              <div className="font-sans text-sm text-[#1F2A2B]/70 space-y-1">
                <p>Monday–Friday: 10:00 AM – 7:00 PM</p>
                <p>Saturday–Sunday: 9:00 AM – 8:00 PM</p>
              </div>
            </div>

            {/* Email */}
            <div>
              <h2 className="font-serif text-xl text-[#0E4F52] mb-4">
                Email
              </h2>
              <a
                href="mailto:hello@islandmantra.lk"
                className="font-sans text-sm text-[#0E4F52] underline underline-offset-2 hover:text-[#2E7D7B] transition-colors"
              >
                hello@islandmantra.lk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
