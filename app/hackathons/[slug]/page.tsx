import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { hackathons } from "@/lib/seo-data";
import { hackathonGraph } from "@/lib/structured-data";

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

  return pageMetadata({
    title: hackathon.title,
    description: `Adith Manikonda at ${hackathon.title}: ${hackathon.summary} ${hackathon.date}, ${hackathon.location}.`,
    path: `/hackathons/${hackathon.slug}`,
    markdown: `/hackathons/${hackathon.slug}.md`,
    type: "article",
    keywords: [
      "Adith Manikonda",
      "Adith VIT",
      "Adith Vellore",
      "Hackathon Finalist",
      hackathon.title,
      hackathon.location,
    ],
  });
}

export default async function HackathonPage({ params }: PageProps) {
  const { slug } = await params;
  const hackathon = hackathons.find((item) => item.slug === slug);

  if (!hackathon) notFound();

  return (
    <main
      id="main"
      className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16"
    >
      <StructuredData data={hackathonGraph(hackathon)} />
      <article className="mx-auto max-w-4xl">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Hackathons", href: "/#hackathons" },
            { name: hackathon.title },
          ]}
        />
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
        <p className="mt-12 max-w-3xl leading-7 text-[#111]/72">
          One entry in the hackathon record of Adith Manikonda, a backend
          engineer studying Computer Science and Engineering at VIT Vellore.
          The builds behind it are in the{" "}
          <Link href="/projects" className="underline decoration-2 underline-offset-4 hover:text-[#E8420A]">
            project archive
          </Link>
          , and the full record is on the{" "}
          <Link href="/about" className="underline decoration-2 underline-offset-4 hover:text-[#E8420A]">
            about page
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
