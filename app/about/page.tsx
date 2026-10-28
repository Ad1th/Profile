import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StructuredData from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { experience, profile, quickAnswers } from "@/lib/profile";
import {
  achievements,
  hackathonRecord,
  patents,
  projects,
} from "@/lib/seo-data";
import { publications } from "@/content/research";
import { aboutGraph } from "@/lib/structured-data";

const DISPLAY = "var(--font-anton), 'Arial Black', Impact, sans-serif";

const description =
  "Who Adith Manikonda is: a backend engineer and systems builder studying CSE at VIT Vellore. Experience, projects, patents, research, awards and contact.";

export const metadata: Metadata = pageMetadata({
  title: "About Adith Manikonda: Backend Engineer at VIT Vellore",
  absolute: true,
  description,
  path: "/about",
  markdown: "/about.md",
  type: "profile",
  keywords: [
    "Adith",
    "Adith Manikonda",
    "About Adith Manikonda",
    "Ad1th",
    "Adith VIT Vellore",
    "Adith backend engineer",
  ],
});

/** Section heading in the detail pages' idiom: mono, flame, short rule. */
function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <>
      <h2
        id={id}
        className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[#E8420A]"
      >
        {children}
      </h2>
      <div className="mt-3 h-[3px] w-12 bg-[#111]" />
    </>
  );
}

const cardStyle = { boxShadow: "4px 4px 0 0 #111" };

/**
 * The page answer engines should quote. Everything on the homepage is
 * built for motion; this is the same person as plain, server-rendered text,
 * leading with the one-sentence answer and ending with the questions people
 * actually ask.
 */
export default function AboutPage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <main
      id="main"
      className="min-h-screen bg-[#EEE7DC] px-6 py-28 text-[#111] sm:px-10 lg:px-16"
    >
      <StructuredData data={aboutGraph(description)} />
      <article className="mx-auto max-w-5xl">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "About" }]} />

        <header className="mt-8 grid gap-10 md:grid-cols-[1fr_260px] md:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32]">
              About / {profile.headline} / {profile.education.schoolShort}
            </p>
            <h1
              className="mt-5 text-6xl uppercase leading-[0.9] sm:text-8xl"
              style={{ fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
            >
              {profile.givenName}
              <br />
              <span className="text-[#E8420A]">{profile.familyName}.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-[#111]/80">
              {profile.summary}
            </p>
          </div>
          <figure className="max-w-[260px]">
            <Image
              src={profile.portrait.path}
              alt={profile.portrait.alt}
              width={profile.portrait.width}
              height={profile.portrait.height}
              sizes="260px"
              priority
              className="h-auto w-full border-[3px] border-[#111] grayscale"
              style={{ boxShadow: "8px 8px 0 0 #111" }}
            />
          </figure>
        </header>

        <section className="mt-16 max-w-3xl space-y-5 text-lg leading-8 text-[#111]/80">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </section>

        <section className="mt-16" aria-labelledby="facts">
          <SectionTitle id="facts">Quick facts</SectionTitle>
          <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {[
              ["Name", `${profile.name} (${profile.handle} on GitHub)`],
              ["Studies", `${profile.education.field}, ${profile.education.school}`],
              ["Based at", profile.education.location],
              ["Focus", profile.focus.join(", ")],
              ["Currently", `${experience[0].role}, ${experience[0].org}`],
              ["Open to", profile.openTo],
              ["Speaks", profile.spokenLanguages.join(", ")],
              ["Email", profile.email],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="font-mono text-xs uppercase text-[#111]/50">{term}</dt>
                <dd className="mt-1 text-lg font-bold leading-7">{detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16" aria-labelledby="experience">
          <SectionTitle id="experience">Experience</SectionTitle>
          <ol className="mt-6">
            {experience.map((item) => (
              <li
                key={`${item.role}-${item.org}`}
                className="grid gap-2 border-t-[3px] border-[#111] py-5 md:grid-cols-[200px_1fr] md:gap-8"
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#A14A32]">
                  {item.start}
                  {item.end ? ` to ${item.end}` : " to present"}
                </p>
                <div>
                  <h3 className="text-lg font-bold leading-7">
                    {item.role}, {item.org}
                  </h3>
                  <p className="mt-1 leading-7 text-[#111]/72">{item.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="work">
          <SectionTitle id="work">Selected work</SectionTitle>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {featured.map((project) => {
              const lead = project.evidence?.metrics?.[0];
              return (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block h-full border-[3px] border-[#111] bg-[#FFFDF5] p-6 hover:bg-[#111] hover:text-[#F0EBE0]"
                    style={cardStyle}
                  >
                    <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#A14A32] group-hover:text-[#CFDE00]">
                      {project.year}
                      {project.category ? ` / ${project.category}` : ""}
                    </span>
                    <span
                      className="mt-3 block text-3xl uppercase leading-none"
                      style={{ fontFamily: DISPLAY }}
                    >
                      {project.title}
                    </span>
                    <span className="mt-3 block leading-7 text-[#111]/72 group-hover:text-[#F0EBE0]/75">
                      {project.description}
                    </span>
                    {lead ? (
                      <span className="mt-4 block font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                        {lead.label}: {lead.value}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/projects"
            className="mt-8 inline-block font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32] hover:text-[#E8420A]"
          >
            All {projects.length} projects &rarr;
          </Link>
        </section>

        <section className="mt-16" aria-labelledby="patents">
          <SectionTitle id="patents">Patents</SectionTitle>
          <ul className="mt-6">
            {patents.map((patent) => (
              <li key={patent.slug} className="border-t-[3px] border-[#111] py-5">
                <Link
                  href={`/patents/${patent.slug}`}
                  className="text-lg font-bold leading-7 underline decoration-2 underline-offset-4 hover:text-[#E8420A]"
                >
                  {patent.title}
                </Link>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]/55">
                  Indian patent application {patent.application} / Filed{" "}
                  {patent.filed} / Published {patent.published}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="research">
          <SectionTitle id="research">Research</SectionTitle>
          <ul className="mt-6">
            {publications.map((pub) => (
              <li key={pub.id} className="border-t-[3px] border-[#111] py-5">
                <p className="text-lg font-bold leading-7">{pub.title}</p>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]/55">
                  {pub.status} / {pub.venue}
                  {pub.publisher ? ` / ${pub.publisher}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/research"
            className="mt-6 inline-block font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#A14A32] hover:text-[#E8420A]"
          >
            Research notes &rarr;
          </Link>
        </section>

        <section className="mt-16 grid gap-12 md:grid-cols-2" aria-labelledby="record">
          <div>
            <SectionTitle id="record">Hackathons</SectionTitle>
            <ul className="mt-6 space-y-4">
              {hackathonRecord.map((item) => (
                <li key={`${item.title}-${item.date}`}>
                  <p className="font-bold leading-6">{item.title}</p>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]/55">
                    {item.location} / {item.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-sm font-black uppercase tracking-[0.16em] text-[#E8420A]">
              Awards and certifications
            </h2>
            <div className="mt-3 h-[3px] w-12 bg-[#111]" />
            <ul className="mt-6 space-y-4">
              {achievements.map((item) => (
                <li key={item.title}>
                  <p className="font-bold leading-6">{item.title}</p>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]/55">
                    {item.detail ? `${item.detail} / ` : ""}
                    {item.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="quick-answers">
          <SectionTitle id="quick-answers">Quick answers</SectionTitle>
          <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {quickAnswers.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-lg font-bold leading-7">{q}</h3>
                <p className="mt-2 leading-7 text-[#111]/75">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="contact">
          <SectionTitle id="contact">Contact</SectionTitle>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { href: `mailto:${profile.email}`, label: profile.email },
              { href: profile.links.github, label: "GitHub" },
              { href: profile.links.linkedin, label: "LinkedIn" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "me noreferrer" }
                  : {})}
                className="inline-block border-[3px] border-[#111] bg-[#CFDE00] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.14em] text-[#111] hover:bg-[#111] hover:text-[#CFDE00]"
                style={cardStyle}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
