import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IEEE GRSS | Remote Sensing in Agriculture Summit",
  description:
    "Next-Gen Earth Observation & Geospatial Intelligence for Precision Agriculture. Hosted by IEEE Geoscience and Remote Sensing Society.",
  keywords: [
    "IEEE GRSS",
    "Remote Sensing",
    "Precision Agriculture",
    "NDVI",
    "SAR",
    "Geospatial",
    "Earth Observation",
    "Mysuru",
    "Srirangapatna",
  ],
  authors: [{ name: "IEEE GRSS Student Branch" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-space-950 text-slate-100 antialiased selection:bg-ndvi-neon selection:text-space-950">
        {children}
      </body>
    </html>
  );
}
