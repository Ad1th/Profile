"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/about/About";

export default function HeroAboutTransition() {
  const stageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const heroStructuralOpacity = useTransform(
    scrollYProgress,
    [0.54, 0.9],
    [1, 0.18],
  );
  const aboutLayerY = useTransform(scrollYProgress, [0.08, 0.34], [32, 0]);

  return (
    <>
      <section
        ref={stageRef}
        className="relative hidden h-[145svh] min-h-[1180px] bg-[#EEE7DC] lg:block"
      >
        <div className="sticky top-0 h-[100svh] min-h-[900px] overflow-hidden bg-[#EEE7DC]">
          <motion.div
            className="absolute inset-0 z-10"
            style={{ opacity: heroStructuralOpacity }}
          >
            <Hero transitionProgress={scrollYProgress} />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20"
            style={{ y: aboutLayerY }}
          >
            <About
              transitionProgress={scrollYProgress}
              viewportTransition
            />
          </motion.div>
        </div>
      </section>

      <div className="lg:hidden">
        <Hero />
        <About />
      </div>
    </>
  );
}
