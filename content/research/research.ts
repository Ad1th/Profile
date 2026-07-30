export type ResearchArea = {
  id: string;
  title: string;
  description: string;
  currentFocus: string[];
  color: "yellow" | "blue" | "green" | "purple" | "pink" | "orange";
};

export type ActiveResearchProject = {
  id: string;
  status: "Active Research" | "Early Research" | "Ongoing" | "Completed";
  title: string;
  shortDescription: string;
  currentStage: string;
  tags: string[];
  links?: { label: string; url: string }[];
  problem: string;
  motivation: string;
  approach: string;
  currentProgress: string;
  futureWork: string;
};

export const researchAreas: ResearchArea[] = [
  {
    id: "db-systems",
    title: "Database Systems",
    description:
      "Explorations in analytical query execution engines, approximate query processing (AQP), adaptive sampling, and columnar storage efficiency.",
    currentFocus: ["Approximate Query Processing", "Query Optimization", "Columnar Storage"],
    color: "blue",
  },
  {
    id: "ai-systems",
    title: "AI Systems & Security",
    description:
      "Investigating LLM agent security vulnerabilities, memory trust boundaries, prompt injection resilience, and trustworthy retrieval augmented generation.",
    currentFocus: ["LLM Security", "AI Agents", "Information Retrieval"],
    color: "purple",
  },
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    description:
      "Building high-concurrency event pipelines, distributed telemetry tracing, OpenTelemetry collectors, and failure resilient backend infrastructure.",
    currentFocus: ["Distributed Tracing", "Kubernetes Reliability", "High-Concurrency Queues"],
    color: "orange",
  },
  {
    id: "operating-systems",
    title: "Operating Systems & Kernel",
    description:
      "Analyzing TOCTOU race conditions, system call boundaries, edge compute sandboxing, and lightweight process isolation.",
    currentFocus: ["System Call Security", "TOCTOU Vulnerabilities", "Edge Sandboxing"],
    color: "green",
  },
  {
    id: "ml-analytics",
    title: "Machine Learning & Analytics",
    description:
      "Applying machine learning to time-series anomaly detection, industrial SCADA telemetry reduction, and computer vision medical screening.",
    currentFocus: ["Time Series Analytics", "SCADA Telemetry", "Computer Vision"],
    color: "pink",
  },
];

export const activeResearchProjects: ActiveResearchProject[] = [
  {
    id: "memory-trust-sql",
    status: "Active Research",
    title: "Memory Trust in Text-to-SQL Agents",
    shortDescription:
      "Evaluating state contamination, context persistence, and injection risks in conversational text-to-SQL agent pipelines.",
    currentStage: "Experimental Evaluation & Benchmark Suite",
    tags: ["AI Systems", "Text-to-SQL", "LLM Security", "Databases"],
    links: [
      { label: "Benchmark Code", url: "https://github.com/Ad1th" },
      { label: "Research Notes", url: "#" },
    ],
    problem:
      "Multi-turn text-to-SQL agents accumulate schema context and dynamic user state in memory buffers. Adversarial or ambiguous queries cause state pollution, leading to destructive query generation or sensitive table exposures.",
    motivation:
      "Enterprise database copilots rely on persistent conversation memory, yet current architectures lack isolated sandboxing for schema context vs user query state.",
    approach:
      "Building a deterministic evaluation harness that injects adversarial schema context into long-horizon text-to-SQL agent traces and measures semantic query drift and unauthorized data retrieval.",
    currentProgress:
      "Benchmark suite implemented with 400+ test cases evaluating memory pollution across multiple open-source text-to-SQL agent frameworks.",
    futureWork:
      "Formalizing a zero-trust memory boundary protocol for agentic database assistants.",
  },
  {
    id: "aqp-sampling",
    status: "Active Research",
    title: "Approximate Query Processing & Adaptive Sampling",
    shortDescription:
      "Sub-second analytical aggregation over multi-terabyte log streams using error-bounded adaptive sampling algorithms.",
    currentStage: "Prototype Engine & Benchmark Validation",
    tags: ["Database Systems", "AQP", "Adaptive Sampling", "DuckDB"],
    links: [
      { label: "AetherQuery Repo", url: "https://github.com/Ad1th/AetherQuery" },
    ],
    problem:
      "Exact SQL aggregation over massive multi-terabyte telemetry streams incurs prohibitive latency and compute costs during exploratory backend debugging.",
    motivation:
      "Developers require instant confidence intervals for trace metrics rather than waiting minutes for exact full-table scans.",
    approach:
      "Developing a dynamic stratified sampling layer integrated with columnar storage formats that continuously adjusts sample rates based on variance thresholds and query confidence boundaries.",
    currentProgress:
      "Prototype sampling engine achieving 15x-50x speedups with <2% relative error on aggregations over 50M log records.",
    futureWork:
      "Extending adaptive sampling to multi-table joins and sliding-window time series aggregates.",
  },
  {
    id: "toctou-ai-agents",
    status: "Early Research",
    title: "TOCTOU Vulnerabilities in AI Agents",
    shortDescription:
      "Investigating Time-of-Check to Time-of-Use race conditions in autonomous file-system and API-executing AI agents.",
    currentStage: "Vulnerability Taxonomy & PoC Exploits",
    tags: ["Cybersecurity", "AI Agents", "TOCTOU", "System Security"],
    problem:
      "AI agents inspect environment state (file permission, API token, filesystem path) at time T1, then execute actions at T2 based on LLM reasoning latency. The environment state can mutate asynchronously between T1 and T2.",
    motivation:
      "As AI agents receive file system and shell privileges, traditional TOCTOU security gaps become amplified by multi-second LLM inference delays.",
    approach:
      "Cataloging asynchronous state mutation patterns during agent tool calls and constructing proof-of-concept exploits that swap symlinks or permissions during agent decision windows.",
    currentProgress:
      "Identified 3 core TOCTOU vulnerability patterns in popular agent tool-calling runtimes.",
    futureWork:
      "Designing an atomic, transactional tool-call execution wrapper for secure agent runtimes.",
  },
  {
    id: "query-plan-intelligence",
    status: "Ongoing",
    title: "Database Query Plan Intelligence",
    shortDescription:
      "Machine-learning-assisted cost estimation and query execution plan optimization for non-stationary analytical workloads.",
    currentStage: "Data Collection & Cost Model Training",
    tags: ["Database Systems", "Query Optimization", "Machine Learning", "PostgreSQL"],
    links: [
      { label: "Argus Visualizer", url: "https://github.com/Ad1th/Argus" },
    ],
    problem:
      "Traditional heuristic query optimizers misestimate cardinalities when dealing with correlated predicates and skewed data distributions, resulting in suboptimal join orders.",
    motivation:
      "Learned query optimizers can adapt to data shifts, but require zero-overhead inference models to remain practical for production databases.",
    approach:
      "Training lightweight tree-based ensemble models on historical execution plan traces to predict operator runtime and refine cardinality bounds dynamically.",
    currentProgress:
      "Collected 100k+ plan traces across diverse synthetic and real-world database workloads using Argus telemetry tools.",
    futureWork:
      "Implementing real-time plan correction during active query execution.",
  },
];
