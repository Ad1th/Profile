export type TimelineMilestone = {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: "yellow" | "blue" | "green" | "purple" | "pink" | "orange";
};

export const researchTimeline: TimelineMilestone[] = [
  {
    id: "started-research",
    year: "2025",
    title: "Initiated Applied Systems & ML Research",
    subtitle: "VIT Vellore / Independent Exploration",
    description:
      "Began formal research into database query visualizers (Argus), time-series anomaly detection, and SCADA telemetry optimization.",
    badge: "RESEARCH START",
    badgeColor: "orange",
  },
  {
    id: "ieee-publication",
    year: "2026",
    title: "IEEE Publication (NeLeX 2026)",
    subtitle: "IEEE Xplore Conference Proceedings",
    description:
      "Published paper 'An Efficient Handcrafted Feature Driven Ensemble Learning Approach for Retinal Disease Screening' at NeLeX 2026 conference.",
    badge: "IEEE PAPER",
    badgeColor: "blue",
  },
  {
    id: "patent-published",
    year: "2026",
    title: "Dual Patent Publication",
    subtitle: "Indian Patent Office (Application Nos. 202641032830 & 202641010249)",
    description:
      "Published patents for Wave Energy Harvester MPPT IoT Telemetry and Real-Time Environmental Perception for Visually Impaired Users.",
    badge: "PATENTS FILED",
    badgeColor: "green",
  },
  {
    id: "iith-internship",
    year: "2026",
    title: "Research Internship",
    subtitle: "Indian Institute of Technology (IIT) Hyderabad",
    description:
      "Accepted competitive research role exploring high-performance systems engineering, distributed infrastructure, and hardware-software telemetry.",
    badge: "IIT HYDERABAD",
    badgeColor: "purple",
  },
  {
    id: "current-research",
    year: "CURRENT",
    title: "Advanced Database & AI Trust Systems",
    subtitle: "Digital Research Lab",
    description:
      "Active research in Text-to-SQL Agent Memory Pollution, Approximate Query Processing algorithms, and TOCTOU vulnerabilities in AI agent runtimes.",
    badge: "ACTIVE FOCUS",
    badgeColor: "yellow",
  },
];
