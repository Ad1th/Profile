"use client";

import type React from "react";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import AboutBio from "./AboutBio";
import AboutPhilosophy from "./AboutPhilosophy";
import AboutInterests from "./AboutInterests";
import AboutBuiltToBeUsed from "./AboutBuiltToBeUsed";
import AboutBackendSystems from "./AboutBackendSystems";
import AboutHardware from "./AboutHardware";
import AboutFooter from "./AboutFooter";

const tileTransition = (delay: number) => ({
  duration: 0.42,
  delay,
  ease: easings.primary,
});

function Tile({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={tileTransition(delay)}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#F4EFE6] px-0 py-0"
    >
      <div className="mx-auto w-full border-[5px] border-t-0 border-[#050505]">
        <div className="grid min-h-0 grid-cols-1 gap-[4px] bg-[#050505] md:min-h-[150svh] md:grid-cols-12 md:grid-rows-5">
          <Tile
            className="md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1"
            delay={0}
          >
            <div className="flex h-full min-h-[360px] items-center bg-[#050505] p-[32px] md:p-[48px]">
              <div className="flex h-full w-full items-stretch gap-6">
                <motion.div
                  className="w-[14px] shrink-0 border-[3px] border-[#050505] bg-[#F24A05]"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.32, ease: easings.primary }}
                />
                <div
                  className="flex flex-col justify-center uppercase"
                  style={{
                    fontFamily:
                      "var(--font-archivo), 'Arial Black', sans-serif",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.82,
                  }}
                >
                  <span
                    className="block text-[#F4EFE6]"
                    style={{ fontSize: "clamp(72px, 9vw, 140px)" }}
                  >
                    I BUILD.
                  </span>
                  <span
                    className="block text-[#F24A05]"
                    style={{ fontSize: "clamp(72px, 9vw, 140px)" }}
                  >
                    I BREAK.
                  </span>
                  <span
                    className="block text-[#F4EFE6]"
                    style={{ fontSize: "clamp(72px, 9vw, 140px)" }}
                  >
                    I FIX.
                  </span>
                </div>
              </div>
            </div>
          </Tile>

          <Tile
            className="md:col-span-3 md:col-start-6 md:row-span-2 md:row-start-1"
            delay={0.07}
          >
            <AboutBio />
          </Tile>

          <Tile
            className="md:col-span-4 md:col-start-9 md:row-span-1 md:row-start-1"
            delay={0.12}
          >
            <AboutPhilosophy />
          </Tile>

          <Tile
            className="md:col-span-4 md:col-start-9 md:row-span-1 md:row-start-2"
            delay={0.17}
          >
            <AboutInterests />
          </Tile>

          <Tile
            className="md:col-span-3 md:col-start-1 md:row-span-2 md:row-start-3"
            delay={0.24}
          >
            <AboutBackendSystems />
          </Tile>

          <Tile
            className="md:col-span-2 md:col-start-4 md:row-span-2 md:row-start-3"
            delay={0.32}
          >
            <AboutHardware />
          </Tile>

          <Tile
            className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-3"
            delay={0.32}
          >
            <AboutBuiltToBeUsed />
          </Tile>

          <Tile
            className="md:col-span-12 md:col-start-1 md:row-span-1 md:row-start-5"
            delay={0.32}
          >
            <AboutFooter />
          </Tile>
        </div>
      </div>
    </section>
  );
}
