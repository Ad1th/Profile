import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import StructuredData from "@/components/seo/StructuredData";
import {
  hackathons,
  patents,
  projects,
  siteDescription,
  siteKeywords,
  siteTitle,
  siteUrl,
} from "@/lib/seo-data";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Adith Manikonda Portfolio",
  url: siteUrl,
  creator: {
    "@type": "Person",
    name: "Adith Manikonda",
  },
  about: [
    "Backend engineering",
    "Systems engineering",
    "FastAPI",
    "Node.js",
    "VIT Vellore",
    "Research development",
    "Databases",
  ],
};

const projectSchemas = projects.map((project) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: project.title,
  url: `${siteUrl}/projects/${project.slug}`,
  description: project.description,
  programmingLanguage: project.technologies,
  creator: {
    "@type": "Person",
    name: "Adith Manikonda",
  },
}));

export default function Page() {
  return (
    <main id="main" data-page="home">
      <StructuredData data={[portfolioSchema, ...projectSchemas]} />
      <HomePageClient />
      <section className="sr-only" aria-label="Searchable portfolio summary">
        <h2>Adith Manikonda Portfolio</h2>
        <p>
          Adith Manikonda is a backend-focused engineer from VIT Vellore,
          systems builder, research developer, patent developer and open-source
          contributor working with Node.js, FastAPI, PostgreSQL, Prisma and
          database infrastructure.
        </p>
        <h2>Projects by Adith Manikonda</h2>
        {projects.map((project) => (
          <article key={project.slug}>
            <h3>{project.seoTitle ?? project.title}</h3>
            <p>{project.description}</p>
            <p>Technologies used: {project.technologies.join(", ")}.</p>
            <p>Year: {project.year}.</p>
            <p>Purpose: {project.purpose}</p>
          </article>
        ))}
        <h2>Patents by Adith Manikonda</h2>
        {patents.map((patent) => (
          <article key={patent.slug}>
            <h3>{patent.title}</h3>
            <p>{patent.abstract}</p>
            <p>{patent.summary}</p>
            <p>Technologies: {patent.technologies.join(", ")}.</p>
            <p>
              Application {patent.application}; filed {patent.filed}; published{" "}
              {patent.published}.
            </p>
          </article>
        ))}
        <h2>Hackathons and Achievements</h2>
        {hackathons.map((hackathon) => (
          <article key={hackathon.slug}>
            <h3>{hackathon.title}</h3>
            <p>
              {hackathon.summary} Event date: {hackathon.date}. Location:
              {hackathon.location}.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
