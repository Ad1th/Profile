import { markdownFor, markdownPaths } from "@/lib/markdown";

/**
 * The markdown twin of every page. Public URLs are the page URL plus ".md"
 * (rewritten here by next.config.mjs); this path is the plumbing.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownPaths().map((path) => ({ path }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const doc = markdownFor(path);

  if (!doc) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(doc.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Search engines should rank the HTML page, not its plain twin.
      Link: `<${doc.canonical}>; rel="canonical"`,
    },
  });
}
