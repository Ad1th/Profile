"use client";

import { useRef } from "react";
import SkillsHero from "@/components/sections/skills/SkillsHero";
import SkillsSystemRows from "@/components/sections/skills/SkillsSystemRows";

function SkillsLayer() {
  return (
    <section
      data-section="skills"
      className="w-full bg-[#111]"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <div
        className="relative mx-auto flex h-full min-h-0 flex-col"
        style={{ maxWidth: "100%", height: "100%" }}
      >
        <SkillsHero standalone={false} animateDots={true} isVisible={true} />
        <SkillsSystemRows standalone={false} isVisible={true} />
      </div>
    </section>
  );
}

export default function AboutSkillsTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#111",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <SkillsLayer />
        </div>
      </div>
    </div>
  );
}
