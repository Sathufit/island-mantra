import type { Metadata } from "next";
import ContentPage, { Section } from "@/src/components/content/ContentPage";
import { storeInfo } from "@/src/lib/data/store-info";

export const metadata: Metadata = { title: "Privacy Policy" };

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[11px] h-1 w-1 flex-shrink-0 rounded-full bg-saffron" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  const email = storeInfo.contact.email;
  return (
    <ContentPage
      title="Privacy Policy"
      updated="October 2026"
      intro="Your trust matters to us as much as the quality of our clothes. This policy explains what information we collect, why we collect it and how we keep it safe."
    >
      <Section title="What we collect">
        <Bullets
          items={[
            "Details you give us: your name, email address, phone number and delivery address when you place an order, sign up or contact us.",
            "Order information: what you bought, sizes and delivery preferences.",
            "Browsing information: device type, pages visited and items added to your bag, collected through cookies.",
          ]}
        />
      </Section>
      <Section title="How we use it">
        <Bullets
          items={[
            "To process, deliver and support your orders.",
            "To reply to your messages.",
            "To send news about new collections, only if you agree. You can unsubscribe at any time.",
            "To improve our website and keep it secure.",
          ]}
        />
      </Section>
      <Section title="Payments">
        <p>
          We accept card payments, cash on delivery and bank transfer. Card payments are handled by our
          secure payment partner. Island Mantra never receives or stores your full card number.
        </p>
      </Section>
      <Section title="Who we share it with">
        <p>
          Only with the partners who help us serve you, such as our payment provider, delivery partners and
          website platform, and only as much as they need. We never sell your personal information.
        </p>
      </Section>
      <Section title="Cookies">
        <p>
          Cookies remember your bag and help us understand how our website is used. You can turn them off
          in your browser settings, but some features may stop working.
        </p>
      </Section>
      <Section title="How long we keep it">
        <p>
          We keep your information only for as long as we need it to serve you and to meet our legal and
          accounting obligations.
        </p>
      </Section>
      <Section title="Your rights">
        <p>
          You can ask to see, correct or delete the personal information we hold about you, or stop
          receiving marketing messages, in line with Sri Lankan law, including the Personal Data Protection
          Act No. 9 of 2022.
        </p>
      </Section>
      <Section title="Contact">
        <p>
          For privacy questions, please email{" "}
          <a href={`mailto:${email}`} className="link-draw text-ink">
            {email}
          </a>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
