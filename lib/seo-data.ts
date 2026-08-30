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

/**
 * Evidence for a project — the part a reader cannot get from a tech-tag list.
 *
 * `metrics` holds only numbers that were actually measured and are
 * reproducible from the repo. Leave it out rather than estimate.
 * `limits` is deliberately part of the schema: a build that states what it
 * cannot do reads as engineering, and it is the claim the site's own
 * "behavior > buzzwords" panel is making.
 */
export type Evidence = {
  /** The constraint or failure mode the project exists to handle. */
  problem: string;
  /** The decision taken, and the tradeoff it accepts. */
  approach: string;
  /** Measured results. Real numbers only. */
  metrics?: { label: string; value: string; note?: string }[];
  /** What did not work, or what this build still cannot do. */
  limits?: string;
};

export type Project = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  purpose: string;
  technologies: string[];
  year: string;
  screenshots: string[];
  github?: string;
  featured?: boolean;
  category?: "Systems / Backend" | "AI & ML" | "CLI & Tools" | "IoT / Hardware" | "Web Apps";
  paperColor?: "yellow" | "blue" | "orange" | "pink" | "green" | "purple" | "white";
  evidence?: Evidence;
};

export const projects: Project[] = [
  {
    slug: "scotland-yard",
    title: "SCOTLAND YARD",
    seoTitle: "Scotland Yard Multiplayer Backend",
    description:
      "Real-time multiplayer backend supporting 100+ users with persistent game state and server-authoritative gameplay.",
    purpose:
      "Built for real-time multiplayer gaming with persistent game state, low latency synchronization, and server-authoritative gameplay.",
    technologies: ["Node.js", "Express", "Prisma", "PostgreSQL", "WebSockets"],
    year: "2025",
    screenshots: ["/images/projects/_placeholder.svg"],
    github: "https://github.com/Ad1th/Scotland-Yard-Gravitas-Backend-25",
    featured: true,
    category: "Systems / Backend",
    paperColor: "orange",
  },
  {
    slug: "aetherquery",
    title: "AETHERQUERY",
    seoTitle: "AetherQuery Analytical Query Engine",
    description:
      "Cross-database analytical query engine supporting DuckDB/PostgreSQL/MySQL with adaptive execution.",
    purpose:
      "Cross-database analytical query engine with adaptive execution plans for high-throughput SQL analytics at scale.",
    technologies: ["FastAPI", "Python", "DuckDB", "PostgreSQL", "MySQL"],
    year: "2026",
    screenshots: ["/images/projects/_placeholder.svg"],
    github: "https://github.com/Ad1th/AetherQuery",
    featured: true,
    category: "Systems / Backend",
    paperColor: "blue",
    evidence: {
      problem:
        "Exploratory analytics makes you wait for exact answers you do not need yet. While shaping a query you want the shape of the result in a fraction of the time, and you want to know how wrong the fast answer is.",
      approach:
        "Approximate execution alongside exact, over DuckDB, Postgres and MySQL. Both sides of a join are sampled independently rather than after the join, so join selectivity survives; HyperLogLog sketches estimate result cardinality without materialising it, and bloom filters pre-filter the probe side. A benchmark mode runs exact and approximate together and reports the error and the speedup rather than asking you to trust the sample.",
      metrics: [
        {
          label: "TPC-H Q5, 3-way star join",
          value: "6.85x faster",
          note: "0.035s exact vs 0.005s approximate at 1% sampling",
        },
        {
          label: "Cardinality estimate error",
          value: "~1%",
          note: "HyperLogLog, 2^14 registers, 16KB per sketch",
        },
        {
          label: "Adaptive time budget",
          value: "2x / 3.5x",
          note: "Multipliers applied for 2-way and 3-way joins",
        },
      ],
      limits:
        "Only one of five TPC-H join queries came out ahead. Q3, Q10, Q12 and Q18 ran 5x to 50x slower approximate than exact, because TABLESAMPLE overhead dominates at these sizes and small samples never reach parallel execution. At 1% sampling all five returned zero rows: join selectivity collapses on small samples. The sampling strategy holds for single-table aggregates; selective multi-way joins need a higher floor on sample size before it pays.",
    },
  },
  {
    slug: "archaic",
    title: "archAIc",
    seoTitle: "archAIc Reliability Engineering Platform",
    description:
      "Distributed reliability engineering platform with observability, metrics, tracing, and anomaly detection.",
    purpose:
      "Distributed reliability engineering platform providing real-time telemetry tracing, metrics, and automated anomaly detection.",
    technologies: ["Kubernetes", "OpenTelemetry", "Grafana", "Python", "Observability"],
    year: "2026",
    screenshots: ["/images/projects/_placeholder.svg"],
    github: "https://github.com/Ad1th/archAIc",
    featured: true,
    category: "Systems / Backend",
    paperColor: "purple",
  },
  {
    slug: "point-wave-energy-harvester",
    title: "POINT WAVE ENERGY HARVESTER",
    seoTitle: "Point Wave Energy Harvester IoT",
    description:
      "IoT telemetry + MPPT wave energy harvesting system for real-time energy extraction tracking.",
    purpose:
      "IoT telemetry system paired with Maximum Power Point Tracking (MPPT) circuitry for ocean wave energy harvesting.",
    technologies: ["IoT", "Circuits", "Telemetry", "MPPT", "Hardware"],
    year: "2025",
    screenshots: ["/images/projects/_placeholder.svg"],
    featured: true,
    category: "IoT / Hardware",
    paperColor: "yellow",
  },
  {
    slug: "reference-hallucination-detector",
    title: "Reference Hallucination Detector",
    seoTitle: "Reference Hallucination Detector AI",
    description:
      "Reference checking tool for citation-grounded text review, claim tracing, and hallucination evaluations.",
    purpose:
      "Citation grounding and reference checking tool to detect hallucinated academic and textual references in LLM outputs.",
    technologies: ["NLP", "Evals", "Python", "LLMs"],
    year: "2026",
    screenshots: ["/images/projects/_placeholder.svg"],
    category: "AI & ML",
    paperColor: "green",
  },
  {
    slug: "blindspot",
    title: "BlindSpot",
    seoTitle: "BlindSpot Assistive Perception Prototype",
    description:
      "Assistive perception prototype for visual context detection, scene parsing, and object cues on edge devices.",
    purpose:
      "Assistive perception prototype enabling visually impaired users to perceive objects, path cues, and environmental context on edge hardware.",
    technologies: ["Machine Learning", "Raspberry Pi", "Edge Processing", "Computer Vision"],
    year: "2025",
    screenshots: ["/images/projects/_placeholder.svg"],
    github: "https://github.com/Ad1th/BlindSpot",
    category: "AI & ML",
    paperColor: "pink",
  },
  {
    slug: "argus",
    title: "Argus",
    seoTitle: "Argus Database Query Visualizer",
    description:
      "Compact database query visualizer for inspecting event streams, query shells and trace maps.",
    purpose:
      "Built to help developers understand database behavior and telemetry while debugging backend systems.",
    technologies: ["Python", "Telemetry", "Databases", "Query Visualization"],
    year: "2025",
    screenshots: ["/images/projects/_placeholder.svg"],
    github: "https://github.com/Ad1th/Argus",
    category: "CLI & Tools",
    paperColor: "white",
    evidence: {
      problem:
        "A query plan printed as text tells you the operators but not where the work actually goes. Reading EXPLAIN output is a skill; seeing the plan is not.",
      approach:
        "A CSV is registered as a DuckDB view through read_csv_auto, so there is no schema step before you can query. The plan is parsed into an operator graph and laid out with Dagre, then rendered as nodes and edges in React Flow, so the shape of the plan is the thing on screen. The backend was moved from Python to Rust on Axum; the Python implementation is kept for reference.",
      limits:
        "DuckDB runs in-memory, so every uploaded table is lost when the backend restarts. Fine for reading a plan, not a place to keep data.",
    },
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
    screenshots: ["/images/projects/cloudify/cloudify.webp"],
    github: "https://github.com/Ad1th/file-mgmt",
    category: "Web Apps",
    paperColor: "blue",
  },
  {
    slug: "croplink",
    title: "CropLink",
    seoTitle: "CropLink Agricultural Marketplace",
    description:
      "Platform connecting farmers directly to agricultural laborers with listing boards and order workflows.",
    purpose:
      "Direct agricultural labor connection platform matching local farmers with available farm workforce.",
    technologies: ["React", "Node.js", "Express"],
    year: "2025",
    screenshots: ["/images/projects/_placeholder.svg"],
    category: "Web Apps",
    paperColor: "yellow",
  },
  {
    slug: "therddit",
    title: "Threddit",
    seoTitle: "Threddit Gemini Productivity Chrome Extension",
    description:
      "Threddit is a Chrome extension that improves productivity with non-intrusive nudges powered by the Gemini API.",
    purpose:
      "Built to reduce distraction loops and keep browsing sessions aligned with user intent.",
    technologies: ["JavaScript", "Chrome Extension", "Gemini API"],
    year: "2024",
    screenshots: ["/images/projects/threddit/threddit.webp"],
    category: "AI & ML",
    paperColor: "purple",
  },
  {
    slug: "echochamber",
    title: "EchoChamber",
    seoTitle: "EchoChamber Anonymous Chat Forum",
    description:
      "Anonymous real-time chat forum for rapid open thread creation and transparent message exchange.",
    purpose:
      "Anonymous real-time chat forum for rapid open thread creation and transparent message exchange.",
    technologies: ["JavaScript", "Node.js", "WebSockets"],
    year: "2024",
    screenshots: ["/images/projects/echochamber/echochamber.webp"],
    category: "Web Apps",
    paperColor: "orange",
  },
  {
    slug: "sevaverse",
    title: "SevaVerse",
    seoTitle: "SevaVerse Community Coordination Platform",
    description:
      "SevaVerse is a community coordination platform for local service initiatives and volunteer mobilization.",
    purpose:
      "Built to help volunteers, organizers and communities coordinate service work more effectively.",
    technologies: ["JavaScript", "SQL", "Community Platform"],
    year: "2025",
    screenshots: ["/images/projects/sevaverse/sevaverse.webp"],
    category: "Web Apps",
    paperColor: "pink",
  },
  {
    slug: "ecosync",
    title: "EcoSync",
    seoTitle: "EcoSync AI Sustainability Solution",
    description:
      "EcoSync is an AI-based sustainability solution for textile industries evaluating resource consumption.",
    purpose:
      "Built to help textile operations reason about sustainability signals and improve decision-making.",
    technologies: ["Machine Learning", "JavaScript", "SQL"],
    year: "2025",
    screenshots: ["/images/projects/ecosync/EcoSync.webp"],
    category: "AI & ML",
    paperColor: "green",
  },
  {
    slug: "hospitech",
    title: "HOSPITECH",
    seoTitle: "Hospitech Clinic Management System",
    description:
      "Comprehensive clinic management system for patient queues, medical history records, and scheduling.",
    purpose:
      "Comprehensive hospital and clinic management system for patient records, queueing, and appointment scheduling.",
    technologies: ["Python", "SQL", "Database Systems"],
    year: "2025",
    screenshots: ["/images/projects/_placeholder.svg"],
    category: "Web Apps",
    paperColor: "white",
  },
  {
    slug: "konectus",
    title: "KonectUs",
    seoTitle: "KonectUs Social Networking Platform",
    description:
      "KonectUs is a real-time social networking platform that connects communities with purpose.",
    purpose:
      "Built to explore real-time communication, community discovery and social product architecture.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
    year: "2025",
    screenshots: ["/images/projects/konectus/konectus.webp"],
    category: "Web Apps",
    paperColor: "orange",
  },
  {
    slug: "caughtin4k",
    title: "CaughtIn4K",
    seoTitle: "CaughtIn4K Golang Event Inspector",
    description:
      "High-resolution HTTP event capture, local SQLite log recorder, and instant review dashboard.",
    purpose:
      "High-performance HTTP event capture tool logging traffic to SQLite with an instant review dashboard.",
    technologies: ["Golang", "Fiber", "SQLite"],
    year: "2026",
    screenshots: ["/images/projects/_placeholder.svg"],
    category: "CLI & Tools",
    paperColor: "yellow",
  },
  {
    slug: "whohitme",
    title: "WhoHitMe",
    seoTitle: "WhoHitMe CLI Traffic Tracer",
    description:
      "CLI utility for quick request tracing, source IP inspection, and request header analysis.",
    purpose:
      "Command-line diagnostic utility for quick request tracing, source IP inspection, and header analysis.",
    technologies: ["Golang", "CLI", "Networking"],
    year: "2026",
    screenshots: ["/images/projects/_placeholder.svg"],
    category: "CLI & Tools",
    paperColor: "blue",
  },
  {
    slug: "whatdidyousend",
    title: "WhatDidYouSend",
    seoTitle: "WhatDidYouSend Token Microservice",
    description:
      "Token inspection microservice backed by PostgreSQL for payload verification and audit logging.",
    purpose:
      "Token inspection microservice backed by PostgreSQL for payload verification and audit logging.",
    technologies: ["Golang", "Fiber", "PostgreSQL"],
    year: "2026",
    screenshots: ["/images/projects/_placeholder.svg"],
    github: "https://github.com/Ad1th/WhatDidYouSend",
    category: "CLI & Tools",
    paperColor: "purple",
  },
  {
    slug: "snek",
    title: "Snek",
    seoTitle: "Snek Python Arcade Game",
    description:
      "Compact Python arcade game with classic snake mechanics, responsive controls, and high scores.",
    purpose:
      "Compact Python arcade Snake game featuring responsive input handling and persistent score tracking.",
    technologies: ["Python", "Arcade Mechanics"],
    year: "2023",
    screenshots: ["/images/projects/_placeholder.svg"],
    category: "CLI & Tools",
    paperColor: "green",
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
