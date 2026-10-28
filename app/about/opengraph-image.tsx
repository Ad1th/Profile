import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { profile } from "@/lib/profile";
import { projects } from "@/lib/seo-data";

export const runtime = "nodejs";
export const alt = "About Adith Manikonda";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: `About / ${profile.education.schoolShort}`,
    title: profile.name,
    subtitle: profile.summary,
    stat: { value: String(projects.length), label: "Projects shipped" },
  });
}
