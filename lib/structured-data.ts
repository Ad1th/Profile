import {
  activeResearchProjects,
  publications,
} from "@/content/research";
import { experience, profile, quickAnswers } from "@/lib/profile";
import {
  type Hackathon,
  type Patent,
  type Project,
  achievements,
  patents,
  projects,
  siteDescription,
  siteName,
  siteTitle,
  siteUpdated,
  siteUrl,
} from "@/lib/seo-data";

/**
 * JSON-LD, as one connected graph rather than loose islands.
 *
 * Every node about Adith points at the same Person by `@id`, so a crawler
 * that lands on any page (a project, a patent, the archive) resolves it to
 * the same entity, with the same name, photo and profiles. That consistency
 * is most of what entity-level search (Google's Knowledge Graph, and the
 * answer engines that lean on it) rewards.
 */

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;
const portraitId = `${siteUrl}/#portrait`;

const person = { "@id": personId };

export const url = (path = "/") => (path === "/" ? siteUrl : `${siteUrl}${path}`);

const MONTHS: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

/** "13 Feb 2026" -> "2026-02-13", "Mar 2026" -> "2026-03", "2025" -> "2025". */
export function isoDate(human: string) {
  const parts = human.trim().split(/\s+/);
  if (parts.length === 3) {
    const [d, m, y] = parts;
    return `${y}-${MONTHS[m.slice(0, 3).toLowerCase()]}-${d.padStart(2, "0")}`;
  }
  if (parts.length === 2) {
    const [m, y] = parts;
    return `${y}-${MONTHS[m.slice(0, 3).toLowerCase()]}`;
  }
  return human;
}

const PLACES: Record<string, { locality: string; region: string }> = {
  "VIT Vellore": { locality: "Vellore", region: "Tamil Nadu" },
  "NPS KRM, Bangalore": { locality: "Bengaluru", region: "Karnataka" },
  "MIT Bangalore": { locality: "Bengaluru", region: "Karnataka" },
};

function place(name: string) {
  const known = PLACES[name];
  return {
    "@type": "Place",
    name,
    ...(known
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: known.locality,
            addressRegion: known.region,
            addressCountry: "IN",
          },
        }
      : {}),
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    alternateName: [...profile.alternateNames],
    url: siteUrl,
    image: {
      "@type": "ImageObject",
      "@id": portraitId,
      url: url(profile.portrait.path),
      contentUrl: url(profile.portrait.path),
      width: profile.portrait.width,
      height: profile.portrait.height,
      caption: profile.portrait.alt,
    },
    description: profile.summary,
    jobTitle: profile.jobTitle,
    email: `mailto:${profile.email}`,
    homeLocation: { "@type": "Place", name: profile.homeLocation },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
      alternateName: profile.education.schoolShort,
      url: profile.education.schoolUrl,
      sameAs: profile.education.schoolWikipedia,
    },
    memberOf: experience
      .filter((item) => !item.end)
      .map((item) => ({
        "@type": "OrganizationRole",
        roleName: item.role,
        startDate: isoDate(item.start),
        memberOf: {
          "@type": "Organization",
          name: item.org,
          ...(item.orgUrl ? { sameAs: item.orgUrl } : {}),
        },
      })),
    knowsAbout: [
      ...profile.focus,
      ...Object.values(profile.skills).flat(),
    ],
    knowsLanguage: [...profile.spokenLanguages],
    award: achievements
      .filter((item) => !/certification/i.test(item.title))
      .map((item) => `${item.title} (${item.year})`),
    hasCredential: achievements
      .filter((item) => /certification/i.test(item.title))
      .map((item) => ({
        "@type": "EducationalOccupationalCredential",
        name: item.title,
        credentialCategory: "certification",
      })),
    sameAs: [profile.links.github, profile.links.linkedin],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    // Google takes the site name shown in results from these two fields.
    name: siteName,
    alternateName: ["Adith", "adith.xyz", "Adith Manikonda Portfolio"],
    description: siteDescription,
    inLanguage: "en",
    publisher: person,
    author: person,
    about: person,
    copyrightHolder: person,
  };
}

/** The graph every page carries: who the site is about, and what the site is. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), websiteNode()],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbNode(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url(trail[trail.length - 1].path)}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: url(crumb.path),
    })),
  };
}

/** A page node: what the URL is, which site it belongs to, and its trail. */
function webPageNode({
  type = "WebPage",
  path,
  name,
  description,
  trail,
  extra = {},
}: {
  type?: string;
  path: string;
  name: string;
  description: string;
  trail?: Crumb[];
  extra?: Record<string, unknown>;
}) {
  return {
    "@type": type,
    "@id": `${url(path)}#webpage`,
    url: url(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    dateModified: siteUpdated,
    author: person,
    ...(trail ? { breadcrumb: { "@id": `${url(path)}#breadcrumb` } } : {}),
    ...extra,
  };
}

/** Name and URL of every project, so the homepage graph links to each one. */
function projectListNode(id: string) {
  return {
    "@type": "ItemList",
    "@id": id,
    name: `Projects by ${profile.name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: project.seoTitle ?? project.title,
      url: url(`/projects/${project.slug}`),
    })),
  };
}

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        type: "ProfilePage",
        path: "/",
        name: siteTitle,
        description: siteDescription,
        extra: {
          mainEntity: person,
          about: person,
          primaryImageOfPage: { "@id": portraitId },
          hasPart: { "@id": `${siteUrl}/#projects` },
        },
      }),
      projectListNode(`${siteUrl}/#projects`),
    ],
  };
}

export function aboutGraph(description: string) {
  const trail = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        type: "AboutPage",
        path: "/about",
        name: `About ${profile.name}`,
        description,
        trail,
        extra: {
          mainEntity: person,
          about: person,
          primaryImageOfPage: { "@id": portraitId },
          hasPart: { "@id": `${url("/about")}#quick-answers` },
        },
      }),
      {
        "@type": "FAQPage",
        "@id": `${url("/about")}#quick-answers`,
        url: url("/about"),
        name: `Quick answers about ${profile.name}`,
        about: person,
        mainEntity: quickAnswers.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      breadcrumbNode(trail),
    ],
  };
}

export function projectsArchiveGraph(description: string) {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        type: "CollectionPage",
        path: "/projects",
        name: `Projects by ${profile.name}`,
        description,
        trail,
        extra: { about: person, mainEntity: { "@id": `${url("/projects")}#list` } },
      }),
      {
        "@type": "ItemList",
        "@id": `${url("/projects")}#list`,
        name: `Projects and patents by ${profile.name}`,
        numberOfItems: projects.length + patents.length,
        itemListElement: [
          ...projects.map((project, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: projectNode(project),
          })),
          ...patents.map((patent, i) => ({
            "@type": "ListItem",
            position: projects.length + i + 1,
            item: patentNode(patent),
          })),
        ],
      },
      breadcrumbNode(trail),
    ],
  };
}

export function researchGraph(description: string) {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        type: "CollectionPage",
        path: "/research",
        name: `Research by ${profile.name}`,
        description,
        trail,
        extra: {
          about: person,
          hasPart: [
            // Only a published paper gets a publisher and a publication
            // date. Marking a manuscript under review that way would tell
            // every crawler it appeared somewhere it has not.
            ...publications.map((pub) => ({
              "@type": "ScholarlyArticle",
              name: pub.title,
              headline: pub.title,
              abstract: pub.abstract,
              author: person,
              ...(pub.status === "Published"
                ? {
                    datePublished: pub.date,
                    ...(pub.publisher
                      ? { publisher: { "@type": "Organization", name: pub.publisher } }
                      : {}),
                    publication: { "@type": "PublicationEvent", name: pub.venue },
                  }
                : { creativeWorkStatus: pub.status }),
            })),
            ...patents.map((patent) => ({ "@id": patentId(patent) })),
            ...activeResearchProjects.map((project) => ({
              "@type": "ResearchProject",
              name: project.title,
              description: project.shortDescription,
              member: person,
            })),
          ],
        },
      }),
      ...patents.map(patentNode),
      breadcrumbNode(trail),
    ],
  };
}

export function projectId(project: Project) {
  return `${url(`/projects/${project.slug}`)}#work`;
}

/** Hardware builds are not source code; everything else is. */
function projectType(project: Project) {
  return project.category === "IoT / Hardware" ? "CreativeWork" : "SoftwareSourceCode";
}

export function projectNode(project: Project) {
  const realShots = project.screenshots.filter((s) => !s.endsWith("_placeholder.svg"));
  return {
    "@type": projectType(project),
    "@id": projectId(project),
    name: project.seoTitle ?? project.title,
    alternateName: project.title,
    url: url(`/projects/${project.slug}`),
    description: project.description,
    abstract: project.evidence?.problem ?? project.purpose,
    keywords: project.technologies.join(", "),
    dateCreated: project.year,
    author: person,
    creator: person,
    ...(projectType(project) === "SoftwareSourceCode"
      ? { programmingLanguage: project.technologies }
      : {}),
    ...(project.github
      ? projectType(project) === "SoftwareSourceCode"
        ? { codeRepository: project.github }
        : { sameAs: project.github }
      : {}),
    ...(realShots.length ? { image: realShots.map((s) => url(s)) } : {}),
  };
}

export function projectGraph(project: Project) {
  const path = `/projects/${project.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.seoTitle ?? project.title, path },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        path,
        name: project.seoTitle ?? project.title,
        description: project.description,
        trail,
        extra: { mainEntity: { "@id": projectId(project) } },
      }),
      projectNode(project),
      breadcrumbNode(trail),
    ],
  };
}

export function patentId(patent: Patent) {
  return `${url(`/patents/${patent.slug}`)}#patent`;
}

export function patentNode(patent: Patent) {
  return {
    "@type": "CreativeWork",
    "@id": patentId(patent),
    genre: "Patent application",
    name: patent.title,
    url: url(`/patents/${patent.slug}`),
    abstract: patent.abstract,
    description: patent.summary,
    keywords: patent.technologies.join(", "),
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Indian patent application number",
      value: patent.application,
    },
    dateCreated: isoDate(patent.filed),
    datePublished: isoDate(patent.published),
    publisher: {
      "@type": "GovernmentOrganization",
      name: "Indian Patent Office",
    },
    creator: person,
    author: person,
  };
}

export function patentGraph(patent: Patent) {
  const path = `/patents/${patent.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: patent.title, path },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        path,
        name: patent.title,
        description: patent.abstract,
        trail,
        extra: { mainEntity: { "@id": patentId(patent) } },
      }),
      patentNode(patent),
      breadcrumbNode(trail),
    ],
  };
}

export function hackathonGraph(hackathon: Hackathon) {
  const path = `/hackathons/${hackathon.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: hackathon.title, path },
  ];
  // Described on the page rather than as an Event: Google's event results
  // only list upcoming events, so for a past hackathon the markup could only
  // ever add warnings to Search Console.
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        path,
        name: `${hackathon.title}: ${profile.name}`,
        description: hackathon.summary,
        trail,
        extra: {
          about: person,
          temporalCoverage: isoDate(hackathon.date),
          contentLocation: place(hackathon.location),
        },
      }),
      breadcrumbNode(trail),
    ],
  };
}
