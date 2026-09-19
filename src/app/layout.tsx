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
  title: "ASSO — Skip the Queue. Enjoy More.",
  description:
    "This Puja, Don't Just Wait. Explore More. Join the queue, pre-order your food and explore pandals while we get your table and food ready!",
  applicationName: "ASSO",
  keywords: [
    "ASSO",
    "restaurant queue",
    "Kolkata restaurants",
    "Durga Puja dining",
    "food pre-ordering",
    "smart table queue",
  ],
  openGraph: {
    title: "ASSO — Skip the Queue. Enjoy More.",
    description:
      "This Puja, Don't Just Wait. Explore More. Join the queue, pre-order your food and explore pandals with ASSO.",
    type: "website",
    locale: "en_US",
    siteName: "ASSO",
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
