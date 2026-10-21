import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { hackathons } from "@/lib/seo-data";

export const runtime = "nodejs";
export const alt = "A hackathon result of Adith Manikonda";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return hackathons.map((hackathon) => ({ slug: hackathon.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hackathon =
    hackathons.find((item) => item.slug === slug) ?? hackathons[0];

  return ogCard({
    eyebrow: `Hackathon / ${hackathon.date} / ${hackathon.location}`,
    title: hackathon.title,
    subtitle: hackathon.summary,
  });
}
