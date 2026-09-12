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
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300..900;1,300..900&family=Roboto+Serif:ital,opsz,wght@0,8..144,300..900;1,8..144,300..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
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
