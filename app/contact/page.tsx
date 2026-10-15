import type { Metadata } from "next";
import ContactForm from "@/src/components/ui/ContactForm";
import { storeInfo } from "@/src/lib/data/store-info";
import { Reveal } from "@/src/components/motion/Reveal";
import TideLine from "@/src/components/motion/TideLine";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Questions about sizing, an order on its way or where to find the best sunset — the Island Mantra team is here to help.",
};

export default function ContactPage() {
  const { contact, instagram } = storeInfo;

  const details = [
    {
      label: "Email",
      value: (
        <>
          <a href={`mailto:${contact.email}`} className="link-draw break-all">
            {contact.email}
          </a>
          <span className="mt-1 block text-[13px] text-muted">We reply within one working day.</span>
        </>
      ),
    },
    {
      label: "Phone / WhatsApp",
      value: (
        <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
          {contact.whatsappDisplay}
        </a>
      ),
    },
    {
      label: "Flagship store",
      value: (
        <a href={storeInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
          {storeInfo.address}
        </a>
      ),
    },
    { label: "Opening hours", value: storeInfo.hours },
    {
      label: "Instagram",
      value: (
        <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="link-draw">
          {instagram.handle}
        </a>
      ),
    },
  ];

  return (
    <div className="px-4 pb-24 pt-28 sm:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h1 className="display text-[clamp(2.9rem,8vw,6.5rem)] uppercase">Contact Us</h1>
          <TideLine className="mt-5" />
          <p className="tagline mt-6 text-2xl leading-snug text-ink-soft md:text-[28px]">
            We’d love to hear from you. Whether it’s a question about sizing, an order on its way or simply
            where to find the best sunset, our team is here to help.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-[5fr_7fr] md:gap-6">
          {/* Contact details */}
          <Reveal className="border border-line bg-sand p-7 sm:p-10">
            <h2 className="caps text-[12px] font-medium">Contact Details</h2>
            <dl className="mt-8 space-y-7 text-[15px]">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="caps text-[10px] text-muted">{d.label}</dt>
                  <dd className="mt-1.5">{d.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 border-t border-line pt-6 text-[13px] leading-relaxed text-ink-soft">
              For order questions, please include your order number so we can help you faster.
            </p>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.12} className="border border-line bg-paper p-7 sm:p-10">
            <h2 className="caps mb-8 text-[12px] font-medium">Send Us a Message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
