import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import AddedToast from "@/src/components/layout/AddedToast";
import SmoothScroll from "@/src/components/motion/SmoothScroll";
import Preloader from "@/src/components/motion/Preloader";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Island Mantra — Dressed for island time",
    template: "%s | Island Mantra",
  },
  description:
    "Sri Lankan summer wear, handcrafted by local artisans. Linen and cotton pieces for women, men and kids, from our flagship store on Galle Road, Hikkaduwa.",
  keywords: ["Island Mantra", "Sri Lanka fashion", "linen clothing", "resort wear", "Hikkaduwa", "summer wear"],
  openGraph: {
    title: "Island Mantra — Dressed for island time",
    description: "Sun-kissed. Salt-tested. Island-made. Summer wear from Hikkaduwa, Sri Lanka.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2ede4",
};

// Runs before first paint: flags the session's first visit so the preloader
// covers the page from the very first frame instead of flashing in late.
const firstVisitScript = `try{if(sessionStorage.getItem("im-loaded")!=="1"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.preload="1"}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: firstVisitScript }} />
        <a
          href="#main"
          className="caps sr-only z-50 bg-ink px-4 py-3 text-[11px] text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <AddedToast />
      </body>
    </html>
  );
}
