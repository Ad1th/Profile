"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Anton } from "next/font/google";
import Link from "next/link";
import { BlurIn, Magnetic } from "@/components/ui/react-bits";
import { projects as catalogue, type Project } from "@/lib/seo-data";
import "./Projects.module.css";

const anton = Anton({ weight: "400", subsets: ["latin"] });

// Deterministic pseudo-random from string (stable across renders)
function seededRandom(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  }
  return (h >>> 0) / 4294967295;
}

function ProjectHeadline({ layout = "B" }: { layout?: "A" | "B" | "C" }) {
  // Define line/word splits for the three layout options
  const lines: string[][] =
    layout === "B"
      ? [
          ["PRO", "JECT"],
          ["ARCHI", "VE."],
        ]
      : layout === "C"
        ? [["PROJECT"], ["ARCHIVE."]]
        : [["PROJECT"], ["ARCHIVE"]];

  return (
    <h2 className="projects-display-title" aria-label="Project Archive">
      {lines.map((line, li) => (
        <div
          key={li}
          style={{ display: "block", lineHeight: 0.86, whiteSpace: "nowrap" }}
        >
          {line.map((word, wi) => {
            const seed = `${word}-${li}-${wi}`;
            const r = seededRandom(seed);
            const rotate = r * 3 - 1; // -1 .. +2 deg
            const translateY = Math.round(r * 12 - 6); // -6 .. +6 px
            const scale = 0.98 + r * 0.05; // 0.98 .. 1.03
            const letterSpacing = `${-(0.03 + r * 0.03).toFixed(3)}em`; // -0.03 .. -0.06em

            const style = {
              display: "inline-block",
              transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
              transformOrigin: "left top",
              marginRight: 6,
              letterSpacing,
            };

            return (
              <span
                key={wi}
                className="projects-display-word"
                style={style}
                aria-hidden={false}
              >
                <BlurIn delay={0.02 * wi}>{word}</BlurIn>
              </span>
            );
          })}
        </div>
      ))}
    </h2>
  );
}

type PaperStyle = {
  deck: string;
  note: string;
  paper: "orange" | "blue" | "white" | "yellow";
  visual: "network" | "benchmark" | "observability" | "wave";
  className: string;
  parallax: number;
};

type FeaturedProject = PaperStyle & {
  id: string;
  slug: string;
  name: string;
  description: string;
  stack: string[];
  year: string;
  github?: string;
  screenshots: string[];
};

type ArchiveProject = {
  id: string;
  slug: string;
  name: string;
  stack: string;
  year: string;
  description: string;
  github?: string;
  screenshots: string[];
  href?: string;
};

/**
 * Every project on the site lives in lib/seo-data. This section only adds
 * the desk styling for the four featured papers; the rest is derived, so a
 * new project in the catalogue shows up here, on /projects and in the
 * sitemap at the same time.
 */
const FEATURED: Record<string, PaperStyle> = {
  "scotland-yard": {
    deck: "Multiplayer Game Backend",
    note: "low latency sync",
    paper: "orange",
    visual: "network",
    className: "projects-paper--scotland",
    parallax: 0.8,
  },
  aetherquery: {
    deck: "Analytical Query Engine",
    note: "sql analytics at scale",
    paper: "blue",
    visual: "benchmark",
    className: "projects-paper--aether",
    parallax: 1,
  },
  archaic: {
    deck: "Reliability Engineering Platform",
    note: "observability @ scale",
    paper: "white",
    visual: "observability",
    className: "projects-paper--archaic",
    parallax: 0.7,
  },
  "point-wave-energy-harvester": {
    deck: "IoT Based Energy Harvesting System",
    note: "energy harvesting + iot",
    paper: "yellow",
    visual: "wave",
    className: "projects-paper--wave",
    parallax: 1.1,
  },
};

const realShots = (p: Project) =>
  p.screenshots.filter((x) => !x.endsWith("_placeholder.svg"));

const featuredProjects: FeaturedProject[] = Object.entries(FEATURED).flatMap(
  ([slug, style], i) => {
    const p = catalogue.find((x) => x.slug === slug);
    if (!p) return [];
    return [
      {
        id: String(i + 1).padStart(2, "0"),
        slug,
        name: p.title,
        description: p.description,
        stack: p.technologies.slice(0, 4),
        year: p.year,
        github: p.github,
        screenshots: realShots(p),
        ...style,
      },
    ];
  },
);

const archiveProjects: ArchiveProject[] = catalogue
  .filter((p) => !(p.slug in FEATURED))
  .map((p, i) => ({
    id: String(featuredProjects.length + i + 1).padStart(2, "0"),
    slug: p.slug,
    name: p.title,
    stack: p.technologies.slice(0, 3).join(" / "),
    year: p.year,
    description: p.description,
    github: p.github,
    screenshots: realShots(p),
  }));

function DoodleVisual({ type }: { type: FeaturedProject["visual"] }) {
  if (type === "network") {
    return (
      <svg viewBox="0 0 320 170" className="projects-visual" aria-hidden="true">
        <rect width="320" height="170" fill="#111" />
        {[...Array(13)].map((_, i) => {
          const x = 28 + ((i * 47) % 260);
          const y = 26 + ((i * 31) % 118);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 5 : 3}
              fill="#913831"
            />
          );
        })}
        {[...Array(18)].map((_, i) => (
          <line
            key={i}
            x1={20 + ((i * 37) % 280)}
            y1={22 + ((i * 29) % 125)}
            x2={34 + ((i * 61) % 260)}
            y2={18 + ((i * 43) % 130)}
            stroke="#8B6A52"
            strokeWidth="1.4"
            opacity="0.65"
          />
        ))}
      </svg>
    );
  }

  if (type === "benchmark") {
    return (
      <svg viewBox="0 0 320 170" className="projects-visual" aria-hidden="true">
        <rect width="320" height="170" fill="#10151b" />
        {[...Array(22)].map((_, i) => (
          <rect
            key={i}
            x={10 + i * 14}
            y={132 - ((i * 19) % 98)}
            width="7"
            height={20 + ((i * 17) % 118)}
            fill={i % 3 === 0 ? "#D8D1C7" : "#6E8CA6"}
            opacity="0.72"
          />
        ))}
        <polyline
          points="0,130 38,112 72,124 106,82 148,95 184,46 230,66 276,35 320,54"
          fill="none"
          stroke="#D8D1C7"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (type === "observability") {
    return (
      <svg viewBox="0 0 320 170" className="projects-visual" aria-hidden="true">
        <rect width="320" height="170" fill="#151515" />
        {[
          "Services",
          "Observability",
          "Tracing",
          "Metrics",
          "Logs",
          "Storage",
          "Analysis",
          "Alerts",
        ].map((label, i) => (
          <g
            key={label}
            transform={`translate(${28 + (i % 3) * 92}, ${18 + Math.floor(i / 3) * 48})`}
          >
            <rect
              width="78"
              height="24"
              fill="none"
              stroke="#D8D1C7"
              strokeWidth="1.5"
            />
            <text
              x="39"
              y="16"
              textAnchor="middle"
              fill="#D8D1C7"
              fontSize="9"
              fontFamily="var(--font-mono), monospace"
            >
              {label}
            </text>
          </g>
        ))}
        <path
          d="M160 42 V68 M82 90 L120 70 M198 90 L188 70 M82 138 L82 118 M174 138 L174 118 M266 138 L266 118"
          stroke="#777"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 170" className="projects-visual" aria-hidden="true">
      <rect width="320" height="170" fill="#9FA76B" opacity="0.18" />
      <circle
        cx="86"
        cy="70"
        r="32"
        fill="none"
        stroke="#111"
        strokeWidth="2"
      />
      <path
        d="M58 70 C78 50 98 90 118 70 S158 50 178 70 218 90 238 70"
        fill="none"
        stroke="#111"
        strokeWidth="2"
      />
      <path
        d="M58 132 C98 118 136 144 176 126 218 108 252 132 286 116"
        fill="none"
        stroke="#111"
        strokeWidth="2"
      />
      <line x1="86" y1="34" x2="86" y2="126" stroke="#111" strokeWidth="2" />
      <rect
        x="205"
        y="66"
        width="54"
        height="40"
        fill="none"
        stroke="#111"
        strokeWidth="2"
      />
      <text
        x="232"
        y="91"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="11"
        fill="#111"
      >
        MPPT
      </text>
    </svg>
  );
}

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{ width: "100%", maxHeight: 360, objectFit: "contain" }}
    />
  );
}

function FeaturedPaper({
  project,
  selected,
  onSelect,
}: {
  project: FeaturedProject;
  selected: boolean;
  onSelect: (project: FeaturedProject) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [24 * project.parallax, -24 * project.parallax],
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={`Select ${project.name} project`}
      className={`projects-paper projects-paper--${project.paper} ${project.className} ${selected ? "is-selected" : ""}`}
      style={{ y }}
      onClick={() => onSelect(project)}
      whileHover={{ y: -6, rotate: project.id === "03" ? 0.6 : -0.6 }}
      whileTap={{ y: -8, rotate: 0, scale: 0.995 }}
    >
      <span className="projects-clip" />
      <span className="projects-tape projects-tape--top" />
      {project.id === "04" && <span className="projects-spiral" />}
      <span className="projects-paper-meta">
        [{project.id}] <b>{project.year}</b>
      </span>
      <h3 className={project.id === "03" ? "" : anton.className}>
        {project.name}
      </h3>
      <p className="projects-deck">{project.deck}</p>
      <DoodleVisual type={project.visual} />
      <p className="projects-desc">{project.description}</p>
      <div className="projects-stack">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <span className="projects-note">{project.note}</span>
    </motion.button>
  );
}

function CrtMonitor({
  project,
  mode,
  booting,
  onToggleMode,
}: {
  project: FeaturedProject | ArchiveProject;
  mode: "details" | "preview" | "links";
  booting: boolean;
  onToggleMode: () => void;
}) {
  const stack = Array.isArray(project.stack)
    ? project.stack
    : project.stack.split(" / ");
  const title = `${project.name.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}.EXE`;
  const imageBases = project.screenshots;

  // Line-by-line content for loading animation
  const contentLines = [
    { type: "title", text: title },
    { type: "header", text: project.name },
    { type: "desc", text: project.description },
    { type: "stackLabel", text: "STACK:" },
    ...stack.map((item) => ({ type: "stackItem", text: item })),
    { type: "actions", text: "□ FILE    □ PREVIEW    □ LINKS" },
  ];

  const previewLines =
    imageBases.length > 0
      ? []
      : [
          { type: "title", text: "IMAGE PREVIEW MODE" },
          { type: "header", text: project.name },
          { type: "preview", text: "No screenshots on file yet." },
        ];

  const displayLines = mode === "details" ? contentLines : previewLines;

  const [imageIndex, setImageIndex] = useState(0);

  // Boot sequence lines (typewriter style) — vary by mode
  const bootLines =
    mode === "preview"
      ? [
          "INITIALIZING PREVIEW MODE…",
          "LOCATING ASSETS…",
          `${imageBases.length} FILES FOUND`,
          "READY",
        ]
      : mode === "links"
        ? ["LOADING LINKS MODULE…", "RESOLVING HOSTS…", "READY"]
        : ["LOADING PROJECT DATA…", "INDEXING FILES…", "READY"];

  return (
    <div
      className={`projects-crt ${booting ? "is-booting" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`Toggle ${project.name} project details, preview and links`}
      onClick={onToggleMode}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleMode();
        }
      }}
    >
      <span className="projects-crt-power" />
      <div className="projects-crt-screen">
        <span className="projects-scanline" />

        {booting ? (
          <div className="projects-crt-boot">
            {bootLines.map((l, i) => (
              <div
                key={i}
                className="projects-boot-line"
                style={{ ["--i" as any]: i }}
              >
                {l}
                <span className="projects-crt-cursor" />
              </div>
            ))}
          </div>
        ) : mode === "details" ? (
          <div className="projects-crt-copy">
            {displayLines.map((line, idx) =>
              line.type === "stackLabel" ? (
                <motion.strong
                  key={idx}
                  className="projects-crt-line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {line.text}
                </motion.strong>
              ) : line.type === "stackItem" ? (
                <motion.div
                  key={idx}
                  className="projects-crt-line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {line.text}
                </motion.div>
              ) : line.type === "actions" ? (
                <motion.div
                  key={idx}
                  className="projects-crt-actions"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {line.text}
                </motion.div>
              ) : line.type === "header" ? (
                <motion.h3
                  key={idx}
                  className="projects-crt-line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {line.text}
                </motion.h3>
              ) : line.type === "desc" ? (
                <motion.span
                  key={idx}
                  className="projects-crt-line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {line.text}
                </motion.span>
              ) : (
                <motion.p
                  key={idx}
                  className="projects-crt-line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {line.text}
                </motion.p>
              ),
            )}
          </div>
        ) : mode === "preview" ? (
          <div className="projects-preview-mode">
            {imageBases.length > 0 ? (
              <div className="projects-image-wrap">
                <button
                  type="button"
                  className="projects-image-nav prev"
                  aria-label={`Show previous ${project.name} screenshot`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(
                      (i) => (i - 1 + imageBases.length) % imageBases.length,
                    );
                  }}
                >
                  PREV
                </button>
                <PreviewImage
                  src={imageBases[imageIndex]}
                  alt={`${project.name} preview ${imageIndex + 1}`}
                />
                <button
                  type="button"
                  className="projects-image-nav next"
                  aria-label={`Show next ${project.name} screenshot`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex((i) => (i + 1) % imageBases.length);
                  }}
                >
                  NEXT
                </button>
              </div>
            ) : (
              displayLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  className="projects-crt-line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {line.type === "header" && <h3>{line.text}</h3>}
                  {line.type === "title" && <p>{line.text}</p>}
                  {line.type === "preview" && <span>{line.text}</span>}
                </motion.div>
              ))
            )}
          </div>
        ) : (
          // LINKS mode
          <div className="projects-crt-copy">
            <motion.h3 className="projects-crt-line">EXTERNAL LINKS</motion.h3>
            <motion.div className="projects-crt-line projects-crt-links">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name} GitHub repository`}
                  onClick={(e) => e.stopPropagation()}
                >
                  &gt; GITHUB
                </a>
              ) : (
                <span>&gt; SOURCE NOT PUBLIC</span>
              )}
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Open the ${project.name} project page`}
                onClick={(e) => e.stopPropagation()}
              >
                &gt; PROJECT PAGE
              </Link>
            </motion.div>
          </div>
        )}

        {/* Status bar */}
        <div className="projects-crt-status">
          <span>{`PROJECT: ${project.name.split(" ")[0] || project.name}`}</span>
          <span>{`MODE: ${mode.toUpperCase()}`}</span>
          <span>{`FILES: ${imageBases.length}`}</span>
        </div>
      </div>
      <span className="projects-crt-tape">ship &gt; iterate &gt; repeat</span>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<FeaturedProject | ArchiveProject>(
    featuredProjects[0],
  );
  const [crtMode, setCrtMode] = useState<"details" | "preview" | "links">(
    "details",
  );
  const [booting, setBooting] = useState(false);

  const allRows = useMemo(
    () => [
      ...archiveProjects,
      {
        id: "+",
        slug: "",
        name: "Full archive",
        stack: "EVERY BUILD / DETAIL PAGES / FILTERS",
        year: "",
        description: "Every project with its own page, searchable.",
        screenshots: [],
        href: "/projects",
      } satisfies ArchiveProject,
    ],
    [],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let rowObserver: IntersectionObserver | null = null;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 84%",
          once: true,
        },
      });

      tl.from(".projects-grid-line", {
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.04,
        duration: 0.42,
        ease: "power2.out",
      })
        .from(
          ".projects-mark",
          { y: 8, rotate: -4, opacity: 0, stagger: 0.04, duration: 0.28 },
          "-=0.28",
        )
        .from(
          ".projects-paper--scotland",
          {
            x: -170,
            y: 42,
            rotate: -12,
            duration: 0.62,
            ease: "back.out(1.4)",
          },
          "-=0.12",
        )
        .from(
          ".projects-paper--aether",
          { y: -180, rotate: 5, duration: 0.6, ease: "bounce.out" },
          "-=0.42",
        )
        .from(
          ".projects-paper--archaic",
          { x: 80, y: 80, rotate: 18, duration: 0.56, ease: "back.out(1.7)" },
          "-=0.36",
        )
        .from(
          ".projects-paper--wave",
          { x: 145, y: -80, rotate: 11, duration: 0.54, ease: "back.out(1.5)" },
          "-=0.24",
        )
        .from(
          ".projects-clip, .projects-tape",
          {
            rotate: 8,
            y: -8,
            stagger: 0.025,
            duration: 0.22,
            ease: "power2.out",
          },
          "-=0.1",
        );

      // Removed conflicting float animations — the papers now stay put after entrance
      // CSS keyframe 'projects-paper-breathe' provides subtle breathing if needed

      // The archive rows wipe in once the index scrolls into view. This used
      // to hang off a ScrollTrigger that never fired, which left the table
      // empty on desktop and phones.
      const rowEls = gsap.utils.toArray<HTMLElement>(".projects-archive-row");
      const archiveEl = sectionRef.current?.querySelector(".projects-archive");
      gsap.set(rowEls, { clipPath: "inset(0 100% 0 0)" });
      const revealRows = () => {
        gsap.to(rowEls, {
          clipPath: "inset(0 0% 0 0)",
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "clipPath",
        });
      };
      if (archiveEl && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              revealRows();
              io.disconnect();
            }
          },
          { rootMargin: "0px 0px -12% 0px" },
        );
        io.observe(archiveEl);
        rowObserver = io;
      } else {
        revealRows();
      }

      gsap.utils
        .toArray<HTMLElement>(".projects-archive-row")
        .forEach((row) => {
          const scanner = row.querySelector<HTMLElement>(
            ".projects-row-scanner",
          );
          if (!scanner) return;

          row.addEventListener("mouseenter", () => {
            gsap.fromTo(
              scanner,
              { x: "-100%" },
              { x: "100%", duration: 0.6, ease: "power2.out" },
            );
          });
        });

      const driftScroll = {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom top",
        scrub: 0.7,
      };

      // Create drift tweens and keep references so we can disable their ScrollTriggers
      const driftTweens: any[] = [];

      driftTweens.push(
        gsap.to(".projects-paper--scotland", {
          x: -16,
          y: 10,
          rotation: -1,
          scrollTrigger: driftScroll,
        }),
      );

      driftTweens.push(
        gsap.to(".projects-paper--aether", {
          x: 10,
          y: -14,
          rotation: 1,
          scrollTrigger: driftScroll,
        }),
      );

      driftTweens.push(
        gsap.to(".projects-paper--archaic", {
          x: -8,
          y: 18,
          rotation: -1,
          scrollTrigger: driftScroll,
        }),
      );

      driftTweens.push(
        gsap.to(".projects-paper--wave", {
          x: 14,
          y: -8,
          rotation: 1,
          scrollTrigger: driftScroll,
        }),
      );

      driftTweens.push(
        gsap.to(".projects-table", {
          y: -22,
          scrollTrigger: driftScroll,
        }),
      );

      driftTweens.push(
        gsap.to(".projects-crt-column", {
          y: -68,
          scrollTrigger: driftScroll,
        }),
      );

      // After the entry timeline finishes, disable the drift ScrollTriggers so elements stay put.
      tl.eventCallback("onComplete", () => {
        driftTweens.forEach((t) => {
          try {
            t.scrollTrigger && t.scrollTrigger.disable();
          } catch (e) {
            // ignore
          }
        });
      });

      // Re-enable drift when scrolling back up into the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        onEnterBack: () => {
          driftTweens.forEach((t) => {
            try {
              t.scrollTrigger && t.scrollTrigger.enable();
            } catch (e) {
              // ignore
            }
          });
        },
      });
    }, sectionRef);

    // Fonts and images above this section settle after first paint; the
    // trigger positions were measured before that.
    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 600);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      rowObserver?.disconnect();
      ctx.revert();
    };
  }, []);

  const selectProject = (project: FeaturedProject | ArchiveProject) => {
    setSelected(project);
    setCrtMode("details");
    setBooting(true);
    window.setTimeout(() => setBooting(false), 520);
  };

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      className="projects-archive-section"
      aria-label="Projects by Adith Manikonda"
    >
      <div className="projects-desk">
        <div className="projects-grid-lines" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="projects-grid-line"
              style={{ top: `${10 + i * 7}%` }}
            />
          ))}
        </div>
        <span className="projects-mark projects-mark--one">↳ built in go</span>
        <span className="projects-mark projects-mark--two">
          sql analytics
          <br />
          at scale
        </span>
        <span className="projects-mark projects-mark--three">
          energy
          <br />
          harvesting
        </span>

        <div className="projects-hero">
          <div className="projects-title-block">
            <ProjectHeadline layout={"B"} />
            <i />
            <p>
              Selected projects.
              <br />
              Built with intent.
            </p>
            <div className="projects-title-meta">
              <span>2026</span>
              <span>TOTAL PROJECTS / {catalogue.length}</span>
              <Magnetic strength={0.12}>
                <span>// SHIP HARD. BUILD IMPACT.</span>
              </Magnetic>
            </div>
          </div>

          <div className="projects-featured">
            {featuredProjects.map((project) => (
              <FeaturedPaper
                key={project.id}
                project={project}
                selected={selected.name === project.name}
                onSelect={selectProject}
              />
            ))}
          </div>
        </div>

        <div className="projects-lower">
          <div className="projects-archive">
            <div className="projects-archive-heading">
              <h2>ARCHIVE INDEX</h2>
              <span>[ {archiveProjects.length} MORE BUILDS ]</span>
            </div>
            <div className="projects-table">
              <div className="projects-table-head">
                <span>ID</span>
                <span>PROJECT NAME</span>
                <span>STACK</span>
                <span>YEAR</span>
                <span>PREVIEW</span>
              </div>
              {allRows.map((project) =>
                project.href ? (
                  <Link
                    key={project.id}
                    href={project.href}
                    aria-label="Open the full project archive"
                    className="projects-archive-row projects-archive-row--link"
                  >
                    <span>{project.id}</span>
                    <strong>{project.name}</strong>
                    <em>{project.stack}</em>
                    <small>{project.year}</small>
                    <b>&nearr;</b>
                  </Link>
                ) : (
                  <button
                    type="button"
                    key={project.id}
                    aria-label={`Select ${project.name} project`}
                    className={`projects-archive-row ${selected.name === project.name ? "is-selected" : ""}`}
                    onMouseEnter={() => selectProject(project)}
                    onClick={() => selectProject(project)}
                  >
                    <span>{project.id}</span>
                    <strong>{project.name}</strong>
                    <em>{project.stack}</em>
                    <small>{project.year}</small>
                    <b>+</b>
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="projects-crt-column">
            <CrtMonitor
              project={selected}
              mode={crtMode}
              booting={booting}
              onToggleMode={() => {
                setBooting(true);
                setCrtMode((mode) =>
                  mode === "details"
                    ? "preview"
                    : mode === "preview"
                      ? "links"
                      : "details",
                );
                // show boot sequence for a short mechanical delay
                window.setTimeout(() => setBooting(false), 420);
              }}
            />

            <button
              type="button"
              className="projects-preview-sticky"
              aria-label="Toggle preview"
              onClick={() => {
                setBooting(true);
                setCrtMode((mode) =>
                  mode === "details"
                    ? "preview"
                    : mode === "preview"
                      ? "links"
                      : "details",
                );
                window.setTimeout(() => setBooting(false), 420);
              }}
            >
              <span className="projects-preview-sticky-text">
                click again for preview
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
