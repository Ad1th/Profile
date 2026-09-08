import type { Metadata } from "next";
import ProjectsArchiveClient from "@/components/sections/projects/ProjectsArchiveClient";
import StructuredData from "@/components/seo/StructuredData";
import { projects, patents, siteUrl } from "@/lib/seo-data";

const archiveDescription = `${projects.length} backend engines, query processors, distributed systems, research software and CLI tools, plus ${patents.length} published patents, built by Adith Manikonda.`;

export const metadata: Metadata = {
  title: "Projects",
  description: archiveDescription,
  keywords: [
    "Adith Manikonda Projects",
    "Adith Projects",
    "Backend Engineer Portfolio",
    "Golang Projects",
    "FastAPI Systems",
    "Node.js Architecture",
    "DuckDB Analytical Query Engine",
    "OpenTelemetry Kubernetes",
    "IoT Wave Energy Patent",
  ],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects`,
    title: "Projects | Adith Manikonda",
    description: archiveDescription,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects and Patents by Adith Manikonda",
  description:
    "Comprehensive archive of software systems, developer tools, AI evaluators, and patents.",
  itemListElement: [
    ...projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.title,
        url: `${siteUrl}/projects/${project.slug}`,
        description: project.description,
        programmingLanguage: project.technologies,
        codeRepository: project.github,
      },
    })),
    ...patents.map((patent, index) => ({
      "@type": "ListItem",
      position: projects.length + index + 1,
      item: {
        "@type": "CreativeWork",
        name: patent.title,
        description: patent.abstract,
      },
    })),
  ],
};

export default function ProjectsPage() {
  return (
    <main>
      <StructuredData data={itemListSchema} />
      <ProjectsArchiveClient />
    </main>
  );
}
