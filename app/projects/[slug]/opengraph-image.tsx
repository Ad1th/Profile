import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { projects } from "@/lib/seo-data";

export const runtime = "nodejs";
export const alt = "A project by Adith Manikonda";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  const lead = project.evidence?.metrics?.[0];

  return ogCard({
    eyebrow: ["Project", project.year, project.category]
      .filter(Boolean)
      .join(" / "),
    title: project.seoTitle ?? project.title,
    subtitle: project.description,
    stat: lead ? { value: lead.value, label: lead.label } : undefined,
  });
}
