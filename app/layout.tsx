import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import {
  Amatic_SC,
  Anton,
  Archivo_Black,
  Bodoni_Moda,
  Caveat,
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import RecruiterConsole from "@/components/seo/RecruiterConsole";
import StructuredData from "@/components/seo/StructuredData";
import {
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/seo-data";
import { siteGraph } from "@/lib/structured-data";

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

/**
 * Every face the site uses is self-hosted through next/font, so a visitor on
 * Windows or Android sees the same page as one on a Mac. Before this, body
 * copy fell back to Segoe UI, the contact serif to Times New Roman and the
 * handwritten notes to Comic Sans.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
});

const cormorant = Cormorant_Garamond({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-note",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Adith Manikonda",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  // No canonical here: a root canonical is inherited by every page that
  // forgets its own, quietly pointing it at the homepage. Pages set theirs.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
  // Search Console and Bing Webmaster Tools ownership, when verified with a
  // meta tag rather than DNS. Unset variables render nothing.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
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
      className={`${archivo.variable} ${anton.variable} ${amatic.variable} ${inter.variable} ${mono.variable} ${bodoni.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body>
        <StructuredData data={siteGraph()} />
        <a className="skip-link" href="#main">
          Skip to Content
        </a>
        <Navbar />
        {children}
        <SiteFooter />
        <RecruiterConsole />
      </body>
    </html>
  );
}
