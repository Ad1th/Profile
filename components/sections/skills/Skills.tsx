"use client";

/**
 * Skills.tsx
 *
 * Standalone version — used on mobile/tablet only.
 * On desktop, Skills is rendered inside DesktopCinematicTransition directly.
 * This component is NOT used on desktop.
 *
 * Uses whileInView for all animations (works correctly in normal document flow).
 */

import SkillsHero from "@/components/sections/skills/SkillsHero";
import SkillsSystemRows from "@/components/sections/skills/SkillsSystemRows";

export default function Skills() {
  return (
    <section
      data-section="skills"
      className="relative w-full bg-[#111]"
      style={{ isolation: "isolate" }}
    >
      <div
        className="relative mx-auto flex flex-col"
        style={{ maxWidth: "100%", marginTop: "-20px" }}
      >
        <SkillsHero standalone={true} animateDots={true} isVisible={true} />
        <SkillsSystemRows standalone={true} isVisible={true} />
      </div>
    </section>
  );
}
