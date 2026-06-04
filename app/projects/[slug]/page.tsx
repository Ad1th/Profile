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
  const image = project.screenshots[0] ?? "/images/me.png";

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

  return (
    <main className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16">
      <StructuredData data={schema} />
      <article className="mx-auto max-w-5xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
          Adith Manikonda Project / {project.year}
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none sm:text-7xl">
          {project.seoTitle ?? project.title}
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-[#111]/75">
          {project.description}
        </p>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
              Purpose
            </h2>
            <p className="mt-4 leading-7 text-[#111]/72">{project.purpose}</p>
          </div>
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em]">
              Technologies
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="border border-[#111]/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.12em]"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
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
