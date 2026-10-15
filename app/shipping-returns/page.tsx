import type { Metadata } from "next";
import ContentPage, { Section, SubSection } from "@/src/components/content/ContentPage";
import { storeInfo } from "@/src/lib/data/store-info";

export const metadata: Metadata = { title: "Shipping & Returns" };

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="tagline w-4 flex-shrink-0 text-lg leading-[1.6] text-terracotta">{i + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default function ShippingReturnsPage() {
  const { email, whatsappDisplay } = storeInfo.contact;
  return (
    <ContentPage
      title="Shipping & Returns"
      intro="From our island to your door – and if something isn’t quite right, we’ll make it easy."
    >
      <Section title="Shipping">
        <SubSection title="Delivery within Sri Lanka">
          <p>We deliver island-wide, to every part of Sri Lanka. Delivery time and charges are shown at checkout.</p>
        </SubSection>
        <SubSection title="International delivery">
          <p>We currently deliver within Sri Lanka only.</p>
        </SubSection>
        <SubSection title="Tracking">
          <p>Once your order is on its way, we will send you a tracking link by email or SMS.</p>
        </SubSection>
        <SubSection title="Store pickup">
          <p>
            Prefer to collect your order? Choose “Pick up from flagship store” at checkout and we will let
            you know when it is ready.
          </p>
        </SubSection>
      </Section>

      <Section title="Returns & Exchanges">
        <SubSection title="Our promise">
          <p>If a piece doesn’t fit or feel right, you may return or exchange it within 7 days of delivery.</p>
        </SubSection>
        <SubSection title="Conditions">
          <Steps
            items={[
              "Items must be unworn, unwashed and have their original tags attached.",
              "For hygiene reasons, swimwear and earrings cannot be returned unless faulty.",
              "Sale items can be exchanged but not refunded.",
            ]}
          />
        </SubSection>
        <SubSection title="How to return">
          <Steps
            items={[
              <>
                Email us at{" "}
                <a href={`mailto:${email}`} className="link-draw text-ink">
                  {email}
                </a>{" "}
                or WhatsApp us on{" "}
                <a href={storeInfo.contact.whatsappUrl} className="link-draw text-ink">
                  {whatsappDisplay}
                </a>{" "}
                with your order number.
              </>,
              "We will confirm your return and send you the instructions.",
              "Send the item back to us, or drop it off at our flagship store.",
            ]}
          />
        </SubSection>
        <SubSection title="Refunds">
          <p>
            Once we receive and check your return, your refund will be made within 14 working days – to
            your card for card payments, or by bank transfer for cash on delivery and bank transfer orders.
            You can also choose store credit if you prefer.
          </p>
        </SubSection>
        <SubSection title="Faulty or wrong item?">
          <p>
            We’re sorry! Please let us know within 48 hours of delivery with a photo, and we will replace the
            item or give you a full refund, including delivery.
          </p>
        </SubSection>
      </Section>
    </ContentPage>
  );
}
