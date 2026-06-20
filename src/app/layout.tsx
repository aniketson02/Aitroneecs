import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aitroneecs.com"),
  title: {
    default: "Aitroneecs — Intelligent Electronics, Beautifully Made",
    template: "%s · Aitroneecs",
  },
  description:
    "Premium audio, wearables, smart-home and charging technology — designed with intent and built to last. Free shipping across India.",
  keywords: [
    "premium electronics",
    "headphones",
    "smartwatch",
    "smart home",
    "power bank",
    "Aitroneecs",
  ],
  openGraph: {
    title: "Aitroneecs — Intelligent Electronics, Beautifully Made",
    description:
      "Premium audio, wearables, smart-home and charging technology, designed with intent.",
    url: "https://aitroneecs.com",
    siteName: "Aitroneecs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
