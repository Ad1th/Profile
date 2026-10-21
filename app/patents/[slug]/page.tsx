import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { patents } from "@/lib/seo-data";
import { patentGraph } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return patents.map((patent) => ({ slug: patent.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const patent = patents.find((item) => item.slug === slug);

  if (!patent) return {};

  return pageMetadata({
    title: patent.title,
    // Who and which application first: the abstract is the part a results
    // page can afford to cut.
    description: `Indian patent application ${patent.application} naming Adith Manikonda: ${patent.abstract.charAt(0).toLowerCase()}${patent.abstract.slice(1)}`,
    path: `/patents/${patent.slug}`,
    markdown: `/patents/${patent.slug}.md`,
    type: "article",
    keywords: [
      "Adith Manikonda",
      "Adith patent",
      "Patent Developer",
      patent.title,
      patent.application,
      ...patent.technologies,
    ],
  });
}

export default async function PatentPage({ params }: PageProps) {
  const { slug } = await params;
  const patent = patents.find((item) => item.slug === slug);

  if (!patent) notFound();

  return (
    <main
      id="main"
      className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16"
    >
      <StructuredData data={patentGraph(patent)} />
      <article className="mx-auto max-w-4xl">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Research", href: "/research" },
            { name: `Patent ${patent.application}` },
          ]}
        />
        <p className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
          Patent / {patent.application}
        </p>
        <h1
          className="mt-5 max-w-4xl text-4xl uppercase leading-none sm:text-6xl"
          style={{
            fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {patent.title}
        </h1>

        <section className="mt-10">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
            Abstract
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#111]/75">
            {patent.abstract}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
            Summary
          </h2>
          <p className="mt-4 leading-7 text-[#111]/72">{patent.summary}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
            Technologies
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {patent.technologies.map((technology) => (
              <li
                key={technology}
                className="border border-[#111]/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.12em]"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
            Publication Information
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs uppercase text-[#111]/50">
                Application
              </dt>
              <dd className="mt-1 font-bold">{patent.application}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-[#111]/50">
                Filed
              </dt>
              <dd className="mt-1 font-bold">{patent.filed}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-[#111]/50">
                Published
              </dt>
              <dd className="mt-1 font-bold">{patent.published}</dd>
            </div>
          </dl>
        </section>
      </article>
    </main>
  );
}
