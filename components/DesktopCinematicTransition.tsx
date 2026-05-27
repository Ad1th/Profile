"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";
import SkillsHero from "@/components/sections/skills/SkillsHero";
import SkillsSystemRows from "@/components/sections/skills/SkillsSystemRows";
import Experience from "@/components/sections/experience/Experience";
import Projects from "@/components/sections/projects/Projects";

function SkillsLayer() {
  return (
    <section
      className="w-full bg-[#111]"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <div className="relative mx-auto flex h-full min-h-0 flex-col">
        <SkillsHero standalone={false} animateDots={true} isVisible={true} />
        <SkillsSystemRows standalone={false} isVisible={true} />
      </div>
    </section>
  );
}

export default function DesktopCinematicTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalScrollVh = 450;
  const skillsStart = 400 / totalScrollVh;
  const skillsRevealStart = 360 / totalScrollVh;

  // Hero exits during the first third, revealing the single About instance.
  const backendX = useTransform(scrollYProgress, [0.02, 0.1], [0, -700]);
  const backendOpacity = useTransform(scrollYProgress, [0.02, 0.09], [1, 0]);
  const withX = useTransform(scrollYProgress, [0.03, 0.12], [0, 1800]);
  const withScale = useTransform(scrollYProgress, [0.03, 0.12], [1, 0.96]);
  const tasteY = useTransform(scrollYProgress, [0.05, 0.14], [0, 680]);
  const tasteRotate = useTransform(scrollYProgress, [0.05, 0.14], [0, 1.4]);
  const imageScale = useTransform(scrollYProgress, [0.06, 0.16], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0.06, 0.16], [0, -320]);
  const stickerRotate = useTransform(scrollYProgress, [0.07, 0.14], [-4, -12]);
  const stickerX = useTransform(scrollYProgress, [0.07, 0.14], [0, 60]);
  const marqueeOpacity = useTransform(scrollYProgress, [0.03, 0.09], [1, 0]);
  const marqueeFilter = useTransform(
    scrollYProgress,
    [0.03, 0.09],
    ["blur(0px)", "blur(4px)"],
  );
  const marqueeDuration = useTransform(
    scrollYProgress,
    [0.03, 0.09],
    ["22s", "38s"],
  );
  const heroShellClip = useTransform(
    scrollYProgress,
    [0.12, 0.26],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
  );
  const heroShellOpacity = useTransform(scrollYProgress, [0.24, 0.28], [1, 0]);

  // About enters once, then exits directly over Skills. No second About render.
  const aboutShellOpacity = useTransform(
    scrollYProgress,
    [0.13, 0.2, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const aboutShellClip = useTransform(
    scrollYProgress,
    [skillsRevealStart, skillsStart],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
  );
  const buildY = useTransform(
    scrollYProgress,
    [0.15, 0.24, skillsRevealStart, skillsStart],
    [80, 0, 0, 40],
  );
  const buildOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.21, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const buildScale = useTransform(
    scrollYProgress,
    [0.15, 0.23, skillsRevealStart, skillsStart],
    [0.96, 1, 1, 0.96],
  );
  const bioClip = useTransform(
    scrollYProgress,
    [0.17, 0.24, skillsRevealStart, skillsStart],
    [
      "inset(100% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 96% 0%)",
    ],
  );
  const bioOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.23, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const bioY = useTransform(
    scrollYProgress,
    [0.17, 0.24, skillsRevealStart, skillsStart],
    [32, 0, 0, 28],
  );
  const paperOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.25, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const paperScale = useTransform(
    scrollYProgress,
    [0.18, 0.25, skillsRevealStart, skillsStart],
    [0.82, 1, 1, 0.82],
  );
  const paperRotate = useTransform(
    scrollYProgress,
    [0.18, 0.25, skillsRevealStart, skillsStart],
    [-6, 0, 0, 6],
  );
  const paperSkewX = useTransform(
    scrollYProgress,
    [0.18, 0.25, skillsRevealStart, skillsStart],
    [-8, 0, 0, 8],
  );
  const paperSkewY = useTransform(scrollYProgress, [0.18, 0.25], [4, 0]);
  const paperFilter = useTransform(
    scrollYProgress,
    [0.18, 0.25, skillsRevealStart, skillsStart],
    ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"],
  );
  const paperClip = useTransform(
    scrollYProgress,
    [0.18, 0.25, skillsRevealStart, skillsStart],
    [
      "inset(0% 0% 40% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 40% 0%)",
    ],
  );
  const backendAboutY = useTransform(
    scrollYProgress,
    [0.2, 0.27, skillsRevealStart, skillsStart],
    [48, 0, 0, 48],
  );
  const backendAboutOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.26, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const backendAboutScale = useTransform(
    scrollYProgress,
    [0.2, 0.27],
    [0.95, 1],
  );
  const hardwareX = useTransform(
    scrollYProgress,
    [0.21, 0.28, skillsRevealStart, skillsStart],
    [60, 0, 0, 60],
  );
  const hardwareOpacity = useTransform(
    scrollYProgress,
    [0.21, 0.27, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const interestsY = useTransform(
    scrollYProgress,
    [0.22, 0.29, skillsRevealStart, skillsStart],
    [-40, 0, 0, -36],
  );
  const interestsOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.28, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const interestsScale = useTransform(scrollYProgress, [0.22, 0.29], [0.96, 1]);
  const builtScale = useTransform(
    scrollYProgress,
    [0.24, 0.31, skillsRevealStart, skillsStart],
    [0.88, 1, 1, 0.88],
  );
  const builtOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.3, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );
  const footerY = useTransform(
    scrollYProgress,
    [0.28, 0.34, skillsRevealStart, skillsStart],
    [24, 0, 0, 24],
  );
  const footerOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.33, skillsRevealStart, skillsStart],
    [0, 1, 1, 0],
  );

  // Skills lives underneath About and is revealed by About's clip, then exits to Experience.
  const skillsOpacity = useTransform(
    scrollYProgress,
    [skillsRevealStart, skillsStart, 1],
    [0, 1, 1],
  );
  const skillsY = useTransform(
    scrollYProgress,
    [skillsRevealStart, skillsStart, 1],
    [30, 0, 0],
  );
  const skillsScale = useTransform(scrollYProgress, [0.78, 1], [1, 1]);
  const markerStyle = {
    position: "absolute",
    width: 1,
    height: "100vh",
    pointerEvents: "none",
  } as const;

  return (
    <>
      <div
        ref={containerRef}
        style={{ height: `${totalScrollVh}vh`, position: "relative" }}
      >
        <div data-section="hero" style={{ ...markerStyle, top: 0 }} />
        <div data-section="about" style={{ ...markerStyle, top: "25%" }} />
        <div
          data-section="skills"
          style={{ ...markerStyle, top: `${skillsStart * 100}%` }}
        />

        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#111",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              opacity: skillsOpacity,
              y: skillsY,
              scale: skillsScale,
              background: "#111",
              overflow: "hidden",
              willChange: "transform, opacity",
            }}
          >
            <SkillsLayer />
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              opacity: aboutShellOpacity,
              clipPath: aboutShellClip,
              overflow: "hidden",
              willChange: "clip-path, opacity",
            }}
          >
            <About
              viewportTransition={true}
              shellOpacity={aboutShellOpacity}
              buildY={buildY}
              buildOpacity={buildOpacity}
              buildScale={buildScale}
              bioClip={bioClip}
              bioOpacity={bioOpacity}
              bioY={bioY}
              paperOpacity={paperOpacity}
              paperScale={paperScale}
              paperRotate={paperRotate}
              paperSkewX={paperSkewX}
              paperSkewY={paperSkewY}
              paperFilter={paperFilter}
              paperClip={paperClip}
              backendY={backendAboutY}
              backendOpacity={backendAboutOpacity}
              backendScale={backendAboutScale}
              hardwareX={hardwareX}
              hardwareOpacity={hardwareOpacity}
              interestsY={interestsY}
              interestsOpacity={interestsOpacity}
              interestsScale={interestsScale}
              builtScale={builtScale}
              builtOpacity={builtOpacity}
              footerY={footerY}
              footerOpacity={footerOpacity}
            />
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 40,
              clipPath: heroShellClip,
              opacity: heroShellOpacity,
              willChange: "clip-path, opacity",
            }}
          >
            <Hero
              transitionProgress={scrollYProgress}
              suppressTicker={true}
              backendStyle={{ x: backendX, opacity: backendOpacity }}
              withStyle={{ x: withX, scale: withScale }}
              tasteStyle={{ y: tasteY, rotate: tasteRotate }}
              imageScale={imageScale}
              imageY={imageY}
              stickerRotate={stickerRotate}
              stickerX={stickerX}
              marqueeOpacity={marqueeOpacity}
              marqueeFilter={marqueeFilter}
              marqueeDuration={marqueeDuration}
            />
          </motion.div>
        </div>
      </div>
      <Experience />
      <Projects />
    </>
  );
}
