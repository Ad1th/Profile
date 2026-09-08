import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import { hackathons, siteUrl } from "@/lib/seo-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return hackathons.map((hackathon) => ({ slug: hackathon.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hackathon = hackathons.find((item) => item.slug === slug);

  if (!hackathon) return {};

  const title = hackathon.title;
  const description = `${hackathon.summary} ${hackathon.date}, ${hackathon.location}.`;

  return {
    title,
    description,
    keywords: [
      "Adith Manikonda",
      "Adith VIT",
      "Adith Vellore",
      "Hackathon Finalist",
      hackathon.title,
      hackathon.location,
    ],
    alternates: {
      canonical: `/hackathons/${hackathon.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/hackathons/${hackathon.slug}`,
      title,
      description,
      siteName: "Adith Manikonda",
      images: [
        {
          url: "/images/me.webp",
          width: 1200,
          height: 630,
          alt: "Adith Manikonda hackathon achievement",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/me.webp"],
    },
  };
}

export default async function HackathonPage({ params }: PageProps) {
  const { slug } = await params;
  const hackathon = hackathons.find((item) => item.slug === slug);

  if (!hackathon) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: hackathon.title,
    url: `${siteUrl}/hackathons/${hackathon.slug}`,
    description: hackathon.summary,
    location: hackathon.location,
    performer: {
      "@type": "Person",
      name: "Adith Manikonda",
      url: siteUrl,
    },
  };

  return (
    <main
      id="main"
      className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16"
    >
      <StructuredData data={schema} />
      <article className="mx-auto max-w-4xl">
        <a
          href="/#hackathons"
          className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32] hover:text-[#E8420A]"
        >
          &larr; Hackathons
        </a>
        <p className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
          Hackathon / {hackathon.location}
        </p>
        <h1
          className="mt-5 max-w-4xl text-5xl uppercase leading-none sm:text-7xl"
          style={{
            fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {hackathon.title}
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-[#111]/75">
          {hackathon.summary}
        </p>
        <dl className="mt-12 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs uppercase text-[#111]/50">Date</dt>
            <dd className="mt-1 text-lg font-bold">{hackathon.date}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase text-[#111]/50">
              Location
            </dt>
            <dd className="mt-1 text-lg font-bold">{hackathon.location}</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
