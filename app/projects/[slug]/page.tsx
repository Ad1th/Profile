import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { projects, type Project } from "@/lib/seo-data";
import { projectGraph } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * The project's own line, then who built it with as much of the stack as
 * fits a search snippet. The full stack list ran past 160 characters on most
 * projects, so the name was the part results pages cut off.
 */
function describe(project: Project) {
  const lead = `${project.description} Built by Adith Manikonda`;
  for (let n = project.technologies.length; n > 0; n--) {
    const text = `${lead} with ${project.technologies.slice(0, n).join(", ")}.`;
    if (text.length <= 160) return text;
  }
  return `${lead}.`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  const title = project.seoTitle ?? project.title;

  // The card image comes from ./opengraph-image.tsx. It used to be the first
  // screenshot, which for most projects was the SVG placeholder: no social
  // network renders an SVG og:image.
  return pageMetadata({
    title,
    description: describe(project),
    path: `/projects/${project.slug}`,
    markdown: `/projects/${project.slug}.md`,
    type: "article",
    keywords: [
      "Adith Manikonda",
      "Adith portfolio",
      project.title,
      ...(project.seoTitle ? [project.seoTitle] : []),
      ...project.technologies,
    ],
  });
}

/** Up to three more builds from the same shelf, then whatever is newest. */
function relatedProjects(slug: string, category?: string) {
  const others = projects.filter((p) => p.slug !== slug);
  const sameShelf = others.filter((p) => p.category === category);
  const rest = others.filter((p) => p.category !== category);
  return [...sameShelf, ...rest].slice(0, 3);
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const ev = project.evidence;
  const related = relatedProjects(project.slug, project.category);

  return (
    <main
      id="main"
      className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16"
    >
      <StructuredData data={projectGraph(project)} />
      <article className="mx-auto max-w-5xl">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: project.title },
          ]}
        />

        <p className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
          Adith Manikonda Project / {project.year}
          {project.category ? ` / ${project.category}` : ""}
        </p>
        <h1
          className="mt-5 max-w-4xl text-5xl uppercase leading-none sm:text-7xl"
          style={{
            fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {project.seoTitle ?? project.title}
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-[#111]/75">
          {project.description}
        </p>

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block border-[3px] border-[#111] bg-[#CFDE00] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.14em] text-[#111] hover:bg-[#111] hover:text-[#CFDE00]"
            style={{ boxShadow: "4px 4px 0 0 #111" }}
          >
            Source &nbsp;&#8599;
          </a>
        ) : null}

        {/* ── Evidence: the part a tech-tag list cannot carry ───────────── */}
        {ev ? (
          <section className="mt-16 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[#E8420A]">
                The Problem
              </h2>
              <div className="mt-3 h-[3px] w-12 bg-[#111]" />
              <p className="mt-5 leading-7 text-[#111]/80">{ev.problem}</p>
            </div>
            <div>
              <h2 className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[#E8420A]">
                The Approach
              </h2>
              <div className="mt-3 h-[3px] w-12 bg-[#111]" />
              <p className="mt-5 leading-7 text-[#111]/80">{ev.approach}</p>
            </div>
          </section>
        ) : (
          <section className="mt-14">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
              Purpose
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#111]/72">
              {project.purpose}
            </p>
          </section>
        )}

        {ev?.metrics?.length ? (
          <section className="mt-16">
            <h2 className="font-mono text-sm font-black uppercase tracking-[0.16em]">
              Measured
            </h2>
            <div className="mt-5 grid gap-0 border-[3px] border-[#111] sm:grid-cols-3">
              {ev.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`bg-[#FFFDF5] p-6 ${
                    i < ev.metrics!.length - 1
                      ? "border-b-[3px] border-[#111] sm:border-b-0 sm:border-r-[3px]"
                      : ""
                  }`}
                >
                  <p
                    className="text-3xl leading-none sm:text-4xl"
                    style={{
                      fontFamily:
                        "var(--font-anton), 'Arial Black', Impact, sans-serif",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {m.value}
                  </p>
                  <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#111]">
                    {m.label}
                  </p>
                  {m.note ? (
                    <p className="mt-2 font-mono text-[11px] leading-5 text-[#111]/55">
                      {m.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {ev?.limits ? (
          <section className="mt-16">
            <div
              className="border-[3px] border-[#111] bg-[#111] p-7 sm:p-9"
              style={{ boxShadow: "8px 8px 0 0 #A14A32" }}
            >
              <h2 className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[#CFDE00]">
                What It Does Not Do
              </h2>
              <p className="mt-5 max-w-3xl leading-7 text-[#E8DDD0]">
                {ev.limits}
              </p>
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <h2 className="font-mono text-sm font-black uppercase tracking-[0.16em]">
            Built With
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="border-2 border-[#111] bg-[#FFFDF5] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em]"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        {project.screenshots.filter((x) => !x.endsWith("_placeholder.svg"))
          .length ? (
          <section className="mt-16">
            <h2 className="font-mono text-sm font-black uppercase tracking-[0.16em]">
              Screenshots
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {project.screenshots
                .filter((x) => !x.endsWith("_placeholder.svg"))
                .map((screenshot, index) => (
                  <div
                    key={screenshot}
                    className="relative aspect-[16/10] overflow-hidden border-[3px] border-[#111] bg-white/40"
                    style={{ boxShadow: "6px 6px 0 0 #111" }}
                  >
                    <Image
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1} by Adith Manikonda`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16" aria-labelledby="more-builds">
          <h2
            id="more-builds"
            className="font-mono text-sm font-black uppercase tracking-[0.16em]"
          >
            More from Adith Manikonda
          </h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/projects/${other.slug}`}
                  className="group block h-full border-[3px] border-[#111] bg-[#FFFDF5] p-5 hover:bg-[#111] hover:text-[#F0EBE0]"
                  style={{ boxShadow: "4px 4px 0 0 #111" }}
                >
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#A14A32] group-hover:text-[#CFDE00]">
                    {other.year}
                    {other.category ? ` / ${other.category}` : ""}
                  </span>
                  <span
                    className="mt-3 block text-2xl uppercase leading-none"
                    style={{
                      fontFamily:
                        "var(--font-anton), 'Arial Black', Impact, sans-serif",
                    }}
                  >
                    {other.title}
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-[#111]/70 group-hover:text-[#F0EBE0]/75">
                    {other.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/projects"
            className="mt-8 inline-block font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32] hover:text-[#E8420A]"
          >
            Every project &rarr;
          </Link>
        </section>
      </article>
    </main>
  );
}
