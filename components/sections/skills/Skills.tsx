"use client";

/**
 * Skills.tsx
 *
 * Flexible section component that works in two modes:
 *
 * 1. **Cinematic mode** (rare, inside a hypothetical cinematic container):
 *    - Receives MotionValue props for scroll-driven animations
 *    - Receives viewportTransition=true flag
 *
 * 2. **Standalone mode** (normal vertical scroll):
 *    - No MotionValue props provided
 *    - Uses whileInView animations triggered by viewport visibility
 *    - Renders naturally in document flow
 *
 * The component automatically detects which mode it's in and uses appropriate animations.
 * Currently, Skills always renders in standalone mode with whileInView animations.
 */

import SkillsHero from "./SkillsHero";
import SkillsSystemRows from "./SkillsSystemRows";

export default function Skills() {
  const standalone = true;

  return (
    <section className="relative w-full bg-[#111]">
      <div
        className="relative mx-auto flex flex-col"
        style={{ border: "5px solid #111", maxWidth: "100%" }}
      >
        <div>
          <SkillsHero standalone={standalone} />
        </div>

        <div>
          <SkillsSystemRows standalone={standalone} />
        </div>
      </div>
    </section>
  );
}
