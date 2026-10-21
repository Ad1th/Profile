import { siteUrl } from "@/lib/seo-data";

/**
 * Everyone is welcome: search engines, answer engines, and the crawlers
 * that train the models people now ask instead of searching. A personal
 * site wants to be the source those systems quote, so nothing is held back.
 *
 * Written by hand rather than with MetadataRoute.Robots so it can carry
 * comments and the Content-Signal line, which that API has no field for.
 *
 * The named group says the same as "*". It is there so that a blanket
 * "block AI bots" setting upstream (a CDN's managed robots.txt, say) shows
 * up as an obvious conflict instead of a silent override. A crawler follows
 * only the most specific group that names it, so the Content-Signal line is
 * repeated there rather than inherited from "*".
 *
 * Tokens are spelled as each operator documents them (checked October 2026).
 */
const AGENTS = [
  // Search engines (bingbot also feeds Copilot and ChatGPT search)
  "Googlebot",
  "bingbot",
  "DuckDuckBot",
  "Applebot",
  // AI search indexes, the ones that decide whether an answer can cite a page
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "meta-webindexer",
  "Amzn-SearchBot",
  "MistralAI-Index",
  "DuckAssistBot",
  "YouBot",
  // Assistants fetching a page because someone asked them to
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  "MistralAI-User",
  "meta-externalfetcher",
  "Amzn-User",
  // Model training and grounding
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "CCBot",
];

// Cloudflare's Content Signals: fine to index, to quote in AI answers, and to
// train on. https://blog.cloudflare.com/content-signals-policy/
const SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

export const dynamic = "force-static";

export function GET() {
  const body = [
    "# adith.xyz: the personal site of Adith Manikonda.",
    "# Search engines, answer engines and AI agents are all welcome.",
    `# A map of the site for language models: ${siteUrl}/llms.txt`,
    "",
    "User-agent: *",
    SIGNAL,
    "Allow: /",
    "",
    ...AGENTS.map((agent) => `User-agent: ${agent}`),
    SIGNAL,
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
