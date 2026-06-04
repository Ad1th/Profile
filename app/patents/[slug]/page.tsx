import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import { patents, siteUrl } from "@/lib/seo-data";

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

  const title = `${patent.title} | Patent by Adith Manikonda`;
  const description = `${patent.abstract} Patent application ${patent.application}, published ${patent.published}.`;

  return {
    title,
    description,
    keywords: [
      "Adith Manikonda",
      "Adith patent",
      "Patent Developer",
      patent.title,
      patent.application,
      ...patent.technologies,
    ],
    alternates: {
      canonical: `/patents/${patent.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/patents/${patent.slug}`,
      title,
      description,
      siteName: "Adith Manikonda",
      images: [
        {
          url: "/images/me.png",
          width: 1200,
          height: 630,
          alt: "Adith Manikonda patent developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/me.png"],
    },
  };
}

export default async function PatentPage({ params }: PageProps) {
  const { slug } = await params;
  const patent = patents.find((item) => item.slug === slug);

  if (!patent) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: patent.title,
    url: `${siteUrl}/patents/${patent.slug}`,
    abstract: patent.abstract,
    description: patent.summary,
    identifier: patent.application,
    datePublished: patent.published,
    creator: {
      "@type": "Person",
      name: "Adith Manikonda",
      url: siteUrl,
    },
  };

  return (
    <main className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16">
      <StructuredData data={schema} />
      <article className="mx-auto max-w-4xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
          Patent / Adith Manikonda / {patent.application}
        </p>
        <h1 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
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
