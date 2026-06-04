import type { MetadataRoute } from "next";
import { hackathons, patents, projects, siteUrl } from "@/lib/seo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...patents.map((patent) => ({
      url: `${siteUrl}/patents/${patent.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
    ...hackathons.map((hackathon) => ({
      url: `${siteUrl}/hackathons/${hackathon.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
  ];
}
