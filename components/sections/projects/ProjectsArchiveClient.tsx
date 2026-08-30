"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Project, Patent, projects as allProjects, patents as allPatents } from "@/lib/seo-data";

type ViewMode = "grid" | "table";

const COLOR_MAP: Record<string, { bg: string; text: string; badge: string }> = {
  orange: { bg: "bg-[#FF5722]", text: "text-black", badge: "bg-[#111] text-[#FF5722]" },
  blue: { bg: "bg-[#00E5FF]", text: "text-black", badge: "bg-[#111] text-[#00E5FF]" },
  purple: { bg: "bg-[#A855F7]", text: "text-white", badge: "bg-[#111] text-[#A855F7]" },
  yellow: { bg: "bg-[#FFE600]", text: "text-black", badge: "bg-[#111] text-[#FFE600]" },
  pink: { bg: "bg-[#FF2A85]", text: "text-white", badge: "bg-[#111] text-[#FF2A85]" },
  green: { bg: "bg-[#00E676]", text: "text-black", badge: "bg-[#111] text-[#00E676]" },
  white: { bg: "bg-[#FFFDF5]", text: "text-black", badge: "bg-[#111] text-white" },
};

const CATEGORIES = [
  "ALL",
  "FEATURED",
  "Systems / Backend",
  "AI & ML",
  "CLI & Tools",
  "Web Apps",
  "IoT / Hardware",
  "PATENTS",
] as const;

export default function ProjectsArchiveClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeModalPatent, setActiveModalPatent] = useState<Patent | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Extract all unique technologies
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category match
      if (selectedCategory === "FEATURED" && !project.featured) return false;
      if (
        selectedCategory !== "ALL" &&
        selectedCategory !== "FEATURED" &&
        selectedCategory !== "PATENTS" &&
        project.category !== selectedCategory
      ) {
        return false;
      }

      // Tech match
      if (selectedTech && !project.technologies.includes(selectedTech)) {
        return false;
      }

      // Search query match
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesDesc = project.description.toLowerCase().includes(q);
        const matchesPurpose = project.purpose.toLowerCase().includes(q);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(q));
        const matchesYear = project.year.includes(q);
        return matchesTitle || matchesDesc || matchesPurpose || matchesTech || matchesYear;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTech]);

  // Filter patents
  const filteredPatents = useMemo(() => {
    if (selectedCategory !== "ALL" && selectedCategory !== "PATENTS") return [];
    if (selectedTech) {
      return allPatents.filter((patent) =>
        patent.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase())
      );
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return allPatents.filter(
        (patent) =>
          patent.title.toLowerCase().includes(q) ||
          patent.abstract.toLowerCase().includes(q) ||
          patent.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    return allPatents;
  }, [searchQuery, selectedCategory, selectedTech]);

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/projects/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#EEE7DC] text-[#111111] pt-24 pb-20 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#FFE600] selection:text-black">
      {/* BREADCRUMB HEADER LINK */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between font-mono text-xs font-bold">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#111] hover:text-[#FF2A85] transition-colors font-black uppercase text-sm"
        >
          <span>←</span> PORTFOLIO HOME
        </Link>

        <span className="text-[#111]/60 uppercase tracking-widest">
          ADITH.XYZ / PROJECTS ARCHIVE
        </span>
      </div>

      {/* NEO-BRUTALIST TICKER MARQUEE */}
      <div className="w-full bg-[#FFE600] border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_#111111] overflow-hidden py-2 mb-10 transform -rotate-1">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-sm font-black tracking-wider uppercase">
          <span className="mx-4">⚡ 19 SYSTEMS & SOFTWARE PROJECTS</span>
          <span className="mx-4">•</span>
          <span className="mx-4">📜 2 FILED & PUBLISHED PATENTS</span>
          <span className="mx-4">•</span>
          <span className="mx-4">🚀 NODE.JS • FASTAPI • GOLANG • DUCKDB • KUBERNETES</span>
          <span className="mx-4">•</span>
          <span className="mx-4">⚡ 19 SYSTEMS & SOFTWARE PROJECTS</span>
          <span className="mx-4">•</span>
          <span className="mx-4">📜 2 FILED & PUBLISHED PATENTS</span>
          <span className="mx-4">•</span>
          <span className="mx-4">🚀 NODE.js • FASTAPI • GOLANG • DUCKDB • KUBERNETES</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* HERO HEADER */}
        <header className="relative bg-[#FFFDF5] border-4 border-[#111111] p-6 sm:p-10 shadow-[10px_10px_0px_0px_#111111]">
          <div className="absolute -top-4 -right-4 bg-[#FF5722] text-white border-2 border-[#111111] font-mono text-xs font-bold px-4 py-1 rotate-3 shadow-[3px_3px_0px_0px_#111111]">
            ADITH.XYZ / PROJECTS
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Link
                  href="/"
                  className="bg-[#111] text-[#FFE600] border-2 border-[#111] px-2.5 py-1 text-xs font-mono font-bold uppercase hover:bg-[#FFE600] hover:text-black"
                >
                  ← BACK HOME
                </Link>
                <div className="bg-[#00E5FF] border-2 border-[#111111] px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_#111111]">
                  COMPLETE ARCHIVE & CODEBASES
                </div>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-[#111111]">
                PROJECTS <span className="text-[#FF2A85]">&</span> PATENTS
              </h1>
              <p className="mt-4 max-w-2xl font-mono text-sm sm:text-base text-[#111111]/90 font-medium leading-relaxed">
                Explore 19 custom-built backend engines, high-concurrency systems, CLI tools, ML evaluation tools, IoT energy harvesters, and published patents.
              </p>
            </div>

            {/* QUICK STATS STICKERS */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="bg-[#FFE600] border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111]">
                <div className="text-2xl sm:text-3xl font-black">{allProjects.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider">Projects</div>
              </div>
              <div className="bg-[#00E676] border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111]">
                <div className="text-2xl sm:text-3xl font-black">{allPatents.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider">Patents</div>
              </div>
              <div className="bg-[#A855F7] text-white border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111]">
                <div className="text-2xl sm:text-3xl font-black">
                  {allProjects.filter((p) => p.github).length}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider">Open Source</div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTROLS BAR: SEARCH, FILTERS & VIEW MODE */}
        <div className="bg-[#FFFDF5] border-4 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] space-y-6">
          {/* SEARCH & VIEW TOGGLE */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch">
            {/* SEARCH INPUT */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="SEARCH PROJECTS BY NAME, TECH STACK, OR KEYWORD..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#EEE7DC] border-3 border-[#111111] px-4 py-3 font-mono text-sm font-bold text-[#111111] placeholder-[#111111]/50 focus:bg-white focus:shadow-[4px_4px_0px_0px_#111111] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#FF2A85] text-white border border-[#111] px-2 py-0.5 text-xs font-mono font-bold hover:bg-[#111]"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* VIEW MODE TOGGLE */}
            <div className="flex items-center gap-2 border-3 border-[#111111] p-1 bg-[#EEE7DC]">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase border-2 transition-[transform,box-shadow,background-color,border-color,color,opacity] ${
                  viewMode === "grid"
                    ? "bg-[#FFE600] border-[#111111] shadow-[2px_2px_0px_0px_#111111]"
                    : "bg-transparent border-transparent hover:bg-white/50"
                }`}
              >
                🔲 GRID VIEW
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase border-2 transition-[transform,box-shadow,background-color,border-color,color,opacity] ${
                  viewMode === "table"
                    ? "bg-[#00E5FF] border-[#111111] shadow-[2px_2px_0px_0px_#111111]"
                    : "bg-transparent border-transparent hover:bg-white/50"
                }`}
              >
                📑 TABLE VIEW
              </button>
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-[#111111]">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider border-2 border-[#111111] transition-[transform,box-shadow,background-color,border-color,color,opacity] ${
                    isActive
                      ? "bg-[#111111] text-[#FFE600] shadow-[3px_3px_0px_0px_#FF2A85] -translate-y-0.5"
                      : "bg-[#FFFDF5] text-[#111111] hover:bg-[#FFE600] hover:shadow-[2px_2px_0px_0px_#111111]"
                  }`}
                >
                  {cat === "ALL"
                    ? `ALL (${allProjects.length})`
                    : cat === "PATENTS"
                    ? `PATENTS (${allPatents.length})`
                    : cat}
                </button>
              );
            })}
          </div>

          {/* TECH CHIPS FILTER */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="font-bold uppercase text-[#111]/70 mr-1">Filter by Tech:</span>
            {selectedTech && (
              <button
                onClick={() => setSelectedTech(null)}
                className="bg-[#FF2A85] text-white border-2 border-[#111] px-2 py-0.5 font-bold hover:bg-[#111]"
              >
                ✕ RESET ({selectedTech})
              </button>
            )}
            {["Golang", "FastAPI", "Node.js", "Python", "Kubernetes", "PostgreSQL", "DuckDB", "Machine Learning", "IoT", "React", "Next.js"].map((tech) => {
              const isSelected = selectedTech === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(isSelected ? null : tech)}
                  className={`border-2 border-[#111111] px-2.5 py-1 font-bold transition-[transform,box-shadow,background-color,border-color,color,opacity] ${
                    isSelected
                      ? "bg-[#00E5FF] text-black shadow-[2px_2px_0px_0px_#111111]"
                      : "bg-[#EEE7DC] text-[#111111] hover:bg-white"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS SUMMARY BAR */}
        <div className="flex items-center justify-between font-mono text-xs font-bold uppercase border-b-3 border-[#111111] pb-2">
          <div>
            SHOWING <span className="text-[#FF2A85] font-black">{filteredProjects.length}</span> PROJECTS
            {filteredPatents.length > 0 && (
              <span> & <span className="text-[#00E676] font-black">{filteredPatents.length}</span> PATENTS</span>
            )}
          </div>
          {(selectedCategory !== "ALL" || selectedTech || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedTech(null);
                setSearchQuery("");
              }}
              className="underline hover:text-[#FF2A85]"
            >
              RESET ALL FILTERS
            </button>
          )}
        </div>

        {/* PATENTS HIGHLIGHT SECTION (WHEN PATENTS CATEGORY OR ALL IS SELECTED) */}
        {(selectedCategory === "ALL" || selectedCategory === "PATENTS") && filteredPatents.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#00E676] text-black border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
                INTELLECTUAL PROPERTY
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#111]">FILED PATENTS ({filteredPatents.length})</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredPatents.map((patent) => (
                <div
                  key={patent.slug}
                  className="bg-[#FFFDF5] border-4 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] relative flex flex-col justify-between hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#111111] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
                >
                  <div className="absolute -top-3 right-4 bg-[#FFE600] text-black border-2 border-[#111] font-mono text-[10px] font-black px-3 py-0.5 shadow-[2px_2px_0px_0px_#111] uppercase">
                    APP NO: {patent.application}
                  </div>

                  <div>
                    <div className="font-mono text-xs font-bold text-[#FF5722] mb-1">
                      FILED: {patent.filed} | PUBLISHED: {patent.published}
                    </div>
                    <h3 className="text-xl font-black uppercase text-[#111] leading-snug">
                      {patent.title}
                    </h3>
                    <p className="mt-3 font-mono text-xs text-[#111]/85 leading-relaxed bg-[#EEE7DC] p-3 border-2 border-[#111]">
                      {patent.abstract}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t-2 border-[#111] flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {patent.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#00E676] text-black border border-[#111] font-mono text-[10px] font-bold px-2 py-0.5 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveModalPatent(patent)}
                      className="bg-[#111] text-white border-2 border-[#111] font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_0px_#00E676] hover:bg-[#00E676] hover:text-black transition-[transform,box-shadow,background-color,border-color,color,opacity]"
                    >
                      VIEW ABSTRACT ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS SECTION: GRID VIEW */}
        {viewMode === "grid" ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const theme = COLOR_MAP[project.paperColor || "white"];
              return (
                <article
                  key={project.slug}
                  className={`border-4 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] flex flex-col justify-between hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[14px_14px_0px_0px_#111111] transition-[transform,box-shadow,background-color,border-color,color,opacity] bg-[#FFFDF5] relative group`}
                >
                  {/* FEATURED / CATEGORY BADGE */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black border-2 border-[#111] px-2.5 py-0.5 bg-[#EEE7DC]">
                      {project.year}
                    </span>
                    <span className={`font-mono text-[10px] font-black border-2 border-[#111] px-2 py-0.5 uppercase shadow-[2px_2px_0px_0px_#111] ${theme.bg} ${theme.text}`}>
                      {project.category || "ENGINEERING"}
                    </span>
                  </div>

                  {/* HEADER & TITLE */}
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#111] group-hover:text-[#FF2A85] transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm text-[#111]/90 font-medium leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* TECH STACK CHIPS */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#EEE7DC] text-[#111] border border-[#111] font-mono text-[10px] font-bold px-2 py-0.5 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="pt-4 border-t-3 border-[#111111] flex items-center justify-between gap-2 font-mono text-xs font-bold">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#111111] text-[#FFE600] border-2 border-[#111111] px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] hover:bg-[#FFE600] hover:text-[#111] transition-[transform,box-shadow,background-color,border-color,color,opacity] flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          CODE ➔
                        </a>
                      ) : (
                        <span className="text-[#111]/50 font-mono text-[10px] uppercase font-bold italic">
                          PROPRIETARY / RESEARCH
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="bg-[#00E5FF] text-black border-2 border-[#111] px-2.5 py-1.5 shadow-[2px_2px_0px_0px_#111] hover:bg-white transition-[transform,box-shadow,background-color,border-color,color,opacity]"
                          title="Quick inspect project specifications"
                        >
                          INSPECT
                        </button>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="bg-[#FF2A85] text-white border-2 border-[#111] px-2.5 py-1.5 shadow-[2px_2px_0px_0px_#111] hover:bg-[#111] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
                          title="View full project page"
                        >
                          PAGE
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* PROJECTS SECTION: BRUTALIST TERMINAL TABLE VIEW */
          <div className="bg-[#FFFDF5] border-4 border-[#111111] p-4 sm:p-6 shadow-[10px_10px_0px_0px_#111111] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b-4 border-[#111111] bg-[#FFE600] text-black uppercase font-black text-sm">
                  <th className="p-3 border-r-2 border-[#111]">YEAR</th>
                  <th className="p-3 border-r-2 border-[#111]">PROJECT NAME</th>
                  <th className="p-3 border-r-2 border-[#111]">CATEGORY</th>
                  <th className="p-3 border-r-2 border-[#111]">TECH STACK</th>
                  <th className="p-3 border-r-2 border-[#111]">DESCRIPTION</th>
                  <th className="p-3 text-right">LINKS</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#111111]">
                {filteredProjects.map((project) => (
                  <tr key={project.slug} className="hover:bg-[#EEE7DC] transition-colors">
                    <td className="p-3 font-bold border-r-2 border-[#111] whitespace-nowrap">
                      {project.year}
                    </td>
                    <td className="p-3 font-black text-sm uppercase border-r-2 border-[#111] text-[#FF2A85] whitespace-nowrap">
                      {project.title}
                    </td>
                    <td className="p-3 font-bold border-r-2 border-[#111] whitespace-nowrap">
                      <span className="bg-[#111] text-white px-2 py-0.5 text-[10px]">
                        {project.category || "ENGINEERING"}
                      </span>
                    </td>
                    <td className="p-3 border-r-2 border-[#111]">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.technologies.map((t) => (
                          <span key={t} className="bg-white border border-[#111] px-1.5 py-0.5 text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 border-r-2 border-[#111] max-w-md font-sans text-xs">
                      {project.description}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#111] text-[#FFE600] px-2 py-1 border border-[#111] font-bold text-[10px] hover:bg-[#FFE600] hover:text-black"
                          >
                            GITHUB ➔
                          </a>
                        )}
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="bg-[#00E5FF] text-black px-2 py-1 border border-[#111] font-bold text-[10px] hover:bg-white"
                        >
                          INFO
                        </button>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="bg-[#FF2A85] text-white px-2 py-1 border border-[#111] font-bold text-[10px] hover:bg-[#111]"
                        >
                          PAGE ➔
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProjects.length === 0 && filteredPatents.length === 0 && (
          <div className="bg-[#FFFDF5] border-4 border-[#111111] p-12 text-center shadow-[8px_8px_0px_0px_#111111]">
            <div className="font-mono text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-black uppercase text-[#111]">NO MATCHING PROJECTS FOUND</h3>
            <p className="mt-2 font-mono text-sm text-[#111]/70">
              Try broadening your search query or resetting active technology filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedTech(null);
                setSearchQuery("");
              }}
              className="mt-6 bg-[#FFE600] text-black border-3 border-[#111111] px-6 py-2.5 font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#111] hover:bg-[#111] hover:text-white transition-[transform,box-shadow,background-color,border-color,color,opacity]"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}

        {/* BOTTOM RETURN TO MAIN SITE BANNER */}
        <footer className="mt-16 bg-[#FFFDF5] border-4 border-[#111111] p-8 shadow-[10px_10px_0px_0px_#111111] text-center flex flex-col items-center gap-4">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111]">
            FINISHED EXPLORING PROJECTS?
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#111]/80 max-w-md">
            Return to the main portfolio website to inspect experience history, patents, hackathon achievements, and contact details.
          </p>
          <Link
            href="/"
            className="bg-[#FFE600] text-black border-3 border-[#111111] px-8 py-3.5 font-mono text-sm font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_#111111] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#FF2A85] hover:bg-[#111111] hover:text-[#FFE600] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
          >
            ← BACK TO MAIN PORTFOLIO SITE (HOME)
          </Link>
        </footer>
      </div>

      {/* PROJECT INSPECTION MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFDF5] border-4 border-[#111111] p-6 sm:p-8 max-w-2xl w-full shadow-[16px_16px_0px_0px_#FFE600] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 bg-[#FF2A85] text-white border-2 border-[#111] px-3 py-1 font-mono text-xs font-black hover:bg-[#111]"
            >
              ✕ CLOSE [ESC]
            </button>

            <div className="inline-block bg-[#00E5FF] border-2 border-[#111] px-2.5 py-0.5 font-mono text-xs font-bold uppercase mb-2">
              PROJECT DEEP DIVE // {activeModalProject.year}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#111] leading-tight">
              {activeModalProject.title}
            </h2>

            <div className="mt-4 p-4 bg-[#EEE7DC] border-2 border-[#111] space-y-3 font-mono text-xs">
              <div>
                <strong className="text-[#FF5722] uppercase block mb-0.5">Overview:</strong>
                <p className="font-sans text-sm text-[#111]/90">{activeModalProject.description}</p>
              </div>
              <div>
                <strong className="text-[#A855F7] uppercase block mb-0.5">Architectural Purpose:</strong>
                <p className="font-sans text-sm text-[#111]/90">{activeModalProject.purpose}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <h4 className="font-mono text-xs font-black uppercase text-[#111]">TECHNOLOGY STACK & TOOLS:</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.technologies.map((t) => (
                  <span key={t} className="bg-[#FFE600] text-black border-2 border-[#111] font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-3 border-[#111] flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold">
              {activeModalProject.github ? (
                <a
                  href={activeModalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#111] text-[#FFE600] border-2 border-[#111] px-4 py-2 shadow-[3px_3px_0px_0px_#FF2A85] hover:bg-[#FFE600] hover:text-black transition-[transform,box-shadow,background-color,border-color,color,opacity] flex items-center gap-2"
                >
                  VIEW GITHUB REPOSITORY ➔
                </a>
              ) : (
                <span className="text-[#111]/60 italic font-mono text-xs">Repository Private / Patent Protected</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(activeModalProject.slug)}
                  className="bg-[#EEE7DC] text-black border-2 border-[#111] px-3 py-2 hover:bg-white"
                >
                  {copiedSlug === activeModalProject.slug ? "✓ COPIED!" : "📋 SHARE LINK"}
                </button>
                <Link
                  href={`/projects/${activeModalProject.slug}`}
                  className="bg-[#FF2A85] text-white border-2 border-[#111] px-4 py-2 shadow-[3px_3px_0px_0px_#111] hover:bg-[#111]"
                >
                  FULL PAGE ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PATENT MODAL */}
      {activeModalPatent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFDF5] border-4 border-[#111111] p-6 sm:p-8 max-w-2xl w-full shadow-[16px_16px_0px_0px_#00E676] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalPatent(null)}
              className="absolute top-4 right-4 bg-[#FF2A85] text-white border-2 border-[#111] px-3 py-1 font-mono text-xs font-black hover:bg-[#111]"
            >
              ✕ CLOSE [ESC]
            </button>

            <div className="inline-block bg-[#00E676] text-black border-2 border-[#111] px-2.5 py-0.5 font-mono text-xs font-bold uppercase mb-2">
              PATENT SPECIFICATION // APP: {activeModalPatent.application}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#111] leading-tight">
              {activeModalPatent.title}
            </h2>

            <div className="mt-4 p-4 bg-[#EEE7DC] border-2 border-[#111] space-y-3 font-mono text-xs">
              <div>
                <strong className="text-[#FF5722] uppercase block mb-1">Official Abstract:</strong>
                <p className="font-sans text-sm text-[#111]/90 leading-relaxed">{activeModalPatent.abstract}</p>
              </div>
              <div>
                <strong className="text-[#00E5FF] uppercase block mb-1">Summary & Claims:</strong>
                <p className="font-sans text-sm text-[#111]/90 leading-relaxed">{activeModalPatent.summary}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {activeModalPatent.technologies.map((t) => (
                <span key={t} className="bg-[#00E676] text-black border-2 border-[#111] font-mono text-xs font-bold px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t-3 border-[#111] flex justify-between items-center font-mono text-xs font-bold">
              <span className="text-[#111]/70">FILED: {activeModalPatent.filed} | PUBLISHED: {activeModalPatent.published}</span>
              <button
                onClick={() => setActiveModalPatent(null)}
                className="bg-[#111] text-white border-2 border-[#111] px-4 py-2 hover:bg-[#FFE600] hover:text-black"
              >
                DONE ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
