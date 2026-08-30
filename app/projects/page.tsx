import type { Metadata } from "next";
import ProjectsArchiveClient from "@/components/sections/projects/ProjectsArchiveClient";
import StructuredData from "@/components/seo/StructuredData";
import { projects, patents, siteUrl, siteTitle } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "All Projects & Systems | Adith Manikonda",
  description:
    "Explore 19 backend engines, query processors, distributed systems, research software, CLI tools and patents built by Adith Manikonda.",
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
    title: "Projects & Systems Archive | Adith Manikonda",
    description:
      "Explore 19 backend engines, query processors, distributed systems, research software, CLI tools and patents built by Adith Manikonda.",
    images: [
      {
        url: "/images/me.webp",
        width: 1200,
        height: 630,
        alt: "Adith Manikonda Projects Archive",
      },
    ],
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
