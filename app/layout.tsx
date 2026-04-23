import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ihor Pysak — E-commerce Solution Architect & Full-Stack Developer",
  description:
    "I architect and ship B2B e-commerce systems end-to-end — storefronts, custom apps, checkout-layer logic, and the integration pipelines that keep inventory and orders in sync between back-office systems and the store.",
  metadataBase: new URL("https://ihor-pysak.vercel.app"),
  openGraph: {
    title: "Ihor Pysak — E-commerce Solution Architect & Full-Stack Developer",
    description:
      "B2B e-commerce architecture, custom apps, checkout-layer logic, and back-office integrations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ihor Pysak — E-commerce Solution Architect",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
