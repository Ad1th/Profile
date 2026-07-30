import type { Metadata } from "next";
import ResearchLabClient from "@/components/sections/research/ResearchLabClient";
import StructuredData from "@/components/seo/StructuredData";
import { publications, patents, activeResearchProjects } from "@/content/research";
import { siteUrl } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Digital Research Lab | Adith Manikonda — Systems, AI Security & ML",
  description:
    "Digital Research Lab of Adith Manikonda. Exploring database systems, approximate query processing, text-to-SQL agent security, distributed systems, and machine learning.",
  keywords: [
    "Adith Manikonda Research",
    "Database Systems Research",
    "Approximate Query Processing",
    "Text-to-SQL Agent Security",
    "TOCTOU AI Vulnerabilities",
    "IEEE NeLeX Publication",
    "SCADA Fault Detection",
    "Wave Energy MPPT Patent",
    "IIT Hyderabad Research",
  ],
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/research`,
    title: "Digital Research Lab | Adith Manikonda",
    description:
      "Exploring database systems, trustworthy AI, distributed systems, cybersecurity and machine learning through research, publications and experimental systems.",
    images: [
      {
        url: "/images/me.png",
        width: 1200,
        height: 630,
        alt: "Adith Manikonda Digital Research Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Research Lab | Adith Manikonda",
    description:
      "Exploring database systems, trustworthy AI, distributed systems, cybersecurity and machine learning.",
    images: ["/images/me.png"],
  },
};

const researchSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Adith Manikonda Digital Research Lab",
  url: `${siteUrl}/research`,
  mainEntity: {
    "@type": "Person",
    name: "Adith Manikonda",
    jobTitle: "Research Engineer",
    alumniOf: "VIT Vellore",
    affiliation: {
      "@type": "Organization",
      name: "IIT Hyderabad",
    },
    knowsAbout: [
      "Database Systems",
      "Approximate Query Processing",
      "LLM Security",
      "Distributed Systems",
      "Machine Learning",
    ],
  },
  hasPart: [
    ...publications.map((pub) => ({
      "@type": "ScholarlyArticle",
      name: pub.title,
      headline: pub.title,
      abstract: pub.abstract,
      datePublished: pub.date,
      publisher: pub.publisher,
    })),
    ...patents.map((patent) => ({
      "@type": "CreativeWork",
      name: patent.title,
      description: patent.abstract,
    })),
    ...activeResearchProjects.map((proj) => ({
      "@type": "ResearchProject",
      name: proj.title,
      description: proj.shortDescription,
    })),
  ],
};

export default function ResearchPage() {
  return (
    <main>
      <StructuredData data={researchSchema} />
      <ResearchLabClient />
    </main>
  );
}
