"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  activeResearchProjects,
  patents,
  publications,
  readingList,
  researchAreas,
  researchTimeline,
} from "@/content/research";

const DISPLAY =
  "var(--font-anton), Anton, 'Arial Black', Impact, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

const label =
  "font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#A14A32]";

/** Research patents keyed to their pages under /patents. */
const PATENT_PAGE: Record<string, string> = {
  "wave-energy-mppt": "wave-energy-generator",
  "visual-assistance-perception": "visual-assistance-system",
};

/** Placeholder co-author entries read as "et al." rather than as names. */
const GENERIC_AUTHORS = new Set([
  "Research Collaborators",
  "Research Team",
  "Co-Authors",
  "Systems Group",
]);

function authorLine(authors: string[]) {
  const named = authors.filter((a) => !GENERIC_AUTHORS.has(a));
  const trimmed = named.length !== authors.length;
  return `${named.join(", ")}${trimmed ? " et al." : ""}`;
}

const isRealLink = (url?: string) => Boolean(url && url !== "#");

const READING_TOPICS = [
  "All",
  "Databases",
  "Distributed Systems",
  "LLMs & AI",
  "Security",
  "Operating Systems",
] as const;

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="text-4xl uppercase leading-none sm:text-5xl"
      style={{ fontFamily: DISPLAY, letterSpacing: "-0.01em" }}
    >
      {children}
    </h2>
  );
}

export default function ResearchLabClient() {
  const [openProject, setOpenProject] = useState<string | null>(
    activeResearchProjects[0]?.id ?? null,
  );
  const [openAbstract, setOpenAbstract] = useState<string | null>(null);
  const [topic, setTopic] =
    useState<(typeof READING_TOPICS)[number]>("All");

  const reading =
    topic === "All" ? readingList : readingList.filter((r) => r.topic === topic);

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
        <p className={`mt-8 ${label}`}>Adith Manikonda / Research</p>
        <h1
          className="mt-4 text-6xl uppercase leading-[0.9] sm:text-8xl"
          style={{ fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
        >
          Research
          <br />
          <span className="text-[#E8420A]">notes.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#111]/75 sm:text-xl">
          Database systems, trustworthy AI, distributed systems, security and
          machine learning. What is being worked on, what has been published,
          and what is being read.
        </p>

        <dl className="mt-10 grid grid-cols-2 border-y-[3px] border-[#111] sm:grid-cols-4">
          {[
            [researchAreas.length, "Areas"],
            [activeResearchProjects.length, "Active projects"],
            [publications.length, "Papers"],
            [patents.length, "Patents"],
          ].map(([n, text], i) => (
            <div
              key={text}
              className={`py-5 pr-4 ${
                i % 2 === 1 ? "border-l-[3px] border-[#111] pl-4 sm:pl-6" : ""
              } ${i === 2 ? "sm:border-l-[3px] sm:border-[#111] sm:pl-6" : ""} ${
                i >= 2 ? "border-t-[3px] border-[#111] sm:border-t-0" : ""
              }`}
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

        <nav
          aria-label="On this page"
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]/60"
        >
          {[
            ["areas", "Areas"],
            ["active", "Active"],
            ["papers", "Papers"],
            ["patents", "Patents"],
            ["timeline", "Timeline"],
            ["reading", "Reading"],
          ].map(([id, text]) => (
            <a key={id} href={`#${id}`} className="hover:text-[#E8420A]">
              {text}
            </a>
          ))}
        </nav>

        {/* Areas */}
        <section className="mt-20" aria-labelledby="areas">
          <SectionHeading id="areas">Areas</SectionHeading>
          <div className="mt-6">
            {researchAreas.map((area, i) => (
              <article
                key={area.id}
                className="grid gap-3 border-t-[3px] border-[#111] py-6 md:grid-cols-[72px_260px_1fr] md:gap-8"
              >
                <p className="font-mono text-xs font-bold text-[#A14A32]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="text-lg uppercase leading-tight"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {area.title}
                </h3>
                <div>
                  <p className="max-w-2xl leading-7 text-[#111]/75">
                    {area.description}
                  </p>
                  <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]/55">
                    Now: {area.currentFocus.join(" / ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Active research */}
        <section className="mt-20" aria-labelledby="active">
          <SectionHeading id="active">Active</SectionHeading>
          <div className="mt-6">
            {activeResearchProjects.map((project) => {
              const open = openProject === project.id;
              const links = (project.links ?? []).filter((l) =>
                isRealLink(l.url),
              );
              return (
                <article
                  key={project.id}
                  className="border-t-[3px] border-[#111]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenProject(open ? null : project.id)}
                    aria-expanded={open}
                    className="grid w-full gap-3 py-6 text-left md:grid-cols-[190px_1fr_auto] md:items-start md:gap-8"
                  >
                    <p className="font-mono text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-[#A14A32]">
                      {project.status}
                      <span className="mt-1 block text-[#111]/55">
                        {project.currentStage}
                      </span>
                    </p>
                    <div>
                      <h3
                        className="text-2xl uppercase leading-none sm:text-3xl"
                        style={{ fontFamily: DISPLAY, letterSpacing: "-0.01em" }}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-7 text-[#111]/75">
                        {project.shortDescription}
                      </p>
                      <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]/55">
                        {project.tags.join(" / ")}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-black uppercase tracking-[0.14em] underline decoration-2 underline-offset-4">
                      {open ? "Close" : "Open"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <dl className="grid gap-x-10 gap-y-6 border-t-2 border-dashed border-[#111]/30 py-7 md:grid-cols-2">
                          {[
                            ["The problem", project.problem],
                            ["Why it matters", project.motivation],
                            ["The approach", project.approach],
                            ["Where it stands", project.currentProgress],
                            ["Next", project.futureWork],
                          ].map(([heading, body]) => (
                            <div key={heading}>
                              <dt className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-[#E8420A]">
                                {heading}
                              </dt>
                              <dd className="mt-2 leading-7 text-[#111]/80">
                                {body}
                              </dd>
                            </div>
                          ))}
                          {links.length > 0 ? (
                            <div>
                              <dt className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-[#E8420A]">
                                Links
                              </dt>
                              <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs font-black uppercase tracking-[0.12em]">
                                {links.map((l) => (
                                  <a
                                    key={l.label}
                                    href={l.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline decoration-2 underline-offset-4 hover:text-[#E8420A]"
                                  >
                                    {l.label} &nearr;
                                  </a>
                                ))}
                              </dd>
                            </div>
                          ) : null}
                        </dl>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </section>

        {/* Publications */}
        <section className="mt-20" aria-labelledby="papers">
          <SectionHeading id="papers">Papers</SectionHeading>
          <div className="mt-6">
            {publications.map((pub) => {
              const open = openAbstract === pub.id;
              return (
                <article
                  key={pub.id}
                  className="grid gap-3 border-t-[3px] border-[#111] py-7 md:grid-cols-[190px_1fr] md:gap-8"
                >
                  <p className="font-mono text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-[#A14A32]">
                    {pub.status}
                    <span className="mt-1 block text-[#111]/55">{pub.date}</span>
                  </p>
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]/55">
                      {pub.venue}
                      {pub.publisher ? ` / ${pub.publisher}` : ""}
                    </p>
                    <h3
                      className="mt-2 max-w-3xl text-2xl leading-tight sm:text-[28px]"
                      style={{ fontFamily: SERIF }}
                    >
                      {pub.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#111]/70">
                      {authorLine(pub.authors)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs font-black uppercase tracking-[0.12em]">
                      <button
                        type="button"
                        onClick={() => setOpenAbstract(open ? null : pub.id)}
                        aria-expanded={open}
                        className="underline decoration-2 underline-offset-4 hover:text-[#E8420A]"
                      >
                        {open ? "Hide abstract" : "Abstract"}
                      </button>
                      {isRealLink(pub.links?.paper) ? (
                        <a
                          href={pub.links!.paper}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#E8420A]"
                        >
                          Paper &nearr;
                        </a>
                      ) : null}
                      {isRealLink(pub.links?.code) ? (
                        <a
                          href={pub.links!.code}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#E8420A]"
                        >
                          Code &nearr;
                        </a>
                      ) : null}
                    </div>
                    {open ? (
                      <p className="mt-4 max-w-3xl border-l-[3px] border-[#E8420A] pl-4 leading-7 text-[#111]/80">
                        {pub.abstract}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Patents */}
        <section className="mt-20" aria-labelledby="patents">
          <SectionHeading id="patents">Patents</SectionHeading>
          <div className="mt-6">
            {patents.map((pt) => {
              const page = PATENT_PAGE[pt.id];
              return (
                <article
                  key={pt.id}
                  className="grid gap-3 border-t-[3px] border-[#111] py-7 md:grid-cols-[190px_1fr] md:gap-8"
                >
                  <div className="font-mono text-[11px] font-bold uppercase leading-6 tracking-[0.12em] text-[#111]/60">
                    <p className="text-[#111]">{pt.applicationNumber}</p>
                    <p>Filed {pt.filedDate}</p>
                    <p>Published {pt.publishedDate}</p>
                    <p className="text-[#A14A32]">{pt.status}</p>
                  </div>
                  <div>
                    <h3
                      className="max-w-3xl text-2xl leading-tight sm:text-[28px]"
                      style={{ fontFamily: SERIF }}
                    >
                      {page ? (
                        <Link
                          href={`/patents/${page}`}
                          className="hover:text-[#E8420A]"
                        >
                          {pt.title}
                        </Link>
                      ) : (
                        pt.title
                      )}
                    </h3>
                    <p className="mt-3 max-w-3xl leading-7 text-[#111]/75">
                      {pt.abstract}
                    </p>
                    <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]/55">
                      {pt.technologies.join(" / ")}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-20" aria-labelledby="timeline">
          <SectionHeading id="timeline">Timeline</SectionHeading>
          <ol className="mt-6">
            {researchTimeline.map((item) => (
              <li
                key={item.id}
                className="grid gap-2 border-t-[3px] border-[#111] py-6 md:grid-cols-[190px_1fr] md:gap-8"
              >
                <p
                  className="text-2xl leading-none"
                  style={{ fontFamily: DISPLAY }}
                >
                  {item.year}
                </p>
                <div>
                  <h3
                    className="text-lg uppercase leading-tight"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#A14A32]">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 max-w-2xl leading-7 text-[#111]/75">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Working principle */}
        <section
          className="mt-20 border-[3px] border-[#111] bg-[#111] p-8 text-[#E8DDD0] sm:p-12"
          style={{ boxShadow: "8px 8px 0 0 #A14A32" }}
          aria-label="How the research is done"
        >
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-[#CFDE00]">
            How the work is done
          </p>
          <blockquote
            className="mt-5 max-w-4xl text-2xl leading-snug sm:text-3xl"
            style={{ fontFamily: SERIF }}
          >
            Systems that are measurable, reproducible and explainable. Practical
            problems, rigorous experiments, and infrastructure that holds up
            when it is scaled.
          </blockquote>
        </section>

        {/* Reading list */}
        <section className="mt-20" aria-labelledby="reading">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="reading">Reading</SectionHeading>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {READING_TOPICS.map((t) => {
                const active = topic === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={active}
                    className={`border-b-[3px] pb-1 font-mono text-xs font-black uppercase tracking-[0.12em] ${
                      active
                        ? "border-[#E8420A] text-[#111]"
                        : "border-transparent text-[#111]/60 hover:text-[#111]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-6 overflow-x-auto border-[3px] border-[#111] bg-[#FFFDF5]">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-[#111] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#F0EBE0]">
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Paper</th>
                  <th className="px-4 py-3">Topic</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Takeaway</th>
                </tr>
              </thead>
              <tbody>
                {reading.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t-2 border-[#111] align-top hover:bg-[#EEE7DC]"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-bold">
                      {r.year}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold leading-snug">{r.title}</p>
                      <p className="mt-1 text-sm text-[#111]/65">{r.authors}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#A14A32]">
                      {r.topic}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#111]/60">
                      {r.status}
                    </td>
                    <td className="max-w-sm px-4 py-3 text-sm leading-5 text-[#111]/80">
                      {r.takeaway}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-[#111] pt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#111]/70">
          <Link href="/" className="hover:text-[#E8420A]">
            &larr; Home
          </Link>
          <span className="flex gap-6">
            <Link href="/projects" className="hover:text-[#E8420A]">
              Projects
            </Link>
            <Link href="/#contact" className="hover:text-[#E8420A]">
              Contact &rarr;
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
