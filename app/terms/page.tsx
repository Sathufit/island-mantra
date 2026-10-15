import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section } from "@/src/components/content/ContentPage";
import { storeInfo } from "@/src/lib/data/store-info";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  const email = storeInfo.contact.email;
  return (
    <ContentPage title="Terms & Conditions" updated="October 2026">
      <Section title="1. About these terms">
        <p>
          These terms apply to everyone who visits or shops on the Island Mantra website, operated by
          Island Mantra, 365, Galle Road, Hikkaduwa, Sri Lanka. By using our website or placing an order,
          you agree to these terms.
        </p>
      </Section>
      <Section title="2. Our products">
        <p>
          Our pieces are handcrafted by local artisans, so small variations in colour, weave and finish
          are part of their character, not a fault. We photograph every piece as accurately as we can, but
          colours may look slightly different on your screen.
        </p>
      </Section>
      <Section title="3. Prices and payment">
        <p>
          All prices are shown in Sri Lankan Rupees (LKR). Delivery charges are shown at checkout. We
          accept card payments, cash on delivery and bank transfer. Card payments are processed securely by
          our payment partner; we never see or store your full card details.
        </p>
      </Section>
      <Section title="4. Orders">
        <p>
          Your order is confirmed once you receive our confirmation email. We may cancel an order and give
          a full refund if an item is out of stock, if a price was shown in error, or if we suspect fraud.
        </p>
      </Section>
      <Section title="5. Delivery, returns and exchanges">
        <p>
          Please see our{" "}
          <Link href="/shipping-returns" className="link-draw text-ink">
            Shipping &amp; Returns
          </Link>{" "}
          page, which forms part of these terms.
        </p>
      </Section>
      <Section title="6. Intellectual property">
        <p>
          All content on this website, including the Island Mantra name, logo, photographs, designs and
          text, belongs to Island Mantra and may not be copied or used without our written permission.
        </p>
      </Section>
      <Section title="7. Liability">
        <p>
          We take great care with our website and products. To the extent permitted by law, we are not
          responsible for indirect losses arising from the use of this website. Nothing in these terms
          affects your legal rights as a consumer.
        </p>
      </Section>
      <Section title="8. Changes to these terms">
        <p>
          We may update these terms from time to time. The version on this page at the time of your order
          applies.
        </p>
      </Section>
      <Section title="9. Governing law and contact">
        <p>
          These terms are governed by the laws of Sri Lanka. For any questions, please email{" "}
          <a href={`mailto:${email}`} className="link-draw text-ink">
            {email}
          </a>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
