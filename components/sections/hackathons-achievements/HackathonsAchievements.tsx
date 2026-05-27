"use client";

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
      className="relative w-full bg-[#F2EDE5] px-6 py-20 text-[#151515] sm:px-10 lg:px-16"
      style={{ isolation: "isolate" }}
      aria-label="Hackathons and achievements"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <div className="mb-10">
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#E8420A]">
              - Hackathons
            </span>
            <h2 className="mt-5 font-serif text-[clamp(44px,5vw,76px)] font-semibold leading-[0.95] tracking-[-0.04em]">
              Live sprint record
            </h2>
          </div>

          <div className="space-y-7">
            {HACKATHONS.map((item) => (
              <article
                key={`${item.date}-${item.title}`}
                className="grid gap-2 border-t border-[#151515]/10 pt-5 sm:grid-cols-[150px_1fr] sm:gap-8"
              >
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#151515]/42">
                    {item.date}
                  </p>
                  <p className="mt-2 text-[12px] text-[#151515]/38">
                    {item.location}
                  </p>
                </div>
                <h3 className="font-serif text-[18px] font-bold leading-snug text-[#151515]">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        <aside
          data-section="achievements"
          className="border-t border-[#151515]/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
        >
          <div className="mb-10">
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#E8420A]">
              - Achievements
            </span>
            <h2 className="mt-5 text-[clamp(34px,3.4vw,56px)] font-black uppercase leading-[0.92] tracking-[-0.04em]">
              Selected milestones and certifications.
            </h2>
          </div>

          <div className="space-y-6">
            {ACHIEVEMENTS.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="border-t border-[#151515]/10 pt-5"
              >
                <p className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-[#E8420A]">
                  {item.year}
                </p>
                <h3 className="mt-2 text-[17px] font-black leading-snug text-[#151515]">
                  {item.title}
                </h3>
                {item.detail && (
                  <p className="mt-1 text-[13px] text-[#151515]/48">
                    {item.detail}
                  </p>
                )}
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
