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
