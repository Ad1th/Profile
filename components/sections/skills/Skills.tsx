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
import { useEffect, useState } from "react";

export default function Skills() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(orientation: portrait)");
    const sync = () => setIsPortrait(media.matches);
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section
      data-section="skills"
      className="relative w-full bg-[#111]"
      style={{ isolation: "isolate" }}
    >
      <div
        className="relative mx-auto flex flex-col"
        style={{ maxWidth: "100%" }}
      >
        <SkillsHero
          standalone={true}
          animateDots={true}
          isVisible={true}
          isPortrait={isPortrait}
        />
        <SkillsSystemRows
          standalone={true}
          isVisible={true}
          isPortrait={isPortrait}
        />
      </div>
    </section>
  );
}
