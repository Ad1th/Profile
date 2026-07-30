export type ResearchPatent = {
  id: string;
  applicationNumber: string;
  title: string;
  status: string;
  filedDate: string;
  publishedDate: string;
  abstract: string;
  technologies: string[];
};

export const patents: ResearchPatent[] = [
  {
    id: "wave-energy-mppt",
    applicationNumber: "202641032830",
    title:
      "Wave Energy Generator Electrical Circuit with Maximum Power Point Tracking and IoT Telemetry System",
    status: "Published — Currently under examination",
    filedDate: "18 Mar 2026",
    publishedDate: "18 Mar 2026",
    abstract:
      "An electrical circuit system featuring maximum power point tracking (MPPT) integrated with an IoT telemetry pipeline for monitoring ocean wave energy harvesting efficiency in real-time.",
    technologies: [
      "Circuit Design",
      "Embedded Systems",
      "IoT",
      "Power Electronics",
      "Renewable Energy",
      "MPPT",
    ],
  },
  {
    id: "visual-assistance-perception",
    applicationNumber: "202641010249",
    title:
      "A System for Real Time Environmental Perception and Assistance for a Visually Impaired User",
    status: "Published",
    filedDate: "31 Jan 2026",
    publishedDate: "13 Feb 2026",
    abstract:
      "A real-time environmental perception and assistance system for visually impaired users, utilizing multi-modal edge perception sensors and signal processing for obstacle and context awareness.",
    technologies: [
      "Computer Vision",
      "Edge Processing",
      "Assistive Technology",
      "Perception Systems",
      "Signal Processing",
    ],
  },
];
