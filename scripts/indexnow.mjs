/**
 * Tells the IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep and
 * the rest; Google does not take part) that the site's pages changed, so they
 * recrawl now instead of eventually. Bing's index also feeds Copilot, and
 * ChatGPT search leans on it.
 *
 * Run it after a deploy that changed content:
 *
 *   pnpm indexnow
 *
 * The key is public by design: IndexNow checks that the same key is served
 * at the keyLocation below, which proves the request comes from the site.
 */
const SITE = "https://adith.xyz";
const KEY = "583ca6caaffe159887374c7bb60a1672";

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  return res.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean accepted; anything else says why in the body.
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
