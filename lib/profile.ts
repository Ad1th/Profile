/**
 * Who the site is about, in one place.
 *
 * Search engines, answer engines and agents all ask the same few questions:
 * who is this, what do they do, where, and how do I reach them. Every
 * machine-readable surface (the JSON-LD graph, llms.txt, the markdown views)
 * and the About page answer from this file, so the answers cannot drift
 * apart. The animated homepage sections keep their own copy for layout
 * reasons; when a fact changes there, change it here too.
 *
 * Plain facts only. Anything stated here gets repeated verbatim by machines
 * that have no way to check it.
 */

export const profile = {
  name: "Adith Manikonda",
  givenName: "Adith",
  familyName: "Manikonda",
  /** The other names people search for: the first name alone, and the handle. */
  alternateNames: ["Adith", "Ad1th"],
  handle: "Ad1th",
  jobTitle: "Backend Engineer",
  headline: "Backend engineer and systems builder",
  /** One sentence that answers "who is Adith?" on its own. */
  summary:
    "Adith Manikonda is a backend engineer and systems builder studying Computer Science and Engineering at VIT Vellore, India.",
  /**
   * The longer answer, for the About page and llms.txt. Always shown after
   * the summary, so it picks up where that sentence ends instead of
   * repeating it.
   */
  bio: [
    "Adith works on the parts of software that have to hold up under load: databases and query engines, real-time backends, observability and reliability tooling, and the embedded hardware where software meets the physical world.",
    "Recent work includes AetherQuery, an approximate analytical query engine over DuckDB, PostgreSQL and MySQL; a cache-conscious symbol table in C11 with constant-time scope teardown; archAIc, a chaos and anomaly detection platform for instrumented microservices; and Switchboard, a reverse proxy and load balancer written in Go. Adith is named on two published Indian patent applications, one for an assistive perception system for visually impaired users and one for a wave energy harvester with maximum power point tracking and IoT telemetry.",
    "Adith is Technical Head of the Mozilla Firefox Club at VIT Vellore, has interned at IIT Hyderabad and Matrix Capital, and is open to backend, systems and infrastructure internships.",
  ],
  email: "hello@adith.xyz",
  location: "Vellore, Tamil Nadu, India",
  /** Public on the GitHub profile; used only as the JSON-LD home location. */
  homeLocation: "Bangalore, India",
  portrait: {
    path: "/images/me2.webp",
    width: 675,
    height: 900,
    alt: "Adith Manikonda",
  },
  openTo: "Backend, systems and infrastructure internships",
  education: {
    school: "Vellore Institute of Technology (VIT)",
    schoolShort: "VIT Vellore",
    schoolUrl: "https://vit.ac.in",
    schoolWikipedia:
      "https://en.wikipedia.org/wiki/Vellore_Institute_of_Technology",
    field: "Computer Science and Engineering (CSE)",
    location: "Vellore, Tamil Nadu, India",
  },
  links: {
    github: "https://github.com/Ad1th",
    linkedin: "https://www.linkedin.com/in/adith-manikonda/",
  },
  focus: [
    "Backend systems and APIs",
    "Databases and query engines",
    "Observability and reliability engineering",
    "Distributed systems",
    "Embedded systems and IoT hardware",
  ],
  skills: {
    Backend: ["Node.js", "FastAPI", "Express", "Go", "Prisma", "Redis", "RabbitMQ"],
    Data: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "DuckDB"],
    Observability: ["Prometheus", "Grafana", "Loki", "Jaeger", "Sentry", "OpenTelemetry"],
    Hardware: ["Embedded systems", "Microcontrollers", "Sensors", "I2C", "SPI", "UART"],
    Languages: ["Python", "JavaScript", "Go", "C", "SQL"],
  },
  spokenLanguages: ["English", "Hindi", "Telugu", "Kannada", "French"],
} as const;

export type ExperienceItem = {
  role: string;
  org: string;
  orgUrl?: string;
  location?: string;
  start: string;
  end?: string;
  summary: string;
};

/** Mirrors components/sections/experience/Experience.tsx, newest first. */
export const experience: ExperienceItem[] = [
  {
    role: "Technical Head",
    org: "Mozilla Firefox Club, VIT Vellore",
    orgUrl: "https://github.com/mfc-vit",
    location: "Vellore, India",
    start: "Jan 2026",
    summary:
      "Leads technical initiatives and open-source programs, mentors teams and designs resilient systems.",
  },
  {
    role: "Open Source Contributor",
    org: "GirlScript Summer of Code (GSSoC'26)",
    start: "2026",
    summary: "Community work, documentation and fixes.",
  },
  {
    role: "Research Intern",
    org: "IIT Hyderabad",
    location: "Hyderabad, India",
    start: "Dec 2025",
    end: "Jan 2026",
    summary: "Database optimization, data pipelines and system tooling.",
  },
  {
    role: "Software Development Intern",
    org: "Matrix Capital",
    start: "May 2025",
    end: "Jun 2025",
    summary:
      "Built research infrastructure for scalable systems, with web and API improvements and cross-team delivery.",
  },
];

/**
 * The questions people actually type about a person, answered in the first
 * sentence. Rendered on the About page and in the markdown views.
 */
export const quickAnswers: { q: string; a: string }[] = [
  {
    q: "Who is Adith Manikonda?",
    a: "Adith Manikonda is a backend engineer and systems builder studying Computer Science and Engineering at VIT Vellore, India. Adith builds query engines, real-time backends, reliability tooling and embedded hardware, and is named on two published Indian patent applications.",
  },
  {
    q: "Is adith.xyz Adith Manikonda's official website?",
    a: "Yes. adith.xyz is the personal website and portfolio of Adith Manikonda, who is Ad1th on GitHub.",
  },
  {
    q: "What does Adith work on?",
    a: "Backend systems, databases and observability: AetherQuery, an approximate query engine over DuckDB, PostgreSQL and MySQL; a cache-conscious symbol table in C11; archAIc, a chaos and anomaly detection platform on Kubernetes; Switchboard, a reverse proxy in Go; plus IoT and assistive hardware.",
  },
  {
    q: "Where does Adith study?",
    a: "Adith studies Computer Science and Engineering (CSE) at Vellore Institute of Technology (VIT) in Vellore, Tamil Nadu, India.",
  },
  {
    q: "Is Adith open to internships?",
    a: "Yes. Adith is open to backend, systems and infrastructure internships.",
  },
  {
    q: "How do I contact Adith Manikonda?",
    a: "Email hello@adith.xyz, or reach Adith on LinkedIn at linkedin.com/in/adith-manikonda or on GitHub at github.com/Ad1th.",
  },
];
