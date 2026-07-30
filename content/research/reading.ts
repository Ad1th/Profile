export type ReadingItem = {
  id: string;
  title: string;
  authors: string;
  topic: "Databases" | "Distributed Systems" | "LLMs & AI" | "Security" | "Operating Systems";
  status: "Reading" | "Completed" | "Notes Available";
  year: string;
  takeaway?: string;
  link?: string;
};

export const readingList: ReadingItem[] = [
  // DATABASES
  {
    id: "read-duckdb",
    title: "DuckDB: an Embeddable Analytical Database",
    authors: "Mark Raasveldt, Hannes Mühleisen",
    topic: "Databases",
    status: "Completed",
    year: "2019",
    takeaway: "Vectorized query execution algorithms for in-process OLAP engines.",
  },
  {
    id: "read-aqp",
    title: "BlinkDB: Queries with Bounded Errors and Bounded Response Times on Very Large Data",
    authors: "Sameer Agarwal et al. (UC Berkeley RISELab)",
    topic: "Databases",
    status: "Notes Available",
    year: "2013",
    takeaway: "Stratified sampling mechanisms for sub-second AQP error bounds.",
  },
  {
    id: "read-learned-opt",
    title: "Neo: A Learned Query Optimizer",
    authors: "Ryan Marcus et al. (MIT CSAIL)",
    topic: "Databases",
    status: "Reading",
    year: "2019",
    takeaway: "Deep reinforcement learning for relational query plan generation.",
  },

  // DISTRIBUTED SYSTEMS
  {
    id: "read-[#spanner]",
    title: "Spanner: Google's Globally-Distributed Database",
    authors: "James C. Corbett et al. (Google)",
    topic: "Distributed Systems",
    status: "Completed",
    year: "2012",
    takeaway: "External consistency and TrueTime API using synchronized atomic clocks.",
  },
  {
    id: "read-[#opentelemetry]",
    title: "Dapper, a Large-Scale Distributed Systems Tracing Infrastructure",
    authors: "Benjamin H. Sigelman et al. (Google)",
    topic: "Distributed Systems",
    status: "Completed",
    year: "2010",
    takeaway: "Low-overhead out-of-band trace collection in microservices.",
  },
  {
    id: "read-[#raft]",
    title: "In Search of an Understandable Consensus Algorithm (Raft)",
    authors: "Diego Ongaro, John Ousterhout (Stanford)",
    topic: "Distributed Systems",
    status: "Completed",
    year: "2014",
    takeaway: "Leader election and replicated log management for consensus.",
  },

  // LLMS & AI
  {
    id: "read-[#agent-eval]",
    title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
    authors: "Carlos E. Jimenez et al. (Princeton University)",
    topic: "LLMs & AI",
    status: "Notes Available",
    year: "2024",
    takeaway: "Rigorous execution-based evaluation for autonomous coding agents.",
  },
  {
    id: "read-[#text2sql-eval]",
    title: "BIRD: A Big Bench for Large-Scale Database Grounded Text-to-SQL Evaluation",
    authors: "Jinyang Li et al. (HKUST / Alibaba)",
    topic: "LLMs & AI",
    status: "Completed",
    year: "2023",
    takeaway: "Dirty database schemas and complex analytical query evaluation.",
  },

  // SECURITY
  {
    id: "read-[#toctou-paper]",
    title: "TOCTOU Race Conditions in File Systems and Agent Executions",
    authors: "Matt Bishop et al.",
    topic: "Security",
    status: "Reading",
    year: "2020",
    takeaway: "Asynchronous state mutation vulnerabilities during multi-step tool calls.",
  },
  {
    id: "read-[#prompt-inj]",
    title: "Not What You’ve Signed Up For: Compromising Real-World LLM-Integrated Applications",
    authors: "Sahil Abdelnabi et al. (CISPA)",
    topic: "Security",
    status: "Notes Available",
    year: "2023",
    takeaway: "Indirect prompt injection taxonomy in retrieval-connected AI workflows.",
  },

  // OPERATING SYSTEMS
  {
    id: "read-[#ebpf]",
    title: "BPF Performance Tools: Linux System and Application Observability",
    authors: "Brendan Gregg",
    topic: "Operating Systems",
    status: "Completed",
    year: "2019",
    takeaway: "In-kernel tracing, system call instrumentation, and zero-copy probes.",
  },
];
