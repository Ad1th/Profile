# Adith's Portfolio

Personal portfolio website for Adith Manikonda, built with Next.js and Tailwind CSS.

The current homepage focuses on a custom split-screen hero and a dense about section with bold typography, motion, and editorial layout treatment.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- Three.js / React Three Fiber

## Getting Started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm indexnow   # after a deploy: ask Bing and other IndexNow engines to recrawl
```

## What’s Included

- Responsive hero with desktop, tablet, and mobile layouts
- Animated portfolio intro with headline, CTA, and portrait
- Custom about grid with layered panels and motion-driven sections
- Reusable UI primitives in `components/ui/`
- Shared motion helpers in `lib/motion.ts`

## Project Structure

```text
app/                      # App router entry point and global layout
components/hero/          # Hero section and subcomponents
components/layout/        # Layout chrome such as navigation
components/sections/      # Page sections, including About
components/ui/            # Reusable UI building blocks
lib/                      # Shared utilities and motion settings
public/                   # Static assets and images
```

## Customization

- Update the homepage composition in `app/page.tsx`
- Edit hero copy and layout in `components/hero/`
- Edit the about section in `components/sections/about/`
- Replace assets in `public/` and update the corresponding references

## Search and AI Agents

The site is built to be found and quoted by search engines (Google, Bing), by answer engines (Google AI Overviews, ChatGPT search, Claude, Perplexity, Copilot), and by agents that read it directly.

- `lib/profile.ts` is the single source for who Adith is. The JSON-LD graph, the About page, `llms.txt` and the markdown views all read from it. The animated homepage sections keep their own copy, so change a fact in both places.
- `lib/structured-data.ts` builds the schema.org graph. Every page points back to one Person (`https://adith.xyz/#person`) and one WebSite.
- `/about` is the plain, server-rendered profile page that answer engines can quote.
- `/llms.txt` and `/llms-full.txt` describe the site for language models, and every page has a markdown copy at its own URL plus `.md` (for example `/projects/aetherquery.md`), built by `lib/markdown.ts`.
- `/robots.txt` (`app/robots.txt/route.ts`) welcomes search, answer engine and training crawlers by name.
- `/sitemap.xml` lists every indexable page and its images.

When content changes:

1. Bump `siteUpdated` in `lib/seo-data.ts`. It is the sitemap's `lastmod`, which Google only trusts while it moves with real changes.
2. After the deploy, run `pnpm indexnow` to ask Bing and the other IndexNow engines to recrawl.

Search Console and Bing Webmaster Tools verification tags come from the `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` environment variables.
