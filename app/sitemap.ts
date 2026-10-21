import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";
import { hackathons, patents, projects, siteUpdated } from "@/lib/seo-data";
import { url } from "@/lib/structured-data";

/**
 * Every indexable page, with a lastmod that only moves when the content
 * does (see siteUpdated) and the images on each page, so the portrait and
 * the project screenshots can surface in image search.
 *
 * changefreq and priority are left out: Google ignores both.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = siteUpdated;
  const portrait = url(profile.portrait.path);

  return [
    { url: url("/"), lastModified, images: [portrait] },
    { url: url("/about"), lastModified, images: [portrait] },
    { url: url("/projects"), lastModified },
    { url: url("/research"), lastModified },
    ...projects.map((project) => {
      const shots = project.screenshots
        .filter((shot) => !shot.endsWith("_placeholder.svg"))
        .map((shot) => url(encodeURI(shot)));
      return {
        url: url(`/projects/${project.slug}`),
        lastModified,
        ...(shots.length ? { images: shots } : {}),
      };
    }),
    ...patents.map((patent) => ({
      url: url(`/patents/${patent.slug}`),
      lastModified,
    })),
    ...hackathons.map((hackathon) => ({
      url: url(`/hackathons/${hackathon.slug}`),
      lastModified,
    })),
  ];
}
