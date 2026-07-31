import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/src/components/layout/AnnouncementBar";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CartDrawer from "@/src/components/layout/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Island Mantra — Coastal Fashion from Hikkaduwa, Sri Lanka",
    template: "%s | Island Mantra",
  },
  description:
    "Boutique coastal fashion and island lifestyle store based in Hikkaduwa. Linen shirts, maxi dresses, tees and accessories. Islandwide delivery across Sri Lanka.",
  keywords: ["Sri Lanka fashion", "coastal wear", "linen clothing", "resort wear", "Hikkaduwa"],
  openGraph: {
    title: "Island Mantra — Coastal Fashion from Sri Lanka",
    description: "Boutique coastal fashion born in Hikkaduwa, Sri Lanka.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {/* Single fixed unit: announcement bar + nav sit together at the top */}
        <div className="fixed top-0 left-0 right-0 z-40">
          <AnnouncementBar />
          <Header />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
