import Link from "next/link";
import { profile } from "@/lib/profile";

const DISPLAY = "var(--font-anton), 'Arial Black', Impact, sans-serif";

const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
];

/**
 * The sign-off on every page, rendered on the server.
 *
 * It does three jobs the animated sections cannot: it says in plain text
 * whose site this is on every URL, it gives crawlers and agents real links
 * to every top-level page (the homepage nav scrolls rather than links), and
 * its rel="me" links tie this site to the same person's GitHub and LinkedIn.
 *
 * On the homepage it follows Contact, so it shares that section's ink
 * surface, grain, grid and column width and the two read as one piece. The
 * name is the last thing on the page: set as wide as the column, first name
 * solid, surname in outline.
 */
export default function SiteFooter() {
  return (
    <footer
      className="relative -mt-px overflow-hidden bg-[#111111] px-6 pt-8 text-[#F0EBE0] sm:px-10 lg:px-16"
      style={{ isolation: "isolate" }}
    >
      {/* Same grain and grid as Contact, so there is no seam between them. */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,.24)_0.7px,transparent_0.7px)] [background-size:16px_16px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(232,221,208,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(232,221,208,.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-7xl [container-type:inline-size]">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-6 border-t border-[#F0EBE0]/10 pt-6 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
          <nav aria-label="Site">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-[#F0EBE0]/75 hover:text-[#CFDE00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Elsewhere">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              <li>
                <a
                  href={profile.links.github}
                  rel="me noreferrer"
                  target="_blank"
                  className="inline-block py-1 text-[#F0EBE0]/75 hover:text-[#CFDE00]"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  rel="me noreferrer"
                  target="_blank"
                  className="inline-block py-1 text-[#F0EBE0]/75 hover:text-[#CFDE00]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-block py-1 text-[#F0EBE0]/75 hover:text-[#CFDE00]"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  className="inline-block py-1 text-[#F0EBE0]/75 hover:text-[#CFDE00]"
                >
                  llms.txt
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8A8B6D]">
          <span>Backend engineer and systems builder, VIT Vellore</span>
          <span>{new Date().getFullYear()} / adith.xyz</span>
        </p>

        {/* The name, as wide as the column. */}
        <p
          className="mt-4 select-none whitespace-nowrap pb-[3cqi] text-[23.5cqi] uppercase leading-[0.9] sm:pb-[1.2cqi] sm:text-[15.4cqi] sm:leading-[0.8]"
          style={{ fontFamily: DISPLAY, letterSpacing: "-0.01em" }}
        >
          <span className="block text-[#F0EBE0] sm:inline">
            {profile.givenName}
          </span>{" "}
          <span
            className="block text-transparent sm:inline"
            style={{ WebkitTextStroke: "1.5px #F0EBE0" }}
          >
            {profile.familyName}
          </span>
        </p>
      </div>
    </footer>
  );
}
