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
 * One closing band on every page, rendered on the server.
 *
 * It does three jobs the animated sections cannot: it says in plain text
 * whose site this is on every URL, it gives crawlers and agents real links
 * to every top-level page (the homepage nav scrolls rather than links), and
 * its rel="me" links tie this site to the same person's GitHub and LinkedIn.
 */
export default function SiteFooter() {
  return (
    <footer className="relative bg-[#111] px-6 pb-10 pt-14 text-[#E8DDD0] sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p
            className="text-5xl uppercase leading-[0.9] text-[#F0EBE0] sm:text-6xl"
            style={{ fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
          >
            {profile.name}
          </p>
          <div className="mt-5 h-1 w-16 bg-[#CFDE00]" />
          <p className="mt-5 max-w-md leading-7 text-[#E8DDD0]/75">
            Backend engineer and systems builder, studying Computer Science
            and Engineering at VIT Vellore. Open to backend, systems and
            infrastructure internships.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 font-mono text-xs font-bold uppercase tracking-[0.14em]">
          <nav aria-label="Site">
            <p className="text-[#CFDE00]">Site</p>
            <ul className="mt-4 space-y-3">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#CFDE00]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Elsewhere">
            <p className="text-[#CFDE00]">Elsewhere</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={profile.links.github}
                  rel="me noreferrer"
                  target="_blank"
                  className="hover:text-[#CFDE00]"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  rel="me noreferrer"
                  target="_blank"
                  className="hover:text-[#CFDE00]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="hover:text-[#CFDE00]">
                  Email
                </a>
              </li>
              <li>
                <a href="/llms.txt" className="hover:text-[#CFDE00]">
                  llms.txt
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-between gap-4 border-t border-[#E8DDD0]/15 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[#E8DDD0]/55">
        <span>
          {profile.name} | {new Date().getFullYear()}
        </span>
        <span>adith.xyz</span>
      </div>
    </footer>
  );
}
