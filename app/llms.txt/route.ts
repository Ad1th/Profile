import { llmsTxt } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // For agents to read, not for search results to show.
      "X-Robots-Tag": "noindex",
    },
  });
}
