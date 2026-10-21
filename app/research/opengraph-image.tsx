import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { patents, publications } from "@/content/research";

export const runtime = "nodejs";
export const alt = "Research by Adith Manikonda";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "Research notes",
    title: "Databases, trustworthy AI, systems",
    subtitle:
      "Database systems, approximate query processing, AI agent security, distributed systems and machine learning: papers, patents and active work.",
    stat: {
      value: `${publications.length + patents.length}`,
      label: "Papers and patents",
    },
  });
}
