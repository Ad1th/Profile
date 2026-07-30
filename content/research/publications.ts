export type Publication = {
  id: string;
  status: "Published" | "Under Review" | "In Progress";
  title: string;
  authors: string[];
  venue: string;
  publisher?: string;
  date: string;
  abstract: string;
  links?: {
    paper?: string;
    slides?: string;
    poster?: string;
    code?: string;
  };
};

export const publications: Publication[] = [
  {
    id: "retinal-screening-nelex",
    status: "Published",
    title:
      "An Efficient Handcrafted Feature Driven Ensemble Learning Approach for Retinal Disease Screening",
    authors: ["Adith Manikonda", "Research Collaborators"],
    venue: "NeLeX 2026",
    publisher: "IEEE Xplore",
    date: "2026",
    abstract:
      "Presents a novel ensemble learning methodology combining handcrafted feature engineering with decision fusion algorithms for high-accuracy automated screening of retinal diseases in resource-constrained deployment environments.",
    links: {
      paper: "https://ieeexplore.ieee.org",
      slides: "#",
      code: "https://github.com/Ad1th",
    },
  },
  {
    id: "scada-wind-turbine",
    status: "Under Review",
    title: "Wind Turbine Fault Detection using SCADA Data",
    authors: ["Adith Manikonda", "Research Team"],
    venue: "IEEE Transactions on Industrial Informatics",
    publisher: "IEEE",
    date: "2026",
    abstract:
      "Introduces an anomaly detection framework for SCADA sensor telemetry from wind turbines, leveraging temporal feature extraction and dynamic thresholding to detect early component failures before catastrophic breakdown.",
    links: {
      poster: "#",
    },
  },
  {
    id: "adaptive-time-series",
    status: "Under Review",
    title:
      "Adaptive Threshold Based Time Series Data Reduction for Efficient Storage and Forecasting",
    authors: ["Adith Manikonda", "Co-Authors"],
    venue: "Data & Knowledge Engineering",
    publisher: "Elsevier",
    date: "2026",
    abstract:
      "Proposes an adaptive thresholding algorithm for lossy compression of high-frequency time-series IoT data streams, preserving key trend inflection points while achieving up to 80% reduction in storage footprint with minimal forecasting error impact.",
    links: {
      slides: "#",
    },
  },
  {
    id: "digital-twin-manufacturing",
    status: "In Progress",
    title: "Digital Twin for Smart Manufacturing",
    authors: ["Adith Manikonda", "Systems Group"],
    venue: "Industrial Automation & Systems Engineering",
    date: "2026",
    abstract:
      "Developing a real-time digital twin system architecture combining edge sensor streams, physical system simulation, and predictive maintenance models for smart manufacturing operations.",
  },
];
