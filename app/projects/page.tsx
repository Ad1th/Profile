import type { Metadata } from "next";
import ProjectsArchiveClient from "@/components/sections/projects/ProjectsArchiveClient";
import StructuredData from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { projects, patents } from "@/lib/seo-data";
import { projectsArchiveGraph } from "@/lib/structured-data";

const archiveDescription = `${projects.length} backend engines, query processors, distributed systems, research software and CLI tools, plus ${patents.length} published patents, built by Adith Manikonda.`;

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: archiveDescription,
  path: "/projects",
  markdown: "/projects.md",
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
});

export default function ProjectsPage() {
  return (
    <main id="main">
      <StructuredData data={projectsArchiveGraph(archiveDescription)} />
      <ProjectsArchiveClient />
    </main>
  );
}
