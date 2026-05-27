"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HACKS = [
  {
    date: "MAR 2026",
    location: "MIT Bangalore",
    title: "TechSolstice",
    badge: null,
    desc: "Built archAIc, a distributed reliability engineering platform with observability and chaos testing.",
  },
  {
    date: "MAR 2026",
    location: "VIT Vellore",
    title: "Women Techies\u201926",
    badge: "Finalist \u2014 Top 10",
    desc: "Built AetherQuery, a SQL analytics engine focused on large-scale query execution and interactive analysis.",
  },
  {
    date: "SEP 2025",
    location: "VIT Vellore",
    title: "Code 2 Create (C2C)",
    badge: "AI Track Winner",
    desc: "Built a blind assistance system using image recognition and real-time audio feedback.",
  },
  {
    date: "APR 2025",
    location: "VIT Vellore",
    title: "Women Techies\u201925",
    badge: null,
    desc: "Built SevaVerse, a collaborative NGO and volunteer coordination platform.",
  },
  {
    date: "JAN 2025",
    location: "VIT Vellore",
    title: "Yantra Central Hack",
    badge: null,
    desc: "Built OptiSync, a sustainability-focused platform for industrial optimization.",
  },
  {
    date: "SEP 2024",
    location: "VIT Vellore",
    title: "DevJams",
    badge: null,
    desc: "Built Therddit, an AI-powered productivity and browsing behavior assistant.",
  },
  {
    date: "FEB 2024",
    location: "NPS KRM, Bangalore",
    title: "CodeWars",
    badge: "1st Place",
    desc: null,
  },
];

export default function Hackathons() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const head = headRef.current;
    const sub = subRef.current;
    if (!head || !sub) return;

    gsap.set([head, sub], { opacity: 0, y: 18 });
    gsap.set(rowsRef.current.filter(Boolean), { opacity: 0, y: 22 });

    // heading reveal
    ScrollTrigger.create({
      trigger: head,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to([head, sub], {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        });
      },
    });

    // rows stagger on scroll
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      ScrollTrigger.create({
        trigger: row,
        start: "top 91%",
        once: true,
        onEnter: () => {
          gsap.to(row, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.04,
            ease: "power3.out",
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((s) => s.kill());
  }, []);

  return (
    <section ref={sectionRef} className="hk-root" aria-label="Hackathons">
      {/* heading block */}
      <div className="hk-head-block">
        <h2 ref={headRef} className="hk-heading">
          HACKATHONS
        </h2>
        <p ref={subRef} className="hk-sub">
          Competitive builds and shipped experiments.
        </p>
      </div>

      {/* rows */}
      <div className="hk-list">
        {HACKS.map((h, i) => (
          <div
            key={i}
            ref={(el) => {
              rowsRef.current[i] = el;
            }}
            className="hk-row group"
          >
            {/* thin separator */}
            <div className="hk-sep">
              <div className="hk-sep-line" />
            </div>

            {/* left: date + location */}
            <div className="hk-left">
              <span className="hk-date">{h.date}</span>
              <span className="hk-loc">{h.location}</span>
            </div>

            {/* right: title + desc */}
            <div className="hk-right">
              <div className="hk-title-row">
                <span className="hk-title">{h.title}</span>
                {h.badge && <span className="hk-badge">{h.badge}</span>}
              </div>
              {h.desc && <p className="hk-desc">{h.desc}</p>}
            </div>
          </div>
        ))}
        {/* final separator */}
        <div className="hk-sep">
          <div className="hk-sep-line" />
        </div>
      </div>

      <style jsx>{`
        .hk-root {
          background: #f2ede5;
          color: #202020;
          padding: 7rem 0 9rem;
          font-family: "Inter", "Helvetica Neue", sans-serif;
        }
        .hk-head-block {
          padding: 0 clamp(2rem, 6vw, 7rem);
          margin-bottom: 4.5rem;
        }
        .hk-heading {
          font-family: "Druk Condensed Super", "Anton", "Impact", sans-serif;
          font-size: clamp(3.8rem, 9vw, 8rem);
          font-weight: 900;
          letter-spacing: -0.01em;
          line-height: 0.88;
          color: #202020;
          margin: 0 0 1.1rem;
        }
        .hk-sub {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(32, 32, 32, 0.38);
          margin: 0;
        }

        /* separator */
        .hk-sep {
          padding: 0 clamp(2rem, 6vw, 7rem);
          overflow: hidden;
        }
        .hk-sep-line {
          height: 1px;
          background: rgba(32, 32, 32, 0.12);
          transform-origin: left;
          transition: background 0.4s ease;
        }
        .hk-row:hover .hk-sep-line {
          background: rgba(214, 106, 59, 0.45);
        }

        /* row */
        .hk-row {
          display: grid;
          grid-template-columns: clamp(2rem, 6vw, 7rem) clamp(
              6rem,
              14vw,
              14rem
            ) 1fr;
          column-gap: clamp(1.5rem, 3vw, 4rem);
          padding: 2.2rem clamp(2rem, 6vw, 7rem) 2.2rem;
          transition: background 0.35s ease;
          cursor: default;
        }
        .hk-row:hover {
          background: rgba(32, 32, 32, 0.018);
        }

        /* spacer column (empty, keeps grid aligned) */
        .hk-sep {
          grid-column: 1 / -1;
        }

        /* left */
        .hk-left {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-top: 0.15rem;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hk-row:hover .hk-left {
          transform: translateY(-3px);
        }
        .hk-date {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(32, 32, 32, 0.45);
          white-space: nowrap;
        }
        .hk-loc {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(32, 32, 32, 0.28);
          white-space: nowrap;
        }

        /* right */
        .hk-right {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .hk-title-row {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hk-title {
          font-family: "Druk Condensed Super", "Anton", "Impact", sans-serif;
          font-size: clamp(1.25rem, 2.8vw, 2rem);
          font-weight: 900;
          letter-spacing: 0.01em;
          line-height: 1;
          color: #202020;
        }
        .hk-badge {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #d66a3b;
          white-space: nowrap;
          padding-bottom: 0.08em;
          position: relative;
        }
        .hk-badge::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #d66a3b;
          transition: width 0.4s ease;
        }
        .hk-row:hover .hk-badge::after {
          width: 100%;
        }
        .hk-desc {
          font-size: 0.82rem;
          line-height: 1.7;
          color: rgba(32, 32, 32, 0.52);
          max-width: 52ch;
          margin: 0;
        }

        @media (max-width: 640px) {
          .hk-row {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }
          .hk-left {
            flex-direction: row;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
