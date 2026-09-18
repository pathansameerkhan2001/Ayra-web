import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F2",
};

export const metadata: Metadata = {
  title: "Ayra Hampers | Luxury Gifting & Curated Hampers",
  description:
    "Curated luxury hampers crafted with love for every story. Thoughtful gifts, bespoke wedding & festive hampers, corporate gifts, and memorable moments.",
  keywords: [
    "Ayra Hampers",
    "Luxury Hampers",
    "Curated Gift Baskets",
    "Thoughtful Gifting",
    "Corporate Gifting",
    "Bespoke Gift Boxes",
    "Wedding Hampers",
    "Premium Gifts",
  ],
  authors: [{ name: "Ayra Hampers" }],
  openGraph: {
    title: "Ayra Hampers | Moments That Matter",
    description: "Curated with love. Wrapped with care. Beautiful hampers for every story.",
    type: "website",
    locale: "en_US",
    siteName: "Ayra Hampers",
  },
};
import { Playfair_Display, Cormorant_Garamond, Alex_Brush, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



import { GlobalPetalCanvas } from "@/components/GlobalPetalCanvas";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <body className="bg-ayra-ivory text-ayra-charcoal antialiased selection:bg-ayra-rose-light/40 selection:text-ayra-charcoal-dark min-h-screen flex flex-col">
        {/* Global Floral Atmosphere & Falling Petals Canvas Engine */}
        <GlobalPetalCanvas />
        {children}
      </body>
    </html>
  );
}
