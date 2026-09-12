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
      </head>
      <body
        className="font-sans bg-space-950 text-slate-100 antialiased selection:bg-ndvi-neon selection:text-space-950"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
