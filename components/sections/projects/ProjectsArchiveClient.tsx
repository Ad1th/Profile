"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  type Project,
  projects as allProjects,
  patents as allPatents,
} from "@/lib/seo-data";

type ViewMode = "grid" | "table";

const CATEGORIES = [
  "All",
  "Featured",
  "Systems / Backend",
  "AI & ML",
  "CLI & Tools",
  "Web Apps",
  "IoT / Hardware",
  "Patents",
] as const;

const TECH_FILTERS = [
  "Golang",
  "Go",
  "FastAPI",
  "Node.js",
  "Python",
  "C11",
  "Kubernetes",
  "PostgreSQL",
  "DuckDB",
  "Machine Learning",
  "IoT",
  "React",
  "Next.js",
];

const DISPLAY =
  "var(--font-anton), Anton, 'Arial Black', Impact, sans-serif";

const label =
  "font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#A14A32]";

function matches(project: Project, q: string) {
  const hay = [
    project.title,
    project.seoTitle ?? "",
    project.description,
    project.purpose,
    project.year,
    project.category ?? "",
    ...project.technologies,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

export default function ProjectsArchiveClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [tech, setTech] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("grid");

  const techOptions = useMemo(() => {
    const present = new Set<string>();
    allProjects.forEach((p) => p.technologies.forEach((t) => present.add(t)));
    return TECH_FILTERS.filter((t) => present.has(t));
  }, []);

  const q = query.trim().toLowerCase();

  const projects = useMemo(
    () =>
      allProjects.filter((p) => {
        if (category === "Patents") return false;
        if (category === "Featured" && !p.featured) return false;
        if (
          category !== "All" &&
          category !== "Featured" &&
          p.category !== category
        )
          return false;
        if (tech && !p.technologies.includes(tech)) return false;
        if (q && !matches(p, q)) return false;
        return true;
      }),
    [category, tech, q],
  );

  const patents = useMemo(() => {
    if (category !== "All" && category !== "Patents") return [];
    return allPatents.filter((pt) => {
      if (
        tech &&
        !pt.technologies.some((t) => t.toLowerCase() === tech.toLowerCase())
      )
        return false;
      if (
        q &&
        ![pt.title, pt.abstract, ...pt.technologies]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [category, tech, q]);

  const filtered = category !== "All" || tech !== null || q !== "";
  const reset = () => {
    setCategory("All");
    setTech(null);
    setQuery("");
  };

  const withSource = allProjects.filter((p) => p.github).length;

  return (
    <div className="min-h-screen bg-[#EEE7DC] px-6 pb-24 pt-28 text-[#111] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Link
          href="/"
          className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32] hover:text-[#E8420A]"
        >
          &larr; Home
        </Link>
        <p className={`mt-8 ${label}`}>Adith Manikonda / Projects</p>
        <h1
          className="mt-4 text-6xl uppercase leading-[0.9] sm:text-8xl"
          style={{ fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
        >
          Project
          <br />
          <span className="text-[#E8420A]">archive.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#111]/75 sm:text-xl">
          Every build on record, from a C11 symbol table to a wave energy
          harvester. Each one has its own page, and the ones with measured
          results say what was measured.
        </p>

        <dl className="mt-10 grid grid-cols-3 border-y-[3px] border-[#111]">
          {[
            [allProjects.length, "Projects"],
            [allPatents.length, "Patents"],
            [withSource, "With source"],
          ].map(([n, text], i) => (
            <div
              key={text}
              className={`py-5 pr-4 ${i > 0 ? "border-l-[3px] border-[#111] pl-4 sm:pl-6" : ""}`}
            >
              <dd
                className="text-4xl leading-none sm:text-5xl"
                style={{ fontFamily: DISPLAY }}
              >
                {n}
              </dd>
              <dt className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#111]/60">
                {text}
              </dt>
            </div>
          ))}
        </dl>

        {/* Controls */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
          <label className="relative block flex-1">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, stack or year"
              className="w-full border-[3px] border-[#111] bg-[#F0EBE0] px-4 py-3 font-mono text-sm font-bold text-[#111] placeholder:text-[#111]/45"
            />
          </label>
          <div
            className="flex border-[3px] border-[#111] bg-[#F0EBE0]"
            role="group"
            aria-label="View"
          >
            {(["grid", "table"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                aria-pressed={view === mode}
                className={`px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.14em] ${
                  view === mode
                    ? "bg-[#111] text-[#CFDE00]"
                    : "text-[#111] hover:bg-[#E5DED2]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-b-[3px] border-[#111] pb-4">
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            const count =
              cat === "All"
                ? allProjects.length
                : cat === "Patents"
                  ? allPatents.length
                  : cat === "Featured"
                    ? allProjects.filter((p) => p.featured).length
                    : allProjects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={active}
                className={`border-b-[3px] pb-1 font-mono text-xs font-black uppercase tracking-[0.12em] ${
                  active
                    ? "border-[#E8420A] text-[#111]"
                    : "border-transparent text-[#111]/60 hover:text-[#111]"
                }`}
              >
                {cat} <span className="text-[#A14A32]">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#111]/55">
            Stack
          </span>
          {techOptions.map((t) => {
            const active = tech === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTech(active ? null : t)}
                aria-pressed={active}
                className={`border-2 border-[#111] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] ${
                  active
                    ? "bg-[#111] text-[#F0EBE0]"
                    : "bg-transparent text-[#111] hover:bg-[#CFDE00]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#111]/70">
          <span>
            {projects.length} project{projects.length === 1 ? "" : "s"}
            {patents.length > 0
              ? `, ${patents.length} patent${patents.length === 1 ? "" : "s"}`
              : ""}
          </span>
          {filtered ? (
            <button
              type="button"
              onClick={reset}
              className="underline decoration-2 underline-offset-4 hover:text-[#E8420A]"
            >
              Reset
            </button>
          ) : null}
        </div>

        {/* Patents */}
        {patents.length > 0 ? (
          <section className="mt-10" aria-labelledby="patents-heading">
            <h2 id="patents-heading" className={label}>
              Patents
            </h2>
            <div className="mt-4">
              {patents.map((pt) => (
                <article
                  key={pt.slug}
                  className="grid gap-4 border-t-[3px] border-[#111] py-7 md:grid-cols-[190px_1fr] md:gap-10"
                >
                  <div className="font-mono text-[11px] font-bold uppercase leading-6 tracking-[0.12em] text-[#111]/60">
                    <p className="text-[#111]">{pt.application}</p>
                    <p>Filed {pt.filed}</p>
                    <p>Published {pt.published}</p>
                  </div>
                  <div>
                    <h3
                      className="max-w-3xl text-2xl leading-tight sm:text-[28px]"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      <Link
                        href={`/patents/${pt.slug}`}
                        className="hover:text-[#E8420A]"
                      >
                        {pt.title}
                      </Link>
                    </h3>
                    <p className="mt-3 max-w-3xl leading-7 text-[#111]/75">
                      {pt.abstract}
                    </p>
                    <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]/55">
                      {pt.technologies.join(" / ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Projects */}
        {projects.length > 0 ? (
          <section className="mt-12" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className={label}>
              Projects
            </h2>
            {view === "grid" ? (
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => {
                  const metric = p.evidence?.metrics?.[0];
                  return (
                    <article
                      key={p.slug}
                      className="flex flex-col border-[3px] border-[#111] bg-[#FFFDF5] p-6"
                      style={{ boxShadow: "6px 6px 0 0 #111" }}
                    >
                      <p className="flex justify-between font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                        <span>{p.year}</span>
                        <span className="text-[#A14A32]">
                          {p.category ?? "Project"}
                        </span>
                      </p>
                      <h3
                        className="mt-4 text-[26px] uppercase leading-[0.95]"
                        style={{ fontFamily: DISPLAY, letterSpacing: "-0.01em" }}
                      >
                        <Link
                          href={`/projects/${p.slug}`}
                          className="hover:text-[#E8420A]"
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-[15px] leading-6 text-[#111]/75">
                        {p.description}
                      </p>
                      {metric ? (
                        <p className="mt-4 flex items-baseline gap-2 border-t-2 border-dashed border-[#111]/25 pt-3">
                          <span
                            className="text-xl leading-none"
                            style={{
                              fontFamily: DISPLAY,
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {metric.value}
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-[#111]/60">
                            {metric.label}
                          </span>
                        </p>
                      ) : null}
                      <p className="mt-auto pt-5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#111]/55">
                        {p.technologies.join(" / ")}
                      </p>
                      <p className="mt-4 flex items-center justify-between border-t-2 border-[#111] pt-3 font-mono text-xs font-black uppercase tracking-[0.12em]">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="underline decoration-2 underline-offset-4 hover:text-[#E8420A]"
                        >
                          Details
                        </Link>
                        {p.github ? (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#E8420A]"
                          >
                            Source &nearr;
                          </a>
                        ) : (
                          <span className="text-[#111]/45">No public source</span>
                        )}
                      </p>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-5 overflow-x-auto border-[3px] border-[#111] bg-[#FFFDF5]">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#111] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#F0EBE0]">
                      <th className="px-4 py-3">Year</th>
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Stack</th>
                      <th className="px-4 py-3 text-right">Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr
                        key={p.slug}
                        className="border-t-2 border-[#111] align-top hover:bg-[#EEE7DC]"
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-bold">
                          {p.year}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="text-lg uppercase leading-none hover:text-[#E8420A]"
                            style={{ fontFamily: DISPLAY }}
                          >
                            {p.title}
                          </Link>
                          <p className="mt-1 max-w-md text-sm leading-5 text-[#111]/70">
                            {p.description}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#A14A32]">
                          {p.category ?? "Project"}
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#111]/60">
                          {p.technologies.join(" / ")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs font-black uppercase tracking-[0.1em]">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="underline decoration-2 underline-offset-4 hover:text-[#E8420A]"
                          >
                            Details
                          </Link>
                          {p.github ? (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-4 hover:text-[#E8420A]"
                            >
                              Source &nearr;
                            </a>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : null}

        {projects.length === 0 && patents.length === 0 ? (
          <div className="mt-12 border-t-[3px] border-[#111] pt-10">
            <p
              className="text-4xl uppercase leading-none"
              style={{ fontFamily: DISPLAY }}
            >
              Nothing matches.
            </p>
            <p className="mt-4 max-w-md leading-7 text-[#111]/70">
              Try a shorter search, or clear the filters.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-block border-[3px] border-[#111] bg-[#CFDE00] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.14em] hover:bg-[#111] hover:text-[#CFDE00]"
              style={{ boxShadow: "4px 4px 0 0 #111" }}
            >
              Reset filters
            </button>
          </div>
        ) : null}

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-[#111] pt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#111]/70">
          <Link href="/" className="hover:text-[#E8420A]">
            &larr; Home
          </Link>
          <Link href="/research" className="hover:text-[#E8420A]">
            Research &rarr;
          </Link>
        </footer>
      </div>
    </div>
  );
}
