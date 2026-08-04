import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

const policies: Record<
  string,
  { title: string; content: React.ReactNode }
> = {
  shipping: {
    title: "Shipping Policy",
    content: (
      <div className="space-y-6 font-sans text-sm text-[#0A0A0A]/80 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Delivery Areas</h2>
          <p>Island Mantra delivers islandwide across all 25 districts of Sri Lanka. We do not currently ship internationally.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Delivery Timeframe</h2>
          <p>Orders are processed within 1–2 business days. Standard delivery takes 2–4 business days from dispatch. Remote areas may take up to 5 business days.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Shipping Rates</h2>
          <p>Standard shipping is <strong>Rs 350</strong> islandwide. Orders over <strong>Rs 5,000</strong> qualify for free shipping.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Order Tracking</h2>
          <p>Once your order is dispatched, you will receive a tracking number via SMS and email. You can track your order through our courier partner&apos;s website.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Packaging</h2>
          <p>All orders are carefully packed using recycled and minimal packaging. Accessories are gift-wrapped in our signature tissue paper.</p>
        </section>
      </div>
    ),
  },
  returns: {
    title: "Returns & Exchanges",
    content: (
      <div className="space-y-6 font-sans text-sm text-[#0A0A0A]/80 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Return Policy</h2>
          <p>We accept returns within <strong>14 days</strong> of delivery for items that are unworn, unwashed, and in their original condition with all tags attached.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">How to Return</h2>
          <p>Contact us via WhatsApp or email within 14 days of receiving your order. We will provide you with return instructions and the return address.</p>
          <p className="mt-2">Return shipping costs are the responsibility of the customer unless the item was faulty or incorrectly sent.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Exchanges</h2>
          <p>We are happy to exchange items for a different size or colour, subject to availability. Please contact us within 14 days of delivery.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Refunds</h2>
          <p>Once we receive and inspect the returned item, we will process your refund within 5–7 business days. Refunds are issued to the original payment method.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Faulty Items</h2>
          <p>If you receive a faulty or damaged item, please contact us immediately with photos. We will arrange a replacement or full refund at no cost to you.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Non-Returnable Items</h2>
          <p>For hygiene reasons, jewellery, hats, and items marked as final sale cannot be returned.</p>
        </section>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-6 font-sans text-sm text-[#0A0A0A]/80 leading-relaxed">
        <p>Last updated: January 2025</p>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Information We Collect</h2>
          <p>When you place an order or contact us, we collect your name, email address, phone number, and delivery address. We also collect payment information, though this is processed securely by our payment providers and not stored by us.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>To process and deliver your orders</li>
            <li>To communicate with you about your order</li>
            <li>To send promotional emails if you have opted in</li>
            <li>To improve our products and website</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Data Sharing</h2>
          <p>We do not sell or share your personal information with third parties except our delivery partners and payment processors, who require it to fulfil your order.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Cookies</h2>
          <p>Our website uses essential cookies to keep your shopping cart active. We do not use tracking or advertising cookies.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Your Rights</h2>
          <p>You have the right to access, correct, or delete any personal information we hold about you. Contact us at hello@islandmantra.lk to exercise these rights.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Contact</h2>
          <p>For privacy queries, contact us at hello@islandmantra.lk or WhatsApp +94 77 123 4567.</p>
        </section>
      </div>
    ),
  },
  terms: {
    title: "Terms & Conditions",
    content: (
      <div className="space-y-6 font-sans text-sm text-[#0A0A0A]/80 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">General</h2>
          <p>By accessing and using the Island Mantra website, you agree to be bound by these terms and conditions. If you do not agree, please do not use this site.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Products & Pricing</h2>
          <p>All prices are listed in Sri Lankan Rupees (LKR) and are subject to change without notice. We make every effort to display product colours and details accurately, but slight variations may occur, especially for handmade items.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Orders</h2>
          <p>We reserve the right to refuse or cancel any order for any reason, including limited stock availability, errors in pricing or product information, or suspected fraud.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Intellectual Property</h2>
          <p>All content on this site — including images, designs, and text — is the property of Island Mantra and may not be reproduced without permission.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">Contact</h2>
          <p>For questions about these terms, contact us at hello@islandmantra.lk.</p>
        </section>
      </div>
    ),
  },
  "size-guide": {
    title: "Size Guide",
    content: (
      <div className="space-y-6 font-sans text-sm text-[#0A0A0A]/80 leading-relaxed">
        <p className="text-xs text-[#0A0A0A]/60">All measurements in centimetres (cm).</p>
        <table className="w-full font-sans text-sm">
          <thead>
            <tr className="border-b border-[#E7DCC8]">
              <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">Size</th>
              <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">Bust</th>
              <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">Waist</th>
              <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">Hips</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: "XS", bust: "80–84", waist: "60–64", hips: "86–90" },
              { size: "S", bust: "84–88", waist: "64–68", hips: "90–94" },
              { size: "M", bust: "88–93", waist: "68–73", hips: "94–99" },
              { size: "L", bust: "93–98", waist: "73–78", hips: "99–104" },
              { size: "XL", bust: "98–104", waist: "78–84", hips: "104–110" },
            ].map((row) => (
              <tr key={row.size} className="border-b border-[#F4EDE1]">
                <td className="py-3 font-medium text-[#0A0A0A]">{row.size}</td>
                <td className="py-3 text-[#0A0A0A]">{row.bust}</td>
                <td className="py-3 text-[#0A0A0A]">{row.waist}</td>
                <td className="py-3 text-[#0A0A0A]">{row.hips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) return {};
  return { title: policy.title };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policies[slug];

  if (!policy) notFound();

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <nav className="font-sans text-xs tracking-widest uppercase text-[#0A0A0A]/50 mb-8 flex gap-2">
          <Link href="/" className="hover:text-[#0A0A0A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0A0A0A]">{policy.title}</span>
        </nav>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] mb-10">
          {policy.title}
        </h1>
        {policy.content}
        <div className="mt-12 pt-8 border-t border-[#E7DCC8]">
          <p className="font-sans text-sm text-[#0A0A0A]/60">
            Questions?{" "}
            <Link
              href="/contact"
              className="text-[#0A0A0A] underline underline-offset-2 hover:text-[#2A2A2A] transition-colors"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
