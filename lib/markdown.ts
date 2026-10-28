import {
  activeResearchProjects,
  publications,
  readingList,
  researchAreas,
  researchTimeline,
} from "@/content/research";
import { experience, profile, quickAnswers } from "@/lib/profile";
import {
  type Hackathon,
  type Patent,
  type Project,
  achievements,
  hackathonRecord,
  hackathons,
  patents,
  projects,
  siteUpdated,
  siteUrl,
} from "@/lib/seo-data";

/**
 * Markdown twins of every page, plus llms.txt and llms-full.txt.
 *
 * The HTML is built for people: animation, layered panels, text set as
 * decoration. An agent asked "who is Adith?" does better with the same facts
 * as plain markdown, so every page has one at its own URL with ".md"
 * appended (the homepage is /index.md), following the llms.txt proposal
 * (https://llmstxt.org). Everything here is generated from the same data
 * the pages render, so the two cannot disagree.
 */

const page = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);
const mdUrl = (path: string) => `${siteUrl}${path === "/" ? "/index" : path}.md`;

/** Placeholder co-author entries read as "et al." rather than as names. */
const GENERIC_AUTHORS = new Set([
  "Research Collaborators",
  "Research Team",
  "Co-Authors",
  "Systems Group",
]);

function authorLine(authors: string[]) {
  const named = authors.filter((a) => !GENERIC_AUTHORS.has(a));
  return `${named.join(", ")}${named.length !== authors.length ? " et al." : ""}`;
}

const isRealLink = (url?: string) => Boolean(url && url !== "#");

type Publication = (typeof publications)[number];

/** Only a published paper is stated as appearing somewhere. */
function publicationLine(pub: Publication) {
  const where = `${pub.venue}${pub.publisher ? ` (${pub.publisher})` : ""}`;
  if (pub.status === "Published") return `${pub.title}. Published in ${where}, ${pub.date}.`;
  if (pub.status === "Under Review") return `${pub.title}. Under review at ${where}, ${pub.date}.`;
  return `${pub.title}. In progress, ${pub.date}.`;
}

type Block = string | false | undefined | null | 0;

const join = (...blocks: Block[]) =>
  blocks
    .filter((b): b is string => Boolean(b))
    .map((b) => b.trim())
    .join("\n\n");

/** A whole document: blocks separated by blank lines, ending in a newline. */
const doc = (...blocks: Block[]) => `${join(...blocks)}\n`;

const bullets = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

/** The header every page carries: what it is, whose it is, where it lives. */
function header(title: string, summary: string, path: string) {
  return join(
    `# ${title}`,
    `> ${summary}`,
    [
      `Page: ${page(path)}`,
      `Author: [${profile.name}](${mdUrl("/about")}) (${siteUrl})`,
      `Last updated: ${siteUpdated}`,
    ].join("\n"),
  );
}

const projectTitle = (project: Project) => project.seoTitle ?? project.title;

const projectLink = (project: Project) =>
  `[${projectTitle(project)}](${mdUrl(`/projects/${project.slug}`)})`;

const patentLink = (patent: Patent) =>
  `[${patent.title}](${mdUrl(`/patents/${patent.slug}`)})`;

function contactBlock() {
  return join(
    "## Contact",
    bullets([
      `Email: ${profile.email}`,
      `GitHub: ${profile.links.github}`,
      `LinkedIn: ${profile.links.linkedin}`,
      `Website: ${siteUrl}`,
    ]),
  );
}

function experienceBlock() {
  return join(
    "## Experience",
    bullets(
      experience.map(
        (item) =>
          `**${item.role}, ${item.org}** (${item.start}${item.end ? ` to ${item.end}` : " to present"}): ${item.summary}`,
      ),
    ),
  );
}

function awardsBlock() {
  return join(
    "## Hackathons and awards",
    "### Hackathons",
    bullets(hackathonRecord.map((h) => `${h.title}, ${h.location} (${h.date})`)),
    "### Awards and certifications",
    bullets(
      achievements.map(
        (a) => `${a.title}${a.detail ? `, ${a.detail}` : ""} (${a.year})`,
      ),
    ),
  );
}

function patentsBlock() {
  return join(
    "## Patents",
    bullets(
      patents.map(
        (p) =>
          `${patentLink(p)}: Indian patent application ${p.application}, filed ${p.filed}, published ${p.published}.`,
      ),
    ),
  );
}

export function homeMarkdown() {
  const featured = projects.filter((p) => p.featured);
  return doc(
    header(
      `${profile.name}: backend with taste`,
      `${profile.summary} This is the homepage of adith.xyz, Adith's official website.`,
      "/",
    ),
    "Pressure tested builds with clean internals. Open to internships.",
    join(
      "## About",
      profile.bio[0],
      `More: [About ${profile.name}](${mdUrl("/about")})`,
    ),
    join(
      "## Skills",
      bullets(
        Object.entries(profile.skills).map(
          ([area, items]) => `${area}: ${items.join(", ")}`,
        ),
      ),
      `Spoken languages: ${profile.spokenLanguages.join(", ")}.`,
    ),
    experienceBlock(),
    join(
      "## Featured projects",
      bullets(featured.map((p) => `${projectLink(p)} (${p.year}): ${p.description}`)),
      `All ${projects.length} projects: [Project archive](${mdUrl("/projects")})`,
    ),
    patentsBlock(),
    awardsBlock(),
    contactBlock(),
  );
}

export function aboutMarkdown() {
  return doc(
    header(`About ${profile.name}`, profile.summary, "/about"),
    profile.bio.join("\n\n"),
    join(
      "## Quick facts",
      bullets([
        `Name: ${profile.name} (also "${profile.alternateNames.join('", "')}")`,
        `Role: ${profile.headline}`,
        `Education: ${profile.education.field}, ${profile.education.school}, ${profile.education.location}`,
        `Focus: ${profile.focus.join(", ")}`,
        `Open to: ${profile.openTo}`,
        `Spoken languages: ${profile.spokenLanguages.join(", ")}`,
        `GitHub: ${profile.links.github}`,
      ]),
    ),
    experienceBlock(),
    join(
      "## Skills",
      bullets(
        Object.entries(profile.skills).map(
          ([area, items]) => `${area}: ${items.join(", ")}`,
        ),
      ),
    ),
    join(
      "## Selected work",
      bullets(
        projects
          .filter((p) => p.featured)
          .map((p) => `${projectLink(p)} (${p.year}): ${p.description}`),
      ),
      `Every project: [Project archive](${mdUrl("/projects")})`,
    ),
    patentsBlock(),
    join(
      "## Research",
      bullets(publications.map(publicationLine)),
      `More: [Research](${mdUrl("/research")})`,
    ),
    awardsBlock(),
    join(
      "## Quick answers",
      quickAnswers.map(({ q, a }) => `### ${q}\n\n${a}`).join("\n\n"),
    ),
    contactBlock(),
  );
}

export function projectsMarkdown() {
  const categories = Array.from(
    new Set(projects.map((p) => p.category ?? "Other")),
  );
  return doc(
    header(
      `Projects by ${profile.name}`,
      `${projects.length} backend engines, query processors, distributed systems, research software and CLI tools, plus ${patents.length} published patent applications, built by ${profile.name}.`,
      "/projects",
    ),
    ...categories.map((category) =>
      join(
        `## ${category}`,
        bullets(
          projects
            .filter((p) => (p.category ?? "Other") === category)
            .map(
              (p) =>
                `${projectLink(p)} (${p.year}; ${p.technologies.join(", ")}): ${p.description}`,
            ),
        ),
      ),
    ),
    patentsBlock(),
  );
}

export function projectMarkdown(project: Project) {
  const ev = project.evidence;
  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);
  return doc(
    header(projectTitle(project), project.description, `/projects/${project.slug}`),
    bullets([
      `Built by: ${profile.name}`,
      `Year: ${project.year}`,
      ...(project.category ? [`Category: ${project.category}`] : []),
      `Built with: ${project.technologies.join(", ")}`,
      ...(project.github ? [`Source code: ${project.github}`] : []),
    ]),
    ev
      ? join("## The problem", ev.problem, "## The approach", ev.approach)
      : join("## Purpose", project.purpose),
    ev?.metrics?.length &&
      join(
        "## Measured",
        bullets(
          ev.metrics.map(
            (m) => `${m.label}: **${m.value}**${m.note ? ` (${m.note})` : ""}`,
          ),
        ),
      ),
    ev?.limits && join("## What it does not do", ev.limits),
    related.length > 0 &&
      join(
        `## More by ${profile.name}`,
        bullets(related.map((p) => `${projectLink(p)}: ${p.description}`)),
      ),
  );
}

export function patentMarkdown(patent: Patent) {
  return doc(
    header(patent.title, patent.abstract, `/patents/${patent.slug}`),
    bullets([
      `By: ${profile.name}`,
      `Indian patent application number: ${patent.application}`,
      `Filed: ${patent.filed}`,
      `Published: ${patent.published}`,
      `Technologies: ${patent.technologies.join(", ")}`,
    ]),
    join("## Summary", patent.summary),
  );
}

export function hackathonMarkdown(hackathon: Hackathon) {
  return doc(
    header(
      `${hackathon.title}: ${profile.name}`,
      hackathon.summary,
      `/hackathons/${hackathon.slug}`,
    ),
    bullets([
      `Participant: ${profile.name}`,
      `Date: ${hackathon.date}`,
      `Location: ${hackathon.location}`,
      `Result: ${hackathon.summary}`,
    ]),
  );
}

export function researchMarkdown() {
  return doc(
    header(
      `Research by ${profile.name}`,
      "Database systems, trustworthy AI, distributed systems, security and machine learning: what is being worked on, what has been published, and what is being read.",
      "/research",
    ),
    join(
      "## Areas",
      bullets(researchAreas.map((a) => `**${a.title}**: ${a.description}`)),
    ),
    join(
      "## Active",
      ...activeResearchProjects.map((r) =>
        join(
          `### ${r.title}`,
          `${r.status}. Stage: ${r.currentStage}.`,
          r.shortDescription,
          bullets([
            `The problem: ${r.problem}`,
            `Why it matters: ${r.motivation}`,
            `The approach: ${r.approach}`,
            `Where it stands: ${r.currentProgress}`,
            `Next: ${r.futureWork}`,
          ]),
          (r.links ?? []).filter((l) => isRealLink(l.url)).length > 0 &&
            `Links: ${(r.links ?? [])
              .filter((l) => isRealLink(l.url))
              .map((l) => `[${l.label}](${l.url})`)
              .join(", ")}`,
        ),
      ),
    ),
    join(
      "## Papers",
      bullets(
        publications.map(
          (pub) =>
            `${publicationLine(pub)} Authors: ${authorLine(pub.authors)}. ${pub.abstract}`,
        ),
      ),
    ),
    patentsBlock(),
    join(
      "## Timeline",
      bullets(
        researchTimeline.map(
          (t) => `${t.year}: **${t.title}** (${t.subtitle}). ${t.description}`,
        ),
      ),
    ),
    join(
      "## Reading",
      bullets(
        readingList.map(
          (r) =>
            `${r.title}, ${r.authors} (${r.year}). ${r.status}.${r.takeaway ? ` ${r.takeaway}` : ""}`,
        ),
      ),
    ),
  );
}

/** https://llmstxt.org: a map of the site for language models and agents. */
export function llmsTxt() {
  return doc(
    `# ${profile.name}`,
    `> ${profile.name} (${profile.handle} on GitHub) is a backend engineer and systems builder studying Computer Science and Engineering at VIT Vellore, India. adith.xyz is Adith's official personal website: projects, patents, research, experience and contact details.`,
    bullets([
      `Name: ${profile.name}, also searched as "${profile.alternateNames.join('" and "')}"`,
      `Role: ${profile.headline}; ${profile.education.field} student at ${profile.education.schoolShort}`,
      `Focus: ${profile.focus.join(", ")}`,
      `Currently: ${experience[0].role}, ${experience[0].org}; open to ${profile.openTo.toLowerCase()}`,
      `Contact: ${profile.email}`,
      `Profiles: ${profile.links.github}, ${profile.links.linkedin}`,
    ]),
    `Every page on this site has a markdown version at the same URL with ".md" appended; the homepage is ${mdUrl("/")}. ${siteUrl}/llms-full.txt has the whole site in one file.`,
    join(
      "## About",
      bullets([
        `[About ${profile.name}](${mdUrl("/about")}): bio, experience, education, skills, awards and quick answers`,
        `[Homepage](${mdUrl("/")}): the portfolio at a glance`,
      ]),
    ),
    join(
      "## Projects",
      bullets([
        `[Project archive](${mdUrl("/projects")}): all ${projects.length} projects and ${patents.length} patent applications, by category`,
        ...projects.map((p) => `${projectLink(p)}: ${p.description}`),
      ]),
    ),
    join(
      "## Patents",
      bullets(
        patents.map(
          (p) =>
            `${patentLink(p)}: Indian patent application ${p.application}, published ${p.published}`,
        ),
      ),
    ),
    join(
      "## Research",
      bullets([
        `[Research](${mdUrl("/research")}): research areas, active projects, papers, patents and reading list`,
      ]),
    ),
    join(
      "## Optional",
      bullets([
        ...hackathons.map(
          (h) =>
            `[${h.title}](${mdUrl(`/hackathons/${h.slug}`)}): ${h.summary} ${h.location}, ${h.date}.`,
        ),
        `[Everything in one file](${siteUrl}/llms-full.txt): the About page, every project, patent and the research page`,
      ]),
    ),
  );
}

/** The whole site as one document, for agents that want a single fetch. */
export function llmsFullTxt() {
  return [
    aboutMarkdown(),
    projectsMarkdown(),
    ...projects.map(projectMarkdown),
    ...patents.map(patentMarkdown),
    researchMarkdown(),
    ...hackathons.map(hackathonMarkdown),
  ].join("\n---\n\n");
}

type MarkdownDoc = { body: string; canonical: string };

/**
 * Resolves the path under /md (what the .md rewrites in next.config.mjs
 * point at) to its document and the HTML page it mirrors.
 */
export function markdownFor(segments: string[]): MarkdownDoc | null {
  const [section, slug, ...rest] = segments;
  if (rest.length) return null;

  if (!slug) {
    switch (section) {
      case "index":
        return { body: homeMarkdown(), canonical: page("/") };
      case "about":
        return { body: aboutMarkdown(), canonical: page("/about") };
      case "projects":
        return { body: projectsMarkdown(), canonical: page("/projects") };
      case "research":
        return { body: researchMarkdown(), canonical: page("/research") };
      default:
        return null;
    }
  }

  if (section === "projects") {
    const project = projects.find((p) => p.slug === slug);
    return project
      ? { body: projectMarkdown(project), canonical: page(`/projects/${slug}`) }
      : null;
  }
  if (section === "patents") {
    const patent = patents.find((p) => p.slug === slug);
    return patent
      ? { body: patentMarkdown(patent), canonical: page(`/patents/${slug}`) }
      : null;
  }
  if (section === "hackathons") {
    const hackathon = hackathons.find((h) => h.slug === slug);
    return hackathon
      ? { body: hackathonMarkdown(hackathon), canonical: page(`/hackathons/${slug}`) }
      : null;
  }
  return null;
}

/** Every markdown path, for static generation. */
export function markdownPaths(): string[][] {
  return [
    ["index"],
    ["about"],
    ["projects"],
    ["research"],
    ...projects.map((p) => ["projects", p.slug]),
    ...patents.map((p) => ["patents", p.slug]),
    ...hackathons.map((h) => ["hackathons", h.slug]),
  ];
}
