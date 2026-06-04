export const siteUrl = "https://adith.xyz";

export const siteTitle =
  "Adith Manikonda | Backend Engineer, Systems Builder & Research Developer";

export const siteDescription =
  "Adith Manikonda is a backend-focused engineer from VIT Vellore building scalable systems, developer tools, research projects, patents, open-source contributions and real-world applications using Node.js, FastAPI, PostgreSQL, Prisma and modern cloud infrastructure.";

export const siteKeywords = [
  "Adith",
  "Adith Manikonda",
  "Adith VIT",
  "Adith Vellore",
  "Adith Portfolio",
  "Backend Engineer",
  "Systems Engineer",
  "FastAPI",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Software Engineer",
  "Research Developer",
  "Technical Lead",
  "Open Source Contributor",
  "VIT Vellore",
  "Hackathon Finalist",
  "Patent Developer",
];

export type Project = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  purpose: string;
  technologies: string[];
  year: string;
  screenshots: string[];
};

export const projects: Project[] = [
  {
    slug: "argus",
    title: "Argus",
    description:
      "Argus is a compact database query visualizer for inspecting event streams, query shells and trace maps.",
    purpose:
      "Built to help developers understand database behavior and telemetry while debugging backend systems.",
    technologies: ["Python", "Telemetry", "Databases", "Query Visualization"],
    year: "2025",
    screenshots: ["/images/projects/_placeholder.svg"],
  },
  {
    slug: "therddit",
    title: "Threddit",
    seoTitle: "Threddit",
    description:
      "Threddit is a Chrome extension that improves productivity with non-intrusive nudges powered by the Gemini API.",
    purpose:
      "Built to reduce distraction loops and keep browsing sessions aligned with user intent.",
    technologies: ["JavaScript", "Chrome Extension", "Gemini API"],
    year: "2024",
    screenshots: ["/images/projects/threddit/threddit.png"],
  },
  {
    slug: "ecosync",
    title: "EcoSync",
    description:
      "EcoSync is an AI-based sustainability solution for textile industries.",
    purpose:
      "Built to help textile operations reason about sustainability signals and improve decision-making.",
    technologies: ["Machine Learning", "JavaScript", "SQL"],
    year: "2025",
    screenshots: ["/images/projects/ecosync/EcoSync.png"],
  },
  {
    slug: "sevaverse",
    title: "SevaVerse",
    description:
      "SevaVerse is a community coordination platform for local service initiatives.",
    purpose:
      "Built to help volunteers, organizers and communities coordinate service work more effectively.",
    technologies: ["JavaScript", "SQL", "Community Platform"],
    year: "2025",
    screenshots: ["/images/projects/sevaverse/sevaverse.png"],
  },
  {
    slug: "konectus",
    title: "KonectUs",
    description:
      "KonectUs is a real-time social networking platform that connects communities with purpose.",
    purpose:
      "Built to explore real-time communication, community discovery and social product architecture.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
    year: "2025",
    screenshots: ["/images/projects/konectus/konectus.png"],
  },
  {
    slug: "google-drive-clone",
    title: "Cloudify",
    seoTitle: "Google Drive Clone - Cloudify",
    description:
      "Cloudify is a Google Drive style cloud storage platform built with Next.js, PostgreSQL and storage buckets.",
    purpose:
      "Built to implement file upload, storage organization and cloud-drive user workflows in a production-style web app.",
    technologies: ["Next.js", "PostgreSQL", "Storage Buckets", "Cloud Storage"],
    year: "2025",
    screenshots: ["/images/projects/cloudify/cloudify.png"],
  },
];

export type Patent = {
  slug: string;
  title: string;
  abstract: string;
  summary: string;
  technologies: string[];
  application: string;
  filed: string;
  published: string;
};

export const patents: Patent[] = [
  {
    slug: "visual-assistance-system",
    title:
      "A System for Real Time Environmental Perception and Assistance for a Visually Impaired User",
    abstract:
      "A real-time environmental perception and assistance system for visually impaired users, focused on obstacle, path and context awareness.",
    summary:
      "The system combines perception, signal processing and assistive feedback to help visually impaired users interpret nearby environmental conditions.",
    technologies: [
      "Computer Vision",
      "Edge Processing",
      "Assistive Technology",
      "Environmental Perception",
    ],
    application: "202641010249",
    filed: "31 Jan 2026",
    published: "13 Feb 2026",
  },
  {
    slug: "wave-energy-generator",
    title:
      "Wave Energy Generator Electrical Circuit with Maximum Power Point Tracking and IoT Telemetry System",
    abstract:
      "A wave energy generator electrical circuit with maximum power point tracking and IoT telemetry for monitoring energy harvesting performance.",
    summary:
      "The system focuses on extracting and observing energy from wave motion through MPPT circuitry and connected telemetry.",
    technologies: ["IoT", "Telemetry", "MPPT", "Wave Energy", "Circuits"],
    application: "202641032830",
    filed: "18 Mar 2026",
    published: "18 Mar 2026",
  },
];

export type Hackathon = {
  slug: string;
  title: string;
  date: string;
  location: string;
  summary: string;
};

export const hackathons: Hackathon[] = [
  {
    slug: "women-techies",
    title: "Women Techies",
    date: "Mar 2026",
    location: "VIT Vellore",
    summary:
      "Women Techies finalist achievement, placing among the top 10 teams at VIT Vellore.",
  },
  {
    slug: "code-2-create",
    title: "Code 2 Create",
    date: "Sep 2025",
    location: "VIT Vellore",
    summary:
      "Code 2 Create AI Track Winner achievement for a hackathon project at VIT Vellore.",
  },
  {
    slug: "yantra-central-hack",
    title: "Yantra Central Hack",
    date: "Jan 2025",
    location: "VIT Vellore",
    summary:
      "Yantra Central Hack participation focused on rapid engineering and product prototyping.",
  },
  {
    slug: "devjams",
    title: "DevJams",
    date: "Sep 2024",
    location: "VIT Vellore",
    summary:
      "DevJams hackathon participation at VIT Vellore, contributing to Adith Manikonda's project-building record.",
  },
  {
    slug: "codewars",
    title: "CodeWars",
    date: "Feb 2024",
    location: "NPS KRM, Bangalore",
    summary:
      "CodeWars first-place achievement demonstrating early competitive programming and software problem-solving experience.",
  },
];

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adith Manikonda",
  url: siteUrl,
  jobTitle: "Backend Engineer",
  alumniOf: "VIT Vellore",
  sameAs: [
    "https://github.com/Ad1th",
    "https://www.linkedin.com/in/adith-manikonda/",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Adith Manikonda Portfolio",
  url: siteUrl,
  description: siteDescription,
  inLanguage: "en",
};
