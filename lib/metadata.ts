import type { Metadata } from "next";
import { siteName } from "@/lib/seo-data";

/**
 * Page metadata with the parts that are easy to forget filled in the same
 * way everywhere.
 *
 * A page that sets `openGraph` replaces the root one outright, so before
 * this the archive and research pages shipped without an og:image and with
 * the root's twitter card text. Images now come from each route's
 * opengraph-image file, which Next merges in on top of whatever is set here.
 *
 * `markdown` advertises the plain-text twin of the page, the one agents and
 * llms.txt readers should fetch instead of the HTML.
 */
export function pageMetadata({
  title,
  absolute = false,
  description,
  path,
  markdown,
  type = "website",
  keywords,
}: {
  /** Fed through the root template ("<title> | Adith Manikonda") unless absolute. */
  title: string;
  /** Use the title as written, for pages whose title already names Adith. */
  absolute?: boolean;
  description: string;
  path: string;
  markdown?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
}): Metadata {
  // Cards have no template, so they get the full title either way.
  const full = absolute ? title : `${title} | ${siteName}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
      ...(markdown ? { types: { "text/markdown": markdown } } : {}),
    },
    openGraph: {
      type,
      url: path,
      siteName,
      locale: "en_US",
      title: full,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
    },
  };
}
