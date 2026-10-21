import type { Metadata } from "next";
import ResearchLabClient from "@/components/sections/research/ResearchLabClient";
import StructuredData from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { researchGraph } from "@/lib/structured-data";

const researchDescription =
  "Research by Adith Manikonda: database systems, approximate query processing, AI agent security, distributed systems and machine learning.";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description: researchDescription,
  path: "/research",
  markdown: "/research.md",
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
});

export default function ResearchPage() {
  return (
    <main id="main">
      <StructuredData data={researchGraph(researchDescription)} />
      <ResearchLabClient />
    </main>
  );
}
