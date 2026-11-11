"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The pinned stage was composed for a ~860px tall viewport: the hero needs
 * 800px and the About grid two full rows. On a 1366x768 or 1280x720 laptop
 * the stats bar and ticker fell below the fold and the About cards were
 * clipped. Below the design height the whole stage is zoomed down instead,
 * so every layer keeps its proportions and nothing is cut.
 */
const STAGE_HEIGHT = 860;

/**
 * Above this height the stage is zoomed up instead. Left at 1:1, a 1440p or
 * 4K monitor showed the laptop-sized composition as small pieces in a very
 * large empty frame.
 */
const STAGE_MAX_HEIGHT = 1000;

/** The zoom never narrows the stage below this, or a tall, narrow window
 *  would be handed a phone-width stage with the desktop layout in it. */
const STAGE_MIN_WIDTH = 1280;

function stageFit(width: number, height: number) {
  if (height < STAGE_HEIGHT) return height / STAGE_HEIGHT;
  if (height > STAGE_MAX_HEIGHT) {
    return Math.max(
      1,
      Math.min(height / STAGE_MAX_HEIGHT, width / STAGE_MIN_WIDTH),
    );
  }
  return 1;
}

function useStageFit() {
  const [fit, setFit] = useState(1);
  useIsomorphicLayoutEffect(() => {
    const sync = () =>
      setFit(
        Math.round(stageFit(window.innerWidth, window.innerHeight) * 1000) /
          1000,
      );
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  return fit;
}

/**
 * A layer of the pinned stage that shrinks itself until its content fits.
 *
 * The stage zoom above only knows the viewport height. About and Skills are
 * built from fixed pixel type, so how tall they need to be also depends on
 * the width: at 1440x900 or 1366x768 their bottom rows ran past the stage
 * and were cut off. Instead of guessing a design size per aspect ratio, the
 * layer measures its own overflow and scales by exactly that much. The box
 * grows as it scales down, so the content gets more room, not less.
 */
function FitLayer({
  children,
  topInset = 0,
}: {
  children: ReactNode;
  /** Space to leave clear at the top, in stage pixels (the fixed navbar). */
  topInset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    let frame = 0;

    const measure = () => {
      // Scroll-linked transforms move the pieces around mid-timeline; they
      // are switched off for the read so only real layout is measured.
      box.dataset.measuring = "";
      const blocks = [
        box,
        ...Array.from(box.querySelectorAll<HTMLElement>("section, div")),
      ];
      const fits = (k: number) => {
        box.style.width = `${100 / k}%`;
        box.style.height = `${100 / k}%`;
        return blocks.every(
          (el) => el.clientHeight < 160 || el.scrollHeight <= el.clientHeight + 2,
        );
      };

      // Scaling down widens the box, which reflows the text into fewer
      // lines, so the right scale cannot be computed from one reading.
      let k = 1;
      if (!fits(1)) {
        let lo = 0.5;
        let hi = 1;
        for (let i = 0; i < 7; i++) {
          const mid = (lo + hi) / 2;
          if (fits(mid)) lo = mid;
          else hi = mid;
        }
        k = lo;
        fits(k);
      }
      delete box.dataset.measuring;
      box.style.transform = k === 1 ? "" : `scale(${k})`;
    };

    measure();
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    // Webfonts land after first layout and change every text height.
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [topInset]);

  return (
    <div style={{ position: "absolute", inset: 0, top: topInset }}>
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function DesktopCinematicTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fit = useStageFit();
  // The fixed navbar is 56 real pixels; the stage is zoomed by `fit`.
  const navInset = Math.ceil(56 / fit);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalScrollVh = 320;
  const skillsStart = 300 / totalScrollVh;
  const skillsRevealStart = 220 / totalScrollVh;

  // Hero exits during the first third, revealing the single About instance.
  const backendX = useTransform(scrollYProgress, [0.02, 0.1], [0, -700]);
  const backendOpacity = useTransform(scrollYProgress, [0.02, 0.09], [1, 0]);
  // viewport-relative so WITH fully exits on wide screens too
  const withX = useTransform(scrollYProgress, [0.03, 0.12], ["0vw", "125vw"]);
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
        {/* Scroll targets for the nav, the dots and /#hash links. The pin
            releases at (total - 100)vh, so the skills marker sits there:
            scrolling to it shows Skills fully revealed and still pinned. */}
        <div data-section="hero" style={{ ...markerStyle, top: 0 }} />
        <div
          data-section="about"
          style={{ ...markerStyle, top: "100vh", height: "120vh" }}
        />
        <div
          data-section="skills"
          style={{ ...markerStyle, top: `${totalScrollVh - 100}vh` }}
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
         <div
          style={{
            position: "relative",
            transform: `scale(${fit})`,
            transformOrigin: "top left",
            width: `calc(100% / ${fit})`,
            height: `calc(100vh / ${fit})`,
          }}
         >
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
              fill
              transitionProgress={scrollYProgress}
              suppressTicker={false}
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
           <FitLayer topInset={navInset}>
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
           </FitLayer>
          </motion.div>

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
            <FitLayer topInset={navInset}>
              <SkillsLayer />
            </FitLayer>
          </motion.div>
         </div>
        </div>
      </div>
      <Experience />
      <Projects />
    </>
  );
}
