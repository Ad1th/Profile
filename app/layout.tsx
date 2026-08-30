import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Amatic_SC, Anton, Archivo_Black } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import RecruiterConsole from "@/components/seo/RecruiterConsole";
import StructuredData from "@/components/seo/StructuredData";
import {
  personSchema,
  siteDescription,
  siteKeywords,
  siteTitle,
  siteUrl,
  websiteSchema,
} from "@/lib/seo-data";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const amatic = Amatic_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handdrawn",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Adith Manikonda",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "Adith Manikonda", url: siteUrl }],
  creator: "Adith Manikonda",
  publisher: "Adith Manikonda",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Adith Manikonda",
    title: "Adith Manikonda",
    description: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adith Manikonda",
    description: "Backend Engineer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${anton.variable} ${amatic.variable}`}
    >
      <body>
        <StructuredData data={[personSchema, websiteSchema]} />
        <a className="skip-link" href="#main">
          Skip to Content
        </a>
        <Navbar />
        {children}
        <RecruiterConsole />
      </body>
    </html>
  );
}
