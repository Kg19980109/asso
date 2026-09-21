import type { Metadata, Viewport } from "next";
import { Outfit, Hind_Siliguri, Caveat } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASSO — Restaurant Queue Management | Kolkata's Smart Dining Platform",
  description:
    "ASSO helps Kolkata restaurants manage walk-in queues digitally — no hardware, live in minutes. Guests join via QR, explore pandals, and return to a ready table. Free pilot for early partners.",
  applicationName: "ASSO — Restaurant Queue Management",
  icons: {
    icon: "/asso-icon.svg",
    apple: "/asso-icon.svg",
  },
  keywords: [
    "ASSO",
    "restaurant queue management",
    "digital queue system",
    "Kolkata restaurants",
    "Durga Puja dining",
    "virtual queue",
    "table management",
    "restaurant tech Kolkata",
    "food pre-ordering",
    "smart table queue",
  ],
  openGraph: {
    title: "ASSO — Restaurant Queue Management for Kolkata",
    description:
      "Turn walk-in chaos into organised digital queues. ASSO helps Kolkata restaurants manage queues, pre-orders and table turns — no hardware required. Free pilot for Puja 2026.",
    type: "website",
    locale: "en_US",
    siteName: "ASSO",
    url: "https://asso.business",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F24",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${hindSiliguri.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-[#070D1E] text-stone-900 antialiased font-sans">
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
