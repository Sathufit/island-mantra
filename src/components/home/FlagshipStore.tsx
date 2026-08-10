import Image from "next/image";
import { storeInfo } from "@/src/lib/data/store-info";

export default function FlagshipStore() {
  const { address, hours } = storeInfo;
  const fullAddress = `${address.street}, ${address.area}, ${address.district}, ${address.country}`;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <section className="bg-white">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px] bg-[#F4EDE1] border border-[#E7DCC8] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1770550145372-b055bf691a87?w=1200&q=80"
            alt="White coastal building with wooden shutters and palm fronds"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 md:px-14 xl:px-20 py-16 bg-[#F4EDE1]">
          <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-[#0A0A0A]/50 mb-4">
            Visit Us
          </p>
          <h2 className="font-serif text-3xl md:text-[2.25rem] text-[#0A0A0A] leading-snug mb-6">
            Our Flagship Store
          </h2>
          <address className="not-italic font-sans text-sm text-[#0A0A0A]/70 leading-relaxed mb-6">
            {address.street}<br />
            {address.area}, {address.district}<br />
            {address.country}
          </address>
          <p className="font-sans text-sm text-[#0A0A0A]/70 mb-1">Mon–Fri: {hours.weekdays}</p>
          <p className="font-sans text-sm text-[#0A0A0A]/70 mb-8">Sat–Sun: {hours.weekends}</p>
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start font-sans text-xs tracking-[0.2em] uppercase text-[#0A0A0A] border-b border-[#0A0A0A]/40 pb-px hover:border-[#0A0A0A] transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
