import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import StructuredData from "@/components/seo/StructuredData";
import { siteDescription, siteKeywords, siteTitle } from "@/lib/seo-data";
import { homeGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/index.md" },
  },
};

/**
 * The homepage used to carry a screen-reader-only copy of every project,
 * patent and hackathon "for search". Screen reader users heard the page
 * twice, and text hidden for search engines is the pattern Google calls
 * spam. The same facts now live where everyone can read them: the footer,
 * /about, /projects, and the markdown views listed in /llms.txt.
 */
export default function Page() {
  return (
    <main id="main" data-page="home">
      <StructuredData data={homeGraph()} />
      <HomePageClient />
    </main>
  );
}
