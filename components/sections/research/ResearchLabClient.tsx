"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  researchAreas,
  activeResearchProjects,
  ActiveResearchProject,
  publications,
  Publication,
  patents,
  ResearchPatent,
  readingList,
  ReadingItem,
  researchTimeline,
} from "@/content/research";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const totalFrames = 40;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(value * (1 - Math.pow(1 - progress, 3)));
      setCount(current);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setCount(value);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const COLOR_STYLES: Record<string, { bg: string; text: string; badge: string }> = {
  blue: { bg: "bg-[#00E5FF]", text: "text-black", badge: "bg-[#111] text-[#00E5FF]" },
  purple: { bg: "bg-[#A855F7]", text: "text-white", badge: "bg-[#111] text-[#A855F7]" },
  orange: { bg: "bg-[#FF5722]", text: "text-white", badge: "bg-[#111] text-[#FF5722]" },
  green: { bg: "bg-[#00E676]", text: "text-black", badge: "bg-[#111] text-[#00E676]" },
  pink: { bg: "bg-[#FF2A85]", text: "text-white", badge: "bg-[#111] text-[#FF2A85]" },
  yellow: { bg: "bg-[#FFE600]", text: "text-black", badge: "bg-[#111] text-[#FFE600]" },
};

export default function ResearchLabClient() {
  const [expandedProject, setExpandedProject] = useState<string | null>("memory-trust-sql");
  const [expandedAbstract, setExpandedAbstract] = useState<string | null>(null);
  const [selectedReadingTopic, setSelectedReadingTopic] = useState<string>("ALL");

  const readingTopics = ["ALL", "Databases", "Distributed Systems", "LLMs & AI", "Security", "Operating Systems"];

  const filteredReading = selectedReadingTopic === "ALL"
    ? readingList
    : readingList.filter((item) => item.topic === selectedReadingTopic);

  return (
    <div className="min-h-screen bg-[#EEE7DC] text-[#111111] pt-24 pb-20 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#FFE600] selection:text-black">
      {/* TOP HEADER BREADCRUMB */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between font-mono text-xs font-bold">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#111] hover:text-[#FF2A85] transition-colors font-black uppercase text-sm"
        >
          <span>←</span> PORTFOLIO HOME
        </Link>
        <span className="bg-[#111] text-[#FFE600] px-3 py-1 border border-[#111] uppercase tracking-widest font-black">
          ADITH.XYZ / DIGITAL RESEARCH LAB
        </span>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <header className="relative bg-[#FFFDF5] border-4 border-[#111111] p-6 sm:p-12 shadow-[12px_12px_0px_0px_#111111]">
          <div className="absolute -top-4 right-6 bg-[#00E5FF] text-black border-2 border-[#111111] font-mono text-xs font-black px-4 py-1.5 rotate-2 shadow-[3px_3px_0px_0px_#111111]">
            SYSTEMS & AI RESEARCH LAB
          </div>

          <div className="max-w-4xl">
            <div className="inline-block bg-[#FFE600] border-2 border-[#111111] px-3 py-1 text-xs font-mono font-black uppercase tracking-widest mb-4 shadow-[2px_2px_0px_0px_#111111]">
              IIT HYDERABAD INTERN • SYSTEMS & SECURITY RESEARCH
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none text-[#111111]">
              RESEARCH
            </h1>

            <p className="mt-6 text-base sm:text-xl font-mono text-[#111111]/90 font-medium leading-relaxed max-w-3xl border-l-4 border-[#FF2A85] pl-4">
              Exploring database systems, trustworthy AI, distributed systems, cybersecurity and machine learning through research, publications and experimental systems.
            </p>
          </div>

          {/* ANIMATED STATS COUNTERS */}
          <div className="mt-10 pt-8 border-t-3 border-[#111111] grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-center">
            <div className="bg-[#FFE600] border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111]">
              <div className="text-3xl sm:text-4xl font-black">
                <AnimatedCounter value={researchAreas.length} />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Research Areas</div>
            </div>
            <div className="bg-[#00E5FF] border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111]">
              <div className="text-3xl sm:text-4xl font-black">
                <AnimatedCounter value={activeResearchProjects.length} />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Active Projects</div>
            </div>
            <div className="bg-[#FF2A85] text-white border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111]">
              <div className="text-3xl sm:text-4xl font-black">
                <AnimatedCounter value={publications.length} />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Publications</div>
            </div>
            <div className="bg-[#00E676] border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111]">
              <div className="text-3xl sm:text-4xl font-black">
                <AnimatedCounter value={patents.length} />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Patents</div>
            </div>
            <div className="bg-[#A855F7] text-white border-2 border-[#111111] p-3 shadow-[3px_3px_0px_0px_#111111] col-span-2 sm:col-span-1">
              <div className="text-3xl sm:text-4xl font-black">
                <AnimatedCounter value={2} suffix="+" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">Years Active</div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 1: RESEARCH AREAS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#111] text-[#FFE600] border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#FF2A85]">
              SECTION 01
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111]">
              RESEARCH AREAS
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => {
              const theme = COLOR_STYLES[area.color];
              return (
                <motion.div
                  key={area.id}
                  whileHover={{ y: -6, x: -3 }}
                  className="bg-[#FFFDF5] border-4 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] flex flex-col justify-between relative group transition-[transform,box-shadow,background-color,border-color,color,opacity]"
                >
                  <div className="absolute top-4 right-4 font-mono text-[10px] font-black border-2 border-[#111] px-2 py-0.5 uppercase bg-[#EEE7DC]">
                    {area.id}
                  </div>

                  <div>
                    <div className={`inline-block px-3 py-1 font-mono text-xs font-black uppercase border-2 border-[#111] mb-3 shadow-[2px_2px_0px_0px_#111] ${theme.bg} ${theme.text}`}>
                      {area.title}
                    </div>
                    <p className="mt-2 font-sans text-sm text-[#111]/90 font-medium leading-relaxed">
                      {area.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t-2 border-[#111111]">
                    <div className="font-mono text-[10px] font-black uppercase text-[#FF5722] mb-2">CURRENT FOCUS:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {area.currentFocus.map((item) => (
                        <span
                          key={item}
                          className="bg-[#EEE7DC] text-[#111] border border-[#111] font-mono text-[10px] font-bold px-2 py-0.5 uppercase"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: ACTIVE RESEARCH (MAIN SECTION - VERTICAL TIMELINE / FEED) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#FF2A85] text-white border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
                SECTION 02
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111]">
                ACTIVE RESEARCH & EXPERIMENTAL SYSTEMS
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-[#111]/70 bg-[#FFFDF5] px-3 py-1 border-2 border-[#111]">
              CLICK ANY PROJECT TO EXPAND SPECIFICATIONS
            </span>
          </div>

          <div className="space-y-6">
            {activeResearchProjects.map((project) => {
              const isExpanded = expandedProject === project.id;
              const statusColor =
                project.status === "Active Research"
                  ? "bg-[#FFE600] text-black"
                  : project.status === "Early Research"
                  ? "bg-[#00E5FF] text-black"
                  : "bg-[#00E676] text-black";

              return (
                <div
                  key={project.id}
                  className="bg-[#FFFDF5] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
                >
                  {/* PROJECT HEADER CARD (CLICKABLE) */}
                  <div
                    onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                    className="p-6 cursor-pointer hover:bg-[#EEE7DC]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-mono text-xs font-black border-2 border-[#111] px-2.5 py-0.5 uppercase shadow-[2px_2px_0px_0px_#111] ${statusColor}`}>
                          {project.status}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#FF5722] bg-[#EEE7DC] px-2 py-0.5 border border-[#111]">
                          STAGE: {project.currentStage}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#111] leading-tight">
                        {project.title}
                      </h3>

                      <p className="font-sans text-sm text-[#111]/90 font-medium max-w-3xl">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#EEE7DC] text-[#111] border border-[#111] font-mono text-[10px] font-bold px-2 py-0.5 uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="bg-[#111] text-[#FFE600] border-2 border-[#111] font-mono text-xs font-black px-4 py-2 shadow-[2px_2px_0px_0px_#FF2A85] hover:bg-[#FFE600] hover:text-black transition-[transform,box-shadow,background-color,border-color,color,opacity] whitespace-nowrap"
                      >
                        {isExpanded ? "▲ COLLAPSE" : "▼ EXPAND SPECS"}
                      </button>
                    </div>
                  </div>

                  {/* EXPANDED DETAILS DRAWER */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t-4 border-[#111111] bg-[#EEE7DC] p-6 sm:p-8 space-y-6"
                      >
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="bg-[#FFFDF5] border-3 border-[#111111] p-5 shadow-[4px_4px_0px_0px_#111111]">
                            <h4 className="font-mono text-xs font-black uppercase text-[#FF5722] mb-2">01. PROBLEM STATEMENT:</h4>
                            <p className="font-sans text-sm text-[#111]/90 leading-relaxed font-medium">
                              {project.problem}
                            </p>
                          </div>

                          <div className="bg-[#FFFDF5] border-3 border-[#111111] p-5 shadow-[4px_4px_0px_0px_#111111]">
                            <h4 className="font-mono text-xs font-black uppercase text-[#00E5FF] text-black mb-2">02. MOTIVATION:</h4>
                            <p className="font-sans text-sm text-[#111]/90 leading-relaxed font-medium">
                              {project.motivation}
                            </p>
                          </div>

                          <div className="bg-[#FFFDF5] border-3 border-[#111111] p-5 shadow-[4px_4px_0px_0px_#111111]">
                            <h4 className="font-mono text-xs font-black uppercase text-[#A855F7] mb-2">03. TECHNICAL APPROACH:</h4>
                            <p className="font-sans text-sm text-[#111]/90 leading-relaxed font-medium">
                              {project.approach}
                            </p>
                          </div>

                          <div className="bg-[#FFFDF5] border-3 border-[#111111] p-5 shadow-[4px_4px_0px_0px_#111111]">
                            <h4 className="font-mono text-xs font-black uppercase text-[#00E676] text-black mb-2">04. CURRENT PROGRESS:</h4>
                            <p className="font-sans text-sm text-[#111]/90 leading-relaxed font-medium">
                              {project.currentProgress}
                            </p>
                          </div>
                        </div>

                        <div className="bg-[#FFE600] border-3 border-[#111111] p-5 shadow-[4px_4px_0px_0px_#111111] text-black">
                          <h4 className="font-mono text-xs font-black uppercase mb-1">05. FUTURE WORK & NEXT MILESTONES:</h4>
                          <p className="font-sans text-sm font-medium leading-relaxed">{project.futureWork}</p>
                        </div>

                        {project.links && project.links.length > 0 && (
                          <div className="flex items-center gap-3 pt-2 font-mono text-xs font-bold">
                            <span className="uppercase text-[#111]/70">PROJECT REPOSITORIES & NOTES:</span>
                            {project.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#111] text-[#FFE600] border border-[#111] px-3 py-1.5 hover:bg-[#FF2A85] hover:text-white transition-colors"
                              >
                                {link.label} ➔
                              </a>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: PUBLICATIONS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#00E676] text-black border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
              SECTION 03
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111]">
              PUBLICATIONS & MANUSCRIPTS
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {publications.map((pub) => {
              const isAbstractOpen = expandedAbstract === pub.id;
              const statusBadge =
                pub.status === "Published"
                  ? "bg-[#00E676] text-black"
                  : pub.status === "Under Review"
                  ? "bg-[#FFE600] text-black"
                  : "bg-[#00E5FF] text-black";

              return (
                <div
                  key={pub.id}
                  className="bg-[#FFFDF5] border-4 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] flex flex-col justify-between hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#111111] transition-[transform,box-shadow,background-color,border-color,color,opacity] relative"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className={`font-mono text-xs font-black border-2 border-[#111] px-2.5 py-0.5 uppercase shadow-[2px_2px_0px_0px_#111] ${statusBadge}`}>
                        {pub.status}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#111]/70 bg-[#EEE7DC] px-2 py-0.5 border border-[#111]">
                        {pub.date}
                      </span>
                    </div>

                    <div className="font-mono text-xs font-bold text-[#FF5722] uppercase tracking-wider mb-1">
                      {pub.venue} {pub.publisher ? `• ${pub.publisher}` : ""}
                    </div>

                    <h3 className="text-xl font-black uppercase text-[#111] leading-snug">
                      {pub.title}
                    </h3>

                    <p className="mt-2 font-mono text-xs font-bold text-[#111]/80">
                      Authors: {pub.authors.join(", ")}
                    </p>

                    {/* COLLAPSIBLE ABSTRACT */}
                    <div className="mt-4">
                      <button
                        onClick={() => setExpandedAbstract(isAbstractOpen ? null : pub.id)}
                        className="font-mono text-xs font-bold underline text-[#FF2A85] hover:text-[#111]"
                      >
                        {isAbstractOpen ? "Hide Abstract ▲" : "Read Abstract ▼"}
                      </button>

                      {isAbstractOpen && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 font-sans text-xs font-medium text-[#111]/90 bg-[#EEE7DC] p-3 border-2 border-[#111] leading-relaxed"
                        >
                          {pub.abstract}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* LINKS */}
                  <div className="mt-6 pt-4 border-t-2 border-[#111] flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
                    {pub.links?.paper && (
                      <a
                        href={pub.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#111] text-[#FFE600] border border-[#111] px-3 py-1 hover:bg-[#FFE600] hover:text-black"
                      >
                        📄 PAPER ➔
                      </a>
                    )}
                    {pub.links?.code && (
                      <a
                        href={pub.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#00E5FF] text-black border border-[#111] px-3 py-1 hover:bg-[#111] hover:text-[#00E5FF]"
                      >
                        💻 CODE ➔
                      </a>
                    )}
                    {pub.links?.slides && (
                      <span className="bg-[#EEE7DC] text-[#111] border border-[#111] px-3 py-1">
                        📊 SLIDES
                      </span>
                    )}
                    {pub.links?.poster && (
                      <span className="bg-[#EEE7DC] text-[#111] border border-[#111] px-3 py-1">
                        📌 POSTER
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: PATENTS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFE600] text-black border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
              SECTION 04
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111]">
              PATENTS & INTELLECTUAL PROPERTY
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {patents.map((patent) => (
              <div
                key={patent.id}
                className="bg-[#FFFDF5] border-4 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] relative flex flex-col justify-between hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#111111] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
              >
                <div className="absolute -top-3 right-4 bg-[#FF5722] text-white border-2 border-[#111] font-mono text-[10px] font-black px-3 py-0.5 shadow-[2px_2px_0px_0px_#111] uppercase">
                  APP NO: {patent.applicationNumber}
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-[#A855F7] mb-1">
                    STATUS: {patent.status}
                  </div>
                  <h3 className="text-xl font-black uppercase text-[#111] leading-snug">
                    {patent.title}
                  </h3>
                  <p className="mt-3 font-sans text-xs font-medium text-[#111]/85 leading-relaxed bg-[#EEE7DC] p-3 border-2 border-[#111]">
                    {patent.abstract}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t-2 border-[#111]">
                  <div className="font-mono text-[10px] font-black uppercase text-[#111]/70 mb-2">TECHNOLOGIES & DOMAINS:</div>
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
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: RESEARCH TIMELINE */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#A855F7] text-white border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
              SECTION 05
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111]">
              RESEARCH TIMELINE & MILESTONES
            </h2>
          </div>

          <div className="bg-[#FFFDF5] border-4 border-[#111111] p-6 sm:p-10 shadow-[10px_10px_0px_0px_#111111] relative">
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-ml-0.5 before:w-1 before:bg-[#111111]">
              {researchTimeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const theme = COLOR_STYLES[item.badgeColor];

                return (
                  <div
                    key={item.id}
                    className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
                  >
                    {/* TIMELINE MARKER DOT */}
                    <div className="flex items-center justify-center w-9 h-9 border-3 border-[#111] bg-[#FFE600] font-mono text-xs font-black shadow-[2px_2px_0px_0px_#111] absolute left-0 sm:left-1/2 -translate-x-1/2 z-10">
                      {idx + 1}
                    </div>

                    {/* CONTENT CARD */}
                    <div className="w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 bg-[#EEE7DC] border-3 border-[#111111] p-5 shadow-[4px_4px_0px_0px_#111111] group-hover:-translate-y-1 transition-[transform,box-shadow,background-color,border-color,color,opacity]">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-black text-[#FF5722]">{item.year}</span>
                        <span className={`font-mono text-[10px] font-black border border-[#111] px-2 py-0.5 uppercase ${theme.bg} ${theme.text}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-lg font-black uppercase text-[#111] leading-tight">
                        {item.title}
                      </h4>
                      <p className="font-mono text-xs font-bold text-[#111]/70 mb-2">{item.subtitle}</p>
                      <p className="font-sans text-xs text-[#111]/90 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: RESEARCH PHILOSOPHY */}
        {/* ========================================================================= */}
        <section className="bg-[#111111] text-white border-4 border-[#111111] p-8 sm:p-14 shadow-[12px_12px_0px_0px_#FFE600] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FF2A85] text-white font-mono text-[10px] font-black px-4 py-1 uppercase">
            STATEMENT OF INTENT
          </div>

          <div className="max-w-4xl space-y-4">
            <span className="font-mono text-xs font-black uppercase text-[#FFE600] tracking-widest block">
              SECTION 06 // RESEARCH PHILOSOPHY
            </span>
            <blockquote className="text-xl sm:text-3xl font-black uppercase tracking-tight leading-snug text-[#FFFDF5]">
              &ldquo;I enjoy building systems that are measurable, reproducible and explainable. My research focuses on solving practical systems problems through rigorous experimentation, deterministic engineering and scalable infrastructure.&rdquo;
            </blockquote>
            <div className="pt-2 font-mono text-xs font-bold text-[#00E5FF]">
              — ADITH MANIKONDA // RESEARCH ENGINEER
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: LIVING READING LIST */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#00E5FF] text-black border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
                SECTION 07
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111]">
                LIVING READING LIST
              </h2>
            </div>

            {/* TOPIC FILTER CHIPS */}
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {readingTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedReadingTopic(topic)}
                  className={`px-3 py-1 font-bold uppercase border-2 border-[#111] transition-[transform,box-shadow,background-color,border-color,color,opacity] ${
                    selectedReadingTopic === topic
                      ? "bg-[#111] text-[#FFE600] shadow-[2px_2px_0px_0px_#FF2A85]"
                      : "bg-[#FFFDF5] text-[#111] hover:bg-[#FFE600]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFDF5] border-4 border-[#111111] p-6 shadow-[10px_10px_0px_0px_#111111] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b-4 border-[#111111] bg-[#FFE600] text-black uppercase font-black text-xs">
                  <th className="p-3 border-r-2 border-[#111]">YEAR</th>
                  <th className="p-3 border-r-2 border-[#111]">TOPIC</th>
                  <th className="p-3 border-r-2 border-[#111]">PAPER TITLE</th>
                  <th className="p-3 border-r-2 border-[#111]">AUTHORS</th>
                  <th className="p-3 border-r-2 border-[#111]">STATUS</th>
                  <th className="p-3">KEY TAKEAWAY</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#111111]">
                {filteredReading.map((item) => {
                  const statusBg =
                    item.status === "Completed"
                      ? "bg-[#00E676] text-black"
                      : item.status === "Notes Available"
                      ? "bg-[#00E5FF] text-black"
                      : "bg-[#FFE600] text-black";

                  return (
                    <tr key={item.id} className="hover:bg-[#EEE7DC] transition-colors">
                      <td className="p-3 font-bold border-r-2 border-[#111] whitespace-nowrap">{item.year}</td>
                      <td className="p-3 font-bold border-r-2 border-[#111] whitespace-nowrap">
                        <span className="bg-[#111] text-white px-2 py-0.5 text-[10px] uppercase">
                          {item.topic}
                        </span>
                      </td>
                      <td className="p-3 font-black uppercase border-r-2 border-[#111] text-[#111] max-w-xs">
                        {item.title}
                      </td>
                      <td className="p-3 border-r-2 border-[#111] text-[#111]/80 max-w-xs">{item.authors}</td>
                      <td className="p-3 border-r-2 border-[#111] whitespace-nowrap">
                        <span className={`font-bold border border-[#111] px-2 py-0.5 text-[10px] uppercase ${statusBg}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-xs text-[#111]/90 font-medium max-w-sm">
                        {item.takeaway}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: RESEARCH METRICS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#FF5722] text-white border-2 border-[#111] font-mono text-xs font-black px-3 py-1 shadow-[2px_2px_0px_0px_#111]">
              SECTION 08
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111]">
              RESEARCH METRICS & OUTPUT SUMMARY
            </h2>
          </div>

          <div className="bg-[#FFFDF5] border-4 border-[#111111] p-8 shadow-[10px_10px_0px_0px_#111111] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center font-mono">
            <div className="bg-[#FFE600] border-3 border-[#111] p-4 shadow-[4px_4px_0px_0px_#111]">
              <div className="text-4xl font-black">
                <AnimatedCounter value={4} />
              </div>
              <div className="text-xs font-black uppercase tracking-wider mt-1">Research Projects</div>
            </div>

            <div className="bg-[#00E676] border-3 border-[#111] p-4 shadow-[4px_4px_0px_0px_#111]">
              <div className="text-4xl font-black">
                <AnimatedCounter value={1} />
              </div>
              <div className="text-xs font-black uppercase tracking-wider mt-1">Published Papers</div>
            </div>

            <div className="bg-[#00E5FF] border-3 border-[#111] p-4 shadow-[4px_4px_0px_0px_#111]">
              <div className="text-4xl font-black">
                <AnimatedCounter value={2} />
              </div>
              <div className="text-xs font-black uppercase tracking-wider mt-1">Papers Under Review</div>
            </div>

            <div className="bg-[#FF5722] text-white border-3 border-[#111] p-4 shadow-[4px_4px_0px_0px_#111]">
              <div className="text-4xl font-black">
                <AnimatedCounter value={2} />
              </div>
              <div className="text-xs font-black uppercase tracking-wider mt-1">Patents Filed</div>
            </div>

            <div className="bg-[#FF2A85] text-white border-3 border-[#111] p-4 shadow-[4px_4px_0px_0px_#111]">
              <div className="text-4xl font-black">
                <AnimatedCounter value={5} />
              </div>
              <div className="text-xs font-black uppercase tracking-wider mt-1">Hackathons Won</div>
            </div>

            <div className="bg-[#A855F7] text-white border-3 border-[#111] p-4 shadow-[4px_4px_0px_0px_#111]">
              <div className="text-4xl font-black">
                <AnimatedCounter value={10} suffix="+" />
              </div>
              <div className="text-xs font-black uppercase tracking-wider mt-1">Open Source Repos</div>
            </div>
          </div>
        </section>

        {/* BOTTOM RETURN BANNER */}
        <footer className="mt-16 bg-[#FFFDF5] border-4 border-[#111111] p-8 shadow-[10px_10px_0px_0px_#111111] text-center flex flex-col items-center gap-4">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111]">
            WANT TO COLLABORATE OR DISCUSS RESEARCH?
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#111]/80 max-w-lg">
            Interested in database query engines, LLM agent security benchmarks, or systems research? Feel free to reach out.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="bg-[#FF2A85] text-white border-3 border-[#111111] px-6 py-3 font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
            >
              GET IN TOUCH (CONTACT) ➔
            </Link>
            <Link
              href="/"
              className="bg-[#FFE600] text-black border-3 border-[#111111] px-6 py-3 font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111] hover:text-[#FFE600] transition-[transform,box-shadow,background-color,border-color,color,opacity]"
            >
              ← RETURN TO MAIN PORTFOLIO
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
