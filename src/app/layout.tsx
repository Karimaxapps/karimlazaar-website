import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://karimlazaar.com"),
  title: {
    default: "Karim Lazaar — Design Engineer & Product Builder",
    template: "%s — Karim Lazaar",
  },
  description:
    "Karim Lazaar designs and builds premium digital products where broadcast-grade reliability meets cinematic UX. Explore the world, the flagship products, and the articles.",
  openGraph: {
    title: "Karim Lazaar — Design Engineer & Product Builder",
    description:
      "A scroll-through world of broadcast control rooms, product foundries, and cinematic UX.",
    images: ["/world/still_0.webp"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
