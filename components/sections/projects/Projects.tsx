"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { BlurIn } from "@/components/ui/react-bits";
import { projects as catalogue, type Project } from "@/lib/seo-data";
import styles from "./Projects.module.css";

/**
 * The home projects section: a desk with four case sheets and four notes.
 *
 * The catalogue in lib/seo-data holds every project and /projects lists them
 * all. This section is the opposite: it shows the four projects from the
 * resume properly, a few smaller ones worth a look, and sends everything
 * else to the archive. What is written here is the desk dressing only (the
 * line under the name, the receipts, the drawing); names, years, stacks and
 * links still come from the catalogue.
 *
 * Layout is plain flow. The sheets are tilted with transforms, which do not
 * take part in layout, so nothing can collide at any viewport size.
 */

type Sheet = {
  slug: string;
  deck: string;
  /** Handwritten margin note. */
  note: string;
  /** Results, straight from the resume. */
  receipts: ReactNode[];
  stack: string[];
  paper: "blue" | "vermilion" | "bright" | "moss";
  fastener: "clip" | "tape" | "spiral" | "pin";
  figure: ReactNode;
};

/** Deterministic pseudo-random from a string, so the title tilt is stable. */
function seeded(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  }
  return (h >>> 0) / 4294967295;
}

/* ── Drawings ──────────────────────────────────────────────────────────
   One per sheet, each of the thing the project actually does. */

const MONO = "var(--font-mono), ui-monospace, monospace";

function FigureQuery() {
  return (
    <svg viewBox="0 0 320 150" className={styles.figure} aria-hidden="true">
      <rect width="320" height="150" fill="#111" />
      <text x="16" y="30" fill="#F0EBE0" fontFamily={MONO} fontSize="11">
        exact
      </text>
      <rect x="16" y="38" width="264" height="22" fill="#F0EBE0" />
      <text x="288" y="54" fill="#F0EBE0" fontFamily={MONO} fontSize="12">
        40s
      </text>
      <text x="16" y="92" fill="#CFDE00" fontFamily={MONO} fontSize="11">
        approximate
      </text>
      <rect x="16" y="100" width="20" height="22" fill="#CFDE00" />
      <text x="44" y="116" fill="#CFDE00" fontFamily={MONO} fontSize="12">
        3s
      </text>
      <path
        d="M150 111 C190 96 228 96 262 72"
        fill="none"
        stroke="#E8420A"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <path d="M262 72 l-11 1 M262 72 l-4 10" stroke="#E8420A" strokeWidth="2" />
    </svg>
  );
}

function FigureStream() {
  return (
    <svg viewBox="0 0 320 150" className={styles.figure} aria-hidden="true">
      <rect width="320" height="150" fill="#111" />
      <rect x="14" y="42" width="78" height="52" fill="none" stroke="#F0EBE0" strokeWidth="2.5" />
      <path d="M40 106 h26 M53 94 v12" stroke="#F0EBE0" strokeWidth="2.5" />
      <text x="53" y="72" textAnchor="middle" fill="#F0EBE0" fontFamily={MONO} fontSize="11">
        macOS
      </text>
      <rect x="228" y="42" width="78" height="52" fill="none" stroke="#CFDE00" strokeWidth="2.5" />
      <path d="M254 106 h26 M267 94 v12" stroke="#CFDE00" strokeWidth="2.5" />
      <text x="267" y="72" textAnchor="middle" fill="#CFDE00" fontFamily={MONO} fontSize="11">
        Windows
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          className={styles.frame}
          style={{ animationDelay: `${i * -0.36}s` }}
          x="104"
          y="60"
          width="14"
          height="16"
          fill="#E8420A"
        />
      ))}
      <text x="160" y="124" textAnchor="middle" fill="#8A8B6D" fontFamily={MONO} fontSize="10">
        HEVC over QUIC, no relay
      </text>
    </svg>
  );
}

function FigureMachines() {
  const row = (y: number, a: string, b: string) => (
    <>
      <text x="26" y={y} fill="#F0EBE0" fontFamily={MONO} fontSize="10.5">
        {a}
      </text>
      <text x="196" y={y} fill="#111" fontFamily={MONO} fontSize="10.5">
        {b}
      </text>
    </>
  );
  return (
    <svg viewBox="0 0 320 150" className={styles.figure} aria-hidden="true">
      <rect width="320" height="150" fill="#111" />
      <rect x="14" y="16" width="124" height="104" fill="none" stroke="#F0EBE0" strokeWidth="2.5" />
      <rect x="184" y="16" width="124" height="104" fill="#E8420A" stroke="#E8420A" strokeWidth="2.5" />
      <text x="26" y="38" fill="#CFDE00" fontFamily={MONO} fontSize="11" fontWeight="700">
        yours
      </text>
      <text x="196" y="38" fill="#111" fontFamily={MONO} fontSize="11" fontWeight="700">
        theirs
      </text>
      {row(60, "8 cores", "4 cores")}
      {row(78, "12 ms", "180 ms")}
      {row(96, "0% loss", "2% loss")}
      {row(114, "en-US", "en-IN")}
      <path d="M144 68 h32 M176 68 l-8 -6 M176 68 l-8 6" stroke="#CFDE00" strokeWidth="2.5" fill="none" />
      <text x="161" y="140" textAnchor="middle" fill="#8A8B6D" fontFamily={MONO} fontSize="10">
        capture, then replay
      </text>
    </svg>
  );
}

function FigureServices() {
  const nodes: [number, number][] = [
    [46, 38],
    [130, 26],
    [214, 40],
    [84, 100],
    [170, 92],
    [262, 104],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [3, 4],
    [2, 5],
    [4, 5],
  ];
  const bad = 4;
  return (
    <svg viewBox="0 0 320 150" className={styles.figure} aria-hidden="true">
      <rect width="320" height="150" fill="#111" />
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={a === bad || b === bad ? "#E8420A" : "#8A8B6D"}
          strokeWidth="2"
          strokeDasharray={a === bad || b === bad ? "4 4" : undefined}
        />
      ))}
      <circle className={styles.ping} cx={nodes[bad][0]} cy={nodes[bad][1]} r="12" fill="none" stroke="#E8420A" strokeWidth="2" />
      {nodes.map(([x, y], i) => (
        <rect
          key={i}
          x={x - 9}
          y={y - 9}
          width="18"
          height="18"
          fill={i === bad ? "#E8420A" : "#111"}
          stroke={i === bad ? "#E8420A" : "#F0EBE0"}
          strokeWidth="2.5"
        />
      ))}
      <text x="188" y="80" fill="#E8420A" fontFamily={MONO} fontSize="10.5">
        anomaly
      </text>
      <text x="16" y="140" fill="#8A8B6D" fontFamily={MONO} fontSize="10">
        6 services, one of them lying
      </text>
    </svg>
  );
}

const SHEETS: Sheet[] = [
  {
    slug: "aetherquery",
    deck: "SQL analytics engine that answers before the exact query finishes",
    note: "sql analytics at scale",
    receipts: [
      <>
        Up to <mark>18x faster</mark> on a 65M-row TPC{"\u2011"}H run
      </>,
      <>
        <mark>40s down to 3s</mark> at 95%+ accuracy
      </>,
      <>Top 10 at Women Techies&apos;26</>,
    ],
    stack: ["Python", "FastAPI", "DuckDB", "PostgreSQL"],
    paper: "blue",
    fastener: "clip",
    figure: <FigureQuery />,
  },
  {
    slug: "renderd",
    deck: "Makes a Windows PC the second monitor of a Mac",
    note: "built solo. yes, all of it",
    receipts: [
      <>
        macOS to Windows, <mark>zero-copy HEVC</mark>
      </>,
      <>
        <mark>13 crates</mark>, 234 tests
      </>,
      <>Peer to peer. No cloud in the middle</>,
    ],
    stack: ["Rust", "QUIC", "VideoToolbox", "D3D12"],
    paper: "vermilion",
    fastener: "tape",
    figure: <FigureStream />,
  },
  {
    slug: "morph",
    deck: "Rebuilds the machine your bug happened on",
    note: "now it breaks here too",
    receipts: [
      <>
        Led a <mark>3-person team</mark> at an international hackathon
      </>,
      <>
        <mark>475 tests</mark>
      </>,
      <>Network shaping with Linux tc and cgroups</>,
    ],
    stack: ["Python", "FastAPI", "React", "tc / cgroups"],
    paper: "bright",
    fastener: "pin",
    figure: <FigureMachines />,
  },
  {
    slug: "archaic",
    deck: "Breaks a cluster on purpose, then explains what broke",
    note: "observability @ scale",
    receipts: [
      <>
        <mark>100+ failure scenarios</mark> across 6 services
      </>,
      <>Isolation Forest anomaly detection</>,
      <>An LLM recommends the root cause</>,
    ],
    stack: ["Kubernetes", "OpenTelemetry", "Prometheus", "Grafana"],
    paper: "moss",
    fastener: "spiral",
    figure: <FigureServices />,
  },
];

type Note = {
  slug: string;
  line: string;
  scribble: string;
  paper: "volt" | "bright" | "blue" | "deep";
};

const NOTES: Note[] = [
  {
    slug: "bf-server",
    line: "An HTTP server written in Brainfuck. Routing included.",
    scribble: "eight instructions were enough",
    paper: "volt",
  },
  {
    slug: "hybrid-symbol-table",
    line: "C11 symbol table for embedded compilers. Scope teardown measured 601x faster than a chained free() loop.",
    scribble: "measured, not guessed",
    paper: "bright",
  },
  {
    slug: "reference-hallucination-detector",
    line: "Checks every citation in a PDF against DBLP and flags the papers that were never written.",
    scribble: "my most starred repo",
    paper: "blue",
  },
  {
    slug: "mkv-player",
    line: "A 500 KB native MKV player for Mac.",
    scribble: "train wifi could not fetch VLC",
    paper: "deep",
  },
];

const bySlug = (slug: string) => catalogue.find((p) => p.slug === slug);

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

function Headline() {
  const lines = [
    ["PRO", "JECT"],
    ["ARCHI", "VE."],
  ];
  return (
    <h2 className={styles.title} aria-label="Project archive">
      {lines.map((line, li) => (
        <span key={li} className={styles.titleLine} aria-hidden="true">
          {line.map((word, wi) => {
            const r = seeded(`${word}-${li}-${wi}`);
            return (
              <span
                key={word}
                className={styles.titleWord}
                style={{
                  transform: `translateY(${Math.round(r * 12 - 6)}px) rotate(${r * 3 - 1}deg) scale(${0.98 + r * 0.05})`,
                  letterSpacing: `${-(0.03 + r * 0.03).toFixed(3)}em`,
                }}
              >
                <BlurIn delay={0.02 * wi}>{word}</BlurIn>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

function SheetCard({ sheet, index }: { sheet: Sheet; index: number }) {
  const project = bySlug(sheet.slug) as Project;
  return (
    <li
      className={`${styles.sheet} ${styles[sheet.paper]}`}
      style={{ ["--i" as string]: index }}
    >
      <span className={`${styles.fastener} ${styles[sheet.fastener]}`} aria-hidden="true" />
      <p className={styles.note} aria-hidden="true">
        {sheet.note}
      </p>
      <p className={styles.meta}>
        <span>[{String(index + 1).padStart(2, "0")}]</span>
        <span>{project.tags.join(" / ")}</span>
        <b>{project.year}</b>
      </p>
      <h3 className={styles.name}>
        <Link href={`/projects/${project.slug}`} className={styles.stretch}>
          {project.title}
        </Link>
      </h3>
      <p className={styles.deck}>{sheet.deck}</p>
      {sheet.figure}
      <ul className={styles.receipts}>
        {sheet.receipts.map((receipt, i) => (
          <li key={i}>{receipt}</li>
        ))}
      </ul>
      <ul className={styles.stack} aria-label="Stack">
        {sheet.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className={styles.sheetFoot}>
        <span className={styles.read}>
          Read the build <Arrow />
        </span>
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className={styles.source}
            aria-label={`${project.title} source on GitHub`}
          >
            Source
          </a>
        ) : (
          <span className={styles.private}>Source is private</span>
        )}
      </p>
    </li>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      className={styles.section}
      aria-label="Projects by Adith Manikonda"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <Headline />
          <i className={styles.rule} aria-hidden="true" />
          <p className={styles.lede}>
            Selected projects.
            <br />
            Built with intent.
          </p>
          <p className={styles.stamps}>
            <span>2026</span>
            <span>TOTAL PROJECTS / {catalogue.length}</span>
            <span>{"// SHIP HARD. BUILD IMPACT."}</span>
          </p>
          <p className={styles.aside} aria-hidden="true">
            the four I would show you first
            <svg viewBox="0 0 60 40" width="60" height="40">
              <path d="M4 8 C22 4 40 12 50 30 M50 30 l-10 -3 M50 30 l1 -11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </p>
        </header>

        <div className={styles.desk}>
          <ol className={styles.sheets}>
            {SHEETS.map((sheet, i) => (
              <SheetCard key={sheet.slug} sheet={sheet} index={i} />
            ))}
          </ol>

          <div className={styles.also}>
            <h3 className={styles.alsoTitle}>Also on the desk</h3>
            <ul className={styles.notes}>
              {NOTES.map((note, i) => {
                const project = bySlug(note.slug) as Project;
                return (
                  <li
                    key={note.slug}
                    className={`${styles.sticky} ${styles[note.paper]}`}
                    style={{ ["--i" as string]: i }}
                  >
                    <h4 className={styles.stickyName}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.stretch}
                      >
                        {project.title}
                      </Link>
                    </h4>
                    <p className={styles.stickyLine}>{note.line}</p>
                    <p className={styles.scribble}>{note.scribble}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
