"use client";

import { motion } from "framer-motion";

const HACKATHONS = [
  {
    date: "Mar 2026",
    title: "Women Techies'26 - Finalist, Top 10 Teams",
    location: "VIT Vellore",
  },
  {
    date: "Mar 2026",
    title: "TechSolstice",
    location: "MIT Bangalore",
  },
  {
    date: "Sep 2025",
    title: "Code 2 Create (C2C) - AI Track Winner",
    location: "VIT Vellore",
  },
  {
    date: "Apr 2025",
    title: "Women Techies'25",
    location: "VIT Vellore",
  },
  {
    date: "Jan 2025",
    title: "Yantra Central Hack",
    location: "VIT Vellore",
  },
  {
    date: "Sep 2024",
    title: "DevJams",
    location: "VIT Vellore",
  },
  {
    date: "Feb 2024",
    title: "CodeWars - 1st Place",
    location: "NPS KRM, Bangalore",
  },
];

const ACHIEVEMENTS = [
  { year: "2025", title: "AI Track Winner - Code 2 Create (C2C)" },
  {
    year: "2024-25",
    title: "100% Attendance Award",
    detail: "Vellore Institute of Technology",
  },
  { year: "2025", title: "OCI Foundations Certification" },
  { year: "2025", title: "SQL Basic Certification" },
  { year: "2025", title: "SQL Intermediate Certification" },
  { year: "2023", title: "PC Building Competition - Second Place" },
];

export default function HackathonsAchievements() {
  return (
    <section
      data-section="hackathons"
      className="relative w-full overflow-hidden bg-[#A7B2B9] px-6 py-24 text-[#1E1E1B] sm:px-10 lg:px-16"
      style={{ isolation: "isolate" }}
      aria-label="Hackathons and achievements"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(30,30,27,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,27,.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <div className="mb-10">
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#A14A32]">
              - Hackathons
            </span>
            <h2 className="mt-5 font-serif text-[clamp(44px,5vw,76px)] font-semibold leading-[0.95] tracking-[-0.04em]">
              Live sprint record
            </h2>
          </div>

          <div className="space-y-7">
            {HACKATHONS.map((item, index) => (
              <motion.article
                key={`${item.date}-${item.title}`}
                className="group grid gap-2 border-t border-[rgba(30,30,27,.12)] pt-5 transition-[background,padding] duration-300 hover:bg-[#DDD5C9]/55 hover:px-4 sm:grid-cols-[150px_1fr] sm:gap-8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: index * 0.035 }}
              >
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E1E1B]/50">
                    {item.date}
                  </p>
                  <p className="mt-2 text-[12px] text-[#1E1E1B]/46">
                    {item.location}
                  </p>
                </div>
                <h3 className="font-serif text-[18px] font-bold leading-snug text-[#1E1E1B] transition-transform duration-300 group-hover:translate-x-2">
                  {item.title}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>

        <aside
          data-section="achievements"
          className="border-t border-[rgba(30,30,27,.12)] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
        >
          <div className="mb-10">
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#A14A32]">
              - Achievements
            </span>
            <h2 className="mt-5 text-[clamp(34px,3.4vw,56px)] font-black uppercase leading-[0.92] tracking-[-0.04em]">
              Selected milestones and certifications.
            </h2>
          </div>

          <div className="space-y-6">
            {ACHIEVEMENTS.map((item, index) => (
              <motion.article
                key={`${item.year}-${item.title}`}
                className="group border-t border-[rgba(30,30,27,.12)] pt-5 transition-[background,padding] duration-300 hover:bg-[#DDD5C9]/50 hover:px-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: index * 0.045 }}
              >
                <p className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-[#A14A32]">
                  {item.year}
                </p>
                <h3 className="mt-2 text-[17px] font-black leading-snug text-[#1E1E1B] transition-transform duration-300 group-hover:translate-x-2">
                  {item.title}
                </h3>
                {item.detail && (
                  <p className="mt-1 text-[13px] text-[#1E1E1B]/52">
                    {item.detail}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
