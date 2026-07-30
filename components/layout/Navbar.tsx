"use client";

/**
 * Navbar.tsx  (fully wired)
 *
 * Features added:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. SCROLL-TO-SECTION: each link scrolls to [data-section] element smoothly.
 *    Map: WORK → skills, ABOUT → about, CONTACT → contact
 *
 * 2. ACTIVE STATE: lime underline animates scaleX 0→1 on the active link.
 *    Driven by IntersectionObserver on data-section elements (same as dots).
 *
 * 3. BACKGROUND SNAP: transparent for first 60px of scroll, then snaps to
 *    #F0EBE0 + border. No transition — brutalist snap.
 *
 * 4. Logo click scrolls to top smoothly.
 *
 * 5. Mobile hamburger opens a full-screen overlay nav (matches brutalist style).
 */

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { easings } from "@/lib/motion";

const NAV_LINKS: { label: string; section?: string; href?: string }[] = [
  { label: "MAIN SITE", href: "/" },
  { label: "WORK", section: "projects" },
  { label: "ALL PROJECTS", href: "/projects" },
  { label: "ABOUT", section: "about" },
  { label: "CONTACT", section: "contact" },
];

const MENU_LINKS: { label: string; section?: string; href?: string }[] = [
  { label: "🏠 HOME / MAIN SITE", href: "/" },
  { label: "⚡ ALL PROJECTS ARCHIVE", href: "/projects" },
  { label: "ABOUT", section: "about" },
  { label: "SKILLS", section: "skills" },
  { label: "EXPERIENCE", section: "experience" },
  { label: "PROJECTS", section: "projects" },
  { label: "PATENTS", section: "patents" },
  { label: "HACKATHONS/ACHIEVEMENTS", section: "hackathons" },
  { label: "CONTACT", section: "contact" },
];

const SECTIONS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "patents",
  "hackathons/achievements",
  "contact",
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // ── State ──────────────────────────────────────────────────────────────
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ── Scroll state: background snap only ────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Track independently rendered layouts so the fixed navbar sits on a
  // solid strip instead of showing page background through it.
  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth <= 1180);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // ── Active section via IntersectionObserver ────────────────────────────
  useEffect(() => {
    if (pathname !== "/") return;

    const els = SECTIONS.map((id) =>
      document.querySelector(`[data-section="${id}"]`),
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // ── Scroll to section or navigate back to home section ──────────────
  const scrollTo = useCallback((section: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push(`/#${section}`);
      return;
    }
    const el = document.querySelector(`[data-section="${section}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${section}`);
    }
  }, [pathname, router]);

  const handleLogoClick = useCallback(() => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, router]);

  // ── Derived: which nav link is "active" ───────────────────────────────
  // Only desktop links use a reduced "active" set (WORK/ABOUT/CONTACT)
  // to match the existing design and requested behavior.
  const getActiveLinkSection = () => {
    if (activeSection === "skills") return "skills";
    if (activeSection === "about") return "about";
    if (activeSection === "contact") return "contact";
    return null;
  };
  const activeLinkSection = getActiveLinkSection();

  // ── Background style (brutalist snap — no transition) ─────────────────
  // Keep navbar solid when body padding reserves space for it.
  const navBg = scrolled || isMobile ? "#F0EBE0" : "transparent";
  const navBorder =
    scrolled || isMobile ? "3px solid #111" : "3px solid transparent";

  return (
    <>
      {/* ── MAIN NAVBAR ─────────────────────────────────────────────────── */}
      <motion.nav
        className="fixed left-0 right-0 top-0 z-[100] flex h-[56px] items-center justify-between px-[12px] md:px-[16px]"
        style={{
          background: navBg,
          borderBottom: navBorder,
          pointerEvents: "none",
          // No CSS transition on bg — brutalist snap
        }}
      >
        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <motion.button
          className="pointer-events-auto flex items-center gap-[12px] outline-none cursor-pointer"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.14 }}
          aria-label="Navigate to Home / Scroll to top"
        >
          <div
            className="flex h-[36px] w-[36px] items-center justify-center border-[3px] border-[#111] bg-[#F45113] md:h-[40px] md:w-[40px]"
            style={{ boxShadow: "3px 3px 0 #111" }}
          >
            <span
              className="pt-[1px] font-archivo text-[20px] font-[900] leading-none tracking-[-0.08em] text-[#111] md:text-[22px]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              A.
            </span>
          </div>
        </motion.button>

        {/* ── Desktop links ─────────────────────────────────────────────── */}
        <div className="pointer-events-auto hidden items-center gap-[28px] md:flex">
          {NAV_LINKS.map(({ label, section, href }) => {
            const isActive = section ? activeLinkSection === section : false;
            
            if (href) {
              return (
                <Link
                  key={label}
                  href={href}
                  className="relative outline-none cursor-pointer"
                  style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    color: "#111",
                    padding: "4px 0",
                    lineHeight: 1,
                  }}
                >
                  <span style={{ opacity: 0.85 }}>{label}</span>
                </Link>
              );
            }

            return (
              <button
                key={label}
                onClick={() => section && scrollTo(section)}
                className="relative outline-none cursor-pointer"
                aria-current={isActive ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#111",
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    opacity: isActive ? 1 : 0.72,
                    transition: "opacity 0.18s",
                  }}
                >
                  {label}
                </span>

                {/* Lime underline — draws in on active */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "#8A8B6D",
                    originX: 0,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.24, ease: easings.primary }}
                />
              </button>
            );
          })}

          <span className="h-[18px] w-[2px] bg-[#111]" />

          {/* Grid icon — acts as hamburger hint on desktop */}
          <button
            className="outline-none cursor-pointer"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <div
              className="grid h-[28px] w-[28px] grid-cols-3 place-items-center bg-[#111] p-[5px]"
              style={{ transition: "opacity 0.15s" }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="h-[2px] w-[2px] rounded-full bg-[#EEE7DC]"
                />
              ))}
            </div>
          </button>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────────────────── */}
        <button
          className="pointer-events-auto flex md:hidden items-center justify-center outline-none cursor-pointer"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{ background: "none", border: "none", padding: 4 }}
        >
          <div
            style={{
              width: 28,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <motion.div
              style={{
                height: 2.5,
                background: "#111",
                transformOrigin: "center",
              }}
              animate={
                mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.div
              style={{ height: 2.5, background: "#111" }}
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.15 }}
            />
            <motion.div
              style={{
                height: 2.5,
                background: "#111",
                transformOrigin: "center",
              }}
              animate={
                mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </motion.nav>

      {/* ── MOBILE / FULL-SCREEN OVERLAY MENU ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col"
            style={{
              background: "#111",
              paddingTop: 80,
              paddingLeft: 32,
              paddingRight: 32,
            }}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.38, ease: easings.primary }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 outline-none cursor-pointer"
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-archivo), sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#F0EBE0",
                lineHeight: 1,
                padding: 8,
              }}
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Links */}
            <nav className="flex flex-col" style={{ gap: 4 }}>
              {MENU_LINKS.map(({ label, section, href }, i) => {
                const isActive = section ? activeSection === section : false;

                if (href) {
                  return (
                    <motion.div key={label}>
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block outline-none cursor-pointer text-left"
                        style={{
                          borderBottom: "2px solid #222",
                          paddingTop: 16,
                          paddingBottom: 18,
                          fontFamily: "var(--font-anton), 'Arial Black', sans-serif",
                          fontSize: "clamp(36px, 7vw, 54px)",
                          fontWeight: 400,
                          letterSpacing: "-0.03em",
                          lineHeight: 0.9,
                          textTransform: "uppercase",
                          color: "#FFE600",
                        }}
                      >
                        {label} ➔
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.button
                    key={label}
                    onClick={() => section && scrollTo(section)}
                    className="outline-none cursor-pointer text-left"
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: "2px solid #222",
                      paddingTop: 16,
                      paddingBottom: 18,
                      fontFamily:
                        "var(--font-anton), 'Arial Black', sans-serif",
                      fontSize: "clamp(36px, 7vw, 54px)",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      lineHeight: 0.9,
                      textTransform: "uppercase",
                      color: isActive ? "#8A8B6D" : "#F0EBE0",
                    }}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.05,
                      ease: easings.primary,
                    }}
                    whileHover={{ x: 12, color: "#8A8B6D" } as any}
                  >
                    {label}
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer */}
            <div
              style={{
                marginTop: "auto",
                paddingBottom: 45,
                fontFamily: "monospace",
                fontSize: 11,
                fontWeight: 700,
                color: "#555",
                letterSpacing: "0.1em",
              }}
            >
              ADITH MANIKONDA | 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
