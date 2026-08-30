import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import { projects, siteUrl } from "@/lib/seo-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  const title = `${project.seoTitle ?? project.title} | Project by Adith Manikonda`;
  const description = `${project.description} Built by Adith Manikonda using ${project.technologies.join(", ")}.`;
  const image = project.screenshots[0] ?? "/images/me.webp";

  return {
    title,
    description,
    keywords: [
      "Adith Manikonda",
      "Adith portfolio",
      project.title,
      ...(project.seoTitle ? [project.seoTitle] : []),
      ...project.technologies,
    ],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/projects/${project.slug}`,
      title,
      description,
      siteName: "Adith Manikonda",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${project.title} project by Adith Manikonda`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    url: `${siteUrl}/projects/${project.slug}`,
    description: project.description,
    programmingLanguage: project.technologies,
    dateCreated: project.year,
    creator: {
      "@type": "Person",
      name: "Adith Manikonda",
      url: siteUrl,
    },
  };

  const ev = project.evidence;

  return (
    <main
      id="main"
      className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16"
    >
      <StructuredData data={schema} />
      <article className="mx-auto max-w-5xl">
        <a
          href="/projects"
          className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32] hover:text-[#E8420A]"
        >
          &larr; All Projects
        </a>

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

        <section className="mt-14">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
            Screenshots
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {project.screenshots.map((screenshot, index) => (
              <div
                key={screenshot}
                className="relative aspect-[16/10] overflow-hidden border border-[#111]/15 bg-white/40"
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
      </article>
    </main>
  );
}
