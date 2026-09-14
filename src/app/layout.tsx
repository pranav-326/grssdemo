import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IEEE GRSS | Remote Sensing in Agriculture Summit",
  description:
    "Next-Gen Earth Observation & Geospatial Intelligence for Precision Agriculture. Hosted by NIE IEEE Student Branch — GRSS Chapter.",
  keywords: [
    "IEEE GRSS",
    "NIE Mysuru",
    "Remote Sensing",
    "Precision Agriculture",
    "Geo-AI",
    "NDVI",
    "SAR",
    "Earth Observation",
  ],
  authors: [{ name: "NIE IEEE Student Branch — GRSS Chapter" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://server.arcgisonline.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://server.arcgisonline.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans bg-earth-950 text-vanilla antialiased selection:bg-olive selection:text-earth-950"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
