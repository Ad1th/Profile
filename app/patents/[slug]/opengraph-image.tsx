import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { patents } from "@/lib/seo-data";

export const runtime = "nodejs";
export const alt = "A patent application by Adith Manikonda";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return patents.map((patent) => ({ slug: patent.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const patent = patents.find((item) => item.slug === slug) ?? patents[0];

  return ogCard({
    eyebrow: `Patent / ${patent.application}`,
    title: patent.title,
    subtitle: patent.abstract,
    stat: { value: patent.published, label: "Published" },
  });
}
