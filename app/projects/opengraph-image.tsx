import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { patents, projects } from "@/lib/seo-data";

export const runtime = "nodejs";
export const alt = "Projects by Adith Manikonda";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "Project archive",
    title: "Every build, with evidence",
    subtitle: `${projects.length} backend engines, query processors, distributed systems, research software and CLI tools, plus ${patents.length} published patents.`,
    stat: { value: String(projects.length), label: "Projects" },
  });
}
