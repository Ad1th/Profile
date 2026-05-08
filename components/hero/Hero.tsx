"use client";

import type React from "react";
import HeroHeadline from "./HeroHeadline";
import HeroCTA from "./HeroCTA";
import HeroPortrait from "./HeroPortrait";
import { motion, useScroll, useTransform } from "framer-motion";
import { easings } from "@/lib/motion";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const [viewport, setViewport] = useState<
    "desktop" | "tabletLandscape" | "tabletPortrait" | "mobile"
  >("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      if (w > 1180) {
        setViewport("desktop");
      } else if (w >= 768) {
        if (isPortrait && w <= 1024) {
          setViewport("tabletPortrait");
        } else {
          setViewport("tabletLandscape");
        }
      } else {
        setViewport("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let heroContent: React.ReactNode;

  if (viewport === "tabletPortrait") {
    heroContent = <HeroTabletPortrait />;
  } else if (viewport === "tabletLandscape") {
    heroContent = <HeroTabletLandscape />;
  } else if (viewport === "mobile") {
    heroContent = <HeroMobile />;
  } else {
    heroContent = <HeroDesktop />;
  }

  return (
    <div className="relative bg-[#F4EFE6]">
      {heroContent}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP: Two-column split layout (1280px+)
// ═══════════════════════════════════════════════════════════════
function HeroDesktop() {
  const stageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.08, 0.32], ["0%", "-8%"]);
  const leftY = useTransform(scrollYProgress, [0.08, 0.32], ["0%", "-4%"]);
  const leftScale = useTransform(scrollYProgress, [0.08, 0.32], [1, 0.96]);
  const leftOpacity = useTransform(scrollYProgress, [0.08, 0.32], [1, 0.92]);

  const rightX = useTransform(scrollYProgress, [0.08, 0.32], ["0%", "6%"]);
  const rightY = useTransform(scrollYProgress, [0.08, 0.32], ["0%", "5%"]);
  const rightScale = useTransform(scrollYProgress, [0.08, 0.32], [1, 0.94]);

  const statY = useTransform(scrollYProgress, [0.14, 0.34], ["0%", "120%"]);
  const statOpacity = useTransform(scrollYProgress, [0.14, 0.28], [1, 0]);

  const backendY = useTransform(scrollYProgress, [0.12, 0.32], ["0%", "-12%"]);
  const withScale = useTransform(scrollYProgress, [0.12, 0.32], [1, 0.88]);
  const tasteY = useTransform(scrollYProgress, [0.12, 0.32], ["0%", "18%"]);
  const tasteRotate = useTransform(scrollYProgress, [0.12, 0.32], [0, -1]);

  const portraitScale = useTransform(scrollYProgress, [0.12, 0.34], [1, 0.78]);
  const portraitY = useTransform(scrollYProgress, [0.12, 0.34], ["0%", "10%"]);

  return (
    <section
      ref={stageRef}
      className="relative hidden h-[155svh] min-h-[1260px] w-full bg-[#F4EFE6] lg:block"
    >
      <div className="sticky top-0 h-[100svh] min-h-[760px] w-full overflow-hidden bg-[#F4EFE6]">
        <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />

      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #050505" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      <div
        className="relative w-full h-full flex"
        style={{ paddingTop: 88, paddingBottom: 100 }}
      >
        <motion.div
          className="relative flex flex-col justify-center bg-[#050505]"
          style={{
            width: "52%",
            borderRight: "5px solid #050505",
            paddingLeft: 48,
            paddingRight: 48,
            zIndex: 20,
            x: leftX,
            y: leftY,
            scale: leftScale,
            opacity: leftOpacity,
          }}
        >
          <div
            className="absolute"
            style={{
              left: 28,
              bottom: 28,
              width: 18,
              height: 18,
              background: "#F24A05",
              border: "2px solid #050505",
            }}
          />
          <div style={{ marginTop: 50 }}>
            <HeroHeadline
              backendStyle={{ y: backendY }}
              withStyle={{ scale: withScale }}
              tasteStyle={{ y: tasteY, rotate: tasteRotate }}
            />
            <HeroCTA />
          </div>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center bg-[#7C9BB8]"
          style={{
            width: "48%",
            background: "#7C9BB8",
            zIndex: 10,
            x: rightX,
            y: rightY,
            scale: rightScale,
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{ width: 4, background: "#F24A05" }}
          />
          <div
            className="absolute"
            style={{
              left: 18,
              bottom: 92,
              width: 24,
              height: 24,
              background: "#F24A05",
              border: "2px solid #050505",
              zIndex: 5,
            }}
          />
          <HeroPortrait containerStyle={{ y: portraitY, scale: portraitScale }} />
        </motion.div>
      </div>

      <motion.div
        className="absolute left-0 right-0 z-30 flex items-center"
        style={{
          bottom: 56,
          height: 102,
          background: "#F4EFE6",
          borderTop: "5px solid #050505",
          borderBottom: "5px solid #050505",
          boxShadow: "0 -4px 0 #050505",
          y: statY,
          opacity: statOpacity,
        }}
      >
        <div
          className="flex-1 flex flex-col items-start justify-center"
          style={{ borderRight: "5px solid #050505", padding: "14px 28px" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 18, height: 3, background: "#050505" }} />
            <div style={{ width: 3, height: 3, background: "#F24A05" }} />
            <div style={{ width: 3, height: 3, background: "#050505" }} />
          </div>
          <div
            className="text-[#050505] text-[48px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            3+
          </div>
          <div
            className="text-[#444] text-[25px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Years Building
          </div>
        </div>
        <div
          className="flex-1 flex flex-col items-start justify-center"
          style={{ padding: "5px 28px", borderRight: "5px solid #050505" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 12, height: 3, background: "#050505" }} />
            <div
              style={{
                width: 12,
                height: 3,
                background: "#050505",
                transform: "skewX(-32deg)",
              }}
            />
          </div>
          <div
            className="text-[#050505] text-[48px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            15+
          </div>
          <div
            className="text-[#444] text-[25px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Projects Shipped
          </div>
        </div>
        <div
          className="flex-1 flex flex-col items-start justify-center"
          style={{ padding: "14px 28px", borderRight: "5px solid #050505" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 12, height: 3, background: "#050505" }} />
            <div
              style={{
                width: 12,
                height: 3,
                background: "#050505",
                transform: "skewX(-32deg)",
              }}
            />
          </div>
          <div
            className="text-[#050505] text-[48px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            80+
          </div>
          <div
            className="text-[#444] text-[25px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Repositories
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-40 overflow-hidden flex items-center"
        style={{
          height: 44,
          background: "#F24A05",
          borderTop: "5px solid #050505",
          boxShadow: "0 -3px 0 #050505",
        }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{
            animation: "ticker 22s linear infinite",
            animationDuration: "18s",
            paddingLeft: 18,
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          {/* ticker */}
          {[...Array(4)].map((_, i) =>
            // prettier-ignore
            <span
            key={i}
            className="text-white text-[14px] font-black tracking-[0.26em] uppercase"
            style={{
              fontFamily: "var(--font-archivo), monospace",
              paddingRight: 64,
            }}
          >
             MAKE IT WORK    ■    MAKE IT FAST    ■    MAKE IT HOLD    ■    MAKE IT BETTER    ■
          </span>,
          )}
        </div>
      </motion.div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// TABLET: Mini-desktop split layout (768px–1024px)
// ═══════════════════════════════════════════════════════════════
function HeroTabletLandscape() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F4EFE6]">
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />

      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #050505" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      <div
        className="relative"
        style={{
          marginTop: 72,
          minHeight: "calc(100vh - 72px - 112px - 48px)",
          display: "grid",
          gridTemplateColumns: "52% 48%",
          borderBottom: "5px solid #050505",
        }}
      >
        <motion.div
          className="relative bg-[#050505]"
          style={{
            borderRight: "5px solid #050505",
            padding: "32px clamp(20px, 4vw, 36px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          initial={{ x: -28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
        >
          <div
            className="absolute"
            style={{
              left: 16,
              bottom: 22,
              width: 12,
              height: 12,
              background: "#F24A05",
              border: "2px solid #050505",
            }}
          />
          <div style={{ width: "100%", maxWidth: 460 }}>
            <HeadlineTablet />
          </div>
        </motion.div>

        <motion.div
          className="relative bg-[#7C9BB8]"
          style={{
            padding: "28px clamp(16px, 3vw, 28px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
        >
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{ width: 4, background: "#F24A05" }}
          />
          <div
            className="absolute"
            style={{
              left: 14,
              bottom: 18,
              width: 16,
              height: 16,
              background: "#F24A05",
              border: "2px solid #050505",
            }}
          />
          <HeroPortraitTablet />
        </motion.div>
      </div>

      <motion.div
        className="relative z-30 grid grid-cols-2 gap-0"
        style={{
          background: "#F4EFE6",
          borderBottom: "5px solid #050505",
          boxShadow: "0 -4px 0 #050505",
        }}
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.3, ease: easings.primary }}
      >
        <div
          style={{
            borderRight: "5px solid #050505",
            padding: "24px 20px",
            minHeight: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 14, height: 2, background: "#050505" }} />
            <div style={{ width: 2, height: 2, background: "#F24A05" }} />
          </div>
          <div
            className="text-[#050505] text-[36px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            3+
          </div>
          <div
            className="text-[#444] text-[14px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Years Building
          </div>
        </div>

        <div
          style={{
            padding: "24px 20px",
            minHeight: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "5px solid #050505",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 10, height: 2, background: "#050505" }} />
            <div
              style={{
                width: 10,
                height: 2,
                background: "#050505",
                transform: "skewX(-32deg)",
              }}
            />
          </div>
          <div
            className="text-[#050505] text-[36px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            15+
          </div>
          <div
            className="text-[#444] text-[14px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Projects Shipped
          </div>
        </div>

        <div
          style={{
            padding: "24px 20px",
            minHeight: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 10, height: 2, background: "#050505" }} />
            <div
              style={{
                width: 10,
                height: 2,
                background: "#050505",
                transform: "skewX(-32deg)",
              }}
            />
          </div>
          <div
            className="text-[#050505] text-[36px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            80+
          </div>
          <div
            className="text-[#444] text-[14px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Repositories
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-40 overflow-hidden flex items-center"
        style={{
          height: 48,
          background: "#F24A05",
          borderTop: "5px solid #050505",
          boxShadow: "0 -3px 0 #050505",
        }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{
            animation: "ticker 20s linear infinite",
            paddingLeft: 16,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-white text-[12px] font-black tracking-[0.24em] uppercase"
              style={{
                fontFamily: "var(--font-archivo), monospace",
                paddingRight: 48,
              }}
            >
              OPEN TO INTERN ■ BACKEND ■ CLEAN CODE ■ PRESSURE TESTED BUILDS ■
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function HeroTabletPortrait() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4EFE6]">
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />

      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "5px solid #050505" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      <motion.div
        className="relative bg-[#050505]"
        style={{
          marginTop: 72,
          borderBottom: "5px solid #050505",
          padding: "34px 30px 28px",
          display: "flex",
          justifyContent: "center",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
      >
        <div style={{ width: "100%", maxWidth: 720 }}>
          <HeadlineTabletPortrait />
        </div>
      </motion.div>

      <motion.div
        className="relative bg-[#7C9BB8]"
        style={{
          borderBottom: "5px solid #050505",
          padding: "30px 24px 34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
      >
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: 4, background: "#F24A05" }}
        />
        <HeroPortraitTabletPortrait />
      </motion.div>

      <motion.div
        className="relative z-30 grid grid-cols-2 gap-0"
        style={{
          background: "#F4EFE6",
          borderBottom: "5px solid #050505",
          boxShadow: "0 -4px 0 #050505",
        }}
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.3, ease: easings.primary }}
      >
        <div
          style={{
            borderRight: "5px solid #050505",
            padding: "20px 20px",
            minHeight: "110px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 14, height: 2, background: "#050505" }} />
            <div style={{ width: 2, height: 2, background: "#F24A05" }} />
          </div>
          <div
            className="text-[#050505] text-[34px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            3+
          </div>
          <div
            className="text-[#444] text-[13px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Years Building
          </div>
        </div>

        <div
          style={{
            padding: "20px 20px",
            minHeight: "110px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "5px solid #050505",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 10, height: 2, background: "#050505" }} />
            <div
              style={{
                width: 10,
                height: 2,
                background: "#050505",
                transform: "skewX(-32deg)",
              }}
            />
          </div>
          <div
            className="text-[#050505] text-[34px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            15+
          </div>
          <div
            className="text-[#444] text-[13px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Projects Shipped
          </div>
        </div>

        <div
          style={{
            padding: "20px 20px",
            minHeight: "110px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 10, height: 2, background: "#050505" }} />
            <div
              style={{
                width: 10,
                height: 2,
                background: "#050505",
                transform: "skewX(-32deg)",
              }}
            />
          </div>
          <div
            className="text-[#050505] text-[34px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            80+
          </div>
          <div
            className="text-[#444] text-[13px] font-bold tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-archivo), monospace" }}
          >
            Repositories
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-40 overflow-hidden flex items-center"
        style={{
          height: 48,
          background: "#F24A05",
          borderTop: "5px solid #050505",
          boxShadow: "0 -3px 0 #050505",
        }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{
            animation: "ticker 20s linear infinite",
            paddingLeft: 16,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-white text-[12px] font-black tracking-[0.24em] uppercase"
              style={{
                fontFamily: "var(--font-archivo), monospace",
                paddingRight: 48,
              }}
            >
              OPEN TO INTERN ■ BACKEND ■ CLEAN CODE ■ PRESSURE TESTED BUILDS ■
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MOBILE: Single-column poster layout (<768px)
// ═══════════════════════════════════════════════════════════════
function HeroMobile() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4EFE6]">
      <div className="absolute inset-0 bg-grain pointer-events-none z-[60] opacity-[0.025]" />

      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ border: "4px solid #050505" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      <motion.div
        className="relative bg-[#050505]"
        style={{
          marginTop: 72,
          borderBottom: "4px solid #050505",
          padding: "32px 20px",
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easings.primary }}
      >
        <HeadlineMobile />
      </motion.div>

      <motion.div
        className="relative bg-[#7C9BB8]"
        style={{
          borderBottom: "4px solid #050505",
          padding: "28px 16px 32px",
          minHeight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: easings.primary }}
      >
        <HeroPortraitMobile />
      </motion.div>

      <motion.div
        className="relative z-30 grid gap-0"
        style={{
          background: "#F4EFE6",
          borderBottom: "4px solid #050505",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.25, ease: easings.primary }}
      >
        <div
          style={{
            borderRight: "4px solid #050505",
            borderBottom: "4px solid #050505",
            padding: "16px 12px",
            minHeight: "85px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            className="text-[#050505] text-[28px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            3+
          </div>
          <div
            className="text-[#555] text-[10px] font-bold tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-archivo), monospace",
              marginTop: 6,
            }}
          >
            Years
          </div>
        </div>

        <div
          style={{
            borderRight: "4px solid #050505",
            borderBottom: "4px solid #050505",
            padding: "16px 12px",
            minHeight: "85px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            className="text-[#050505] text-[28px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            12
          </div>
          <div
            className="text-[#555] text-[10px] font-bold tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-archivo), monospace",
              marginTop: 6,
            }}
          >
            Projects
          </div>
        </div>

        <div
          style={{
            borderRight: "4px solid #050505",
            borderBottom: "4px solid #050505",
            padding: "16px 12px",
            minHeight: "85px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            className="text-[#050505] text-[28px] font-black leading-none"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            80+
          </div>
          <div
            className="text-[#555] text-[10px] font-bold tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-archivo), monospace",
              marginTop: 6,
            }}
          >
            Repos
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-40 overflow-hidden flex items-center"
        style={{
          height: 40,
          background: "#F24A05",
          borderTop: "4px solid #050505",
        }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: easings.primary }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{
            animation: "ticker 18s linear infinite",
            paddingLeft: 12,
          }}
        >
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="text-white text-[10px] font-black tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-archivo), monospace",
                paddingRight: 32,
              }}
            >
              OPEN TO INTERN ■ BACKEND ■ CLEAN CODE ■
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Helper: Tablet Headline
// ═══════════════════════════════════════════════════════════════
function HeadlineTablet() {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
      }}
    >
      <motion.span
        className="block text-[#F4EFE6]"
        style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: easings.primary }}
      >
        BACKEND
      </motion.span>

      <motion.div
        className="inline-block"
        style={{
          border: "3px solid #D7F205",
          padding: "3px 12px 0px 12px",
          marginTop: 6,
          marginBottom: 6,
          maxWidth: "fit-content",
          backgroundColor: "transparent",
        }}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.25, ease: easings.primary }}
      >
        <span
          className="block text-[#D7F205]"
          style={{ fontSize: "clamp(48px, 8vw, 92px)", lineHeight: 0.9 }}
        >
          WITH
        </span>
      </motion.div>

      <motion.span
        className="block text-[#F24A05]"
        style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease: easings.primary }}
      >
        TASTE.
      </motion.span>

      <motion.p
        className="font-mono text-[#E8E8E8] normal-case mt-6"
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.02em",
          lineHeight: 1.5,
          maxWidth: 360,
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easings.primary }}
      >
        Pressure tested builds with clean internals.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easings.primary }}
      >
        <CTATablet />
      </motion.div>
    </div>
  );
}

function CTATablet() {
  return (
    <div style={{ position: "relative", width: 220, height: 52 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#F24A05",
          border: "3px solid #050505",
          transform: "translate(6px, 6px)",
          zIndex: 0,
        }}
      />
      <button
        style={{
          position: "absolute",
          inset: 0,
          background: "#D7F205",
          border: "3px solid #050505",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 900,
          fontFamily: "var(--font-archivo), sans-serif",
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          color: "#050505",
          outline: "none",
        }}
      >
        VIEW WORK
      </button>
    </div>
  );
}

function HeroPortraitTablet() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 360 }}>
      <motion.div
        className="relative"
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          border: "5px solid #050505",
          boxShadow: "10px 10px 0 #F4EFE6",
          background: "#1F1F1F",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: easings.primary }}
      >
        <img
          src="/images/me2.jpeg"
          alt="Adith Manikonda"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 24%",
            filter: "grayscale(100%) contrast(1.18)",
            transform: "scale(1.02)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center gap-3 bg-[#D7F205]"
        style={{
          width: 200,
          height: 40,
          bottom: 20,
          right: -10,
          rotate: "-5deg",
          border: "4px solid #050505",
          boxShadow: "8px 8px 0 #F24A05",
          zIndex: 20,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.7, ease: easings.primary }}
      >
        <span
          className="text-[#050505] text-[12px] font-black uppercase tracking-[0.04em] leading-none"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          OPEN TO INTERN
        </span>
      </motion.div>
    </div>
  );
}

function HeadlineTabletPortrait() {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
      }}
    >
      <motion.span
        className="block text-[#F4EFE6]"
        style={{ fontSize: "clamp(62px, 10.5vw, 106px)" }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: easings.primary }}
      >
        BACKEND
      </motion.span>

      <motion.div
        className="inline-block"
        style={{
          border: "3px solid #D7F205",
          padding: "4px 12px 0px 12px",
          marginTop: 6,
          marginBottom: 6,
          maxWidth: "fit-content",
          backgroundColor: "transparent",
        }}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.25, ease: easings.primary }}
      >
        <span
          className="block text-[#D7F205]"
          style={{ fontSize: "clamp(58px, 9.8vw, 100px)", lineHeight: 0.9 }}
        >
          WITH
        </span>
      </motion.div>

      <motion.span
        className="block text-[#F24A05]"
        style={{ fontSize: "clamp(62px, 10.5vw, 106px)" }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease: easings.primary }}
      >
        TASTE.
      </motion.span>

      <motion.p
        className="font-mono text-[#E8E8E8] normal-case mt-5"
        style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.02em",
          lineHeight: 1.5,
          maxWidth: 420,
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easings.primary }}
      >
        Pressure tested builds with clean internals.
      </motion.p>

      <motion.div
        className="mt-7"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easings.primary }}
      >
        <CTATablet />
      </motion.div>
    </div>
  );
}

function HeroPortraitTabletPortrait() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 440 }}>
      <motion.div
        className="relative"
        style={{
          width: "100%",
          aspectRatio: "4 / 5",
          border: "5px solid #050505",
          boxShadow: "10px 10px 0 #F4EFE6",
          background: "#1F1F1F",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: easings.primary }}
      >
        <img
          src="/images/me2.jpeg"
          alt="Adith Manikonda"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 24%",
            filter: "grayscale(100%) contrast(1.18)",
            transform: "scale(1.02)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center gap-3 bg-[#D7F205]"
        style={{
          width: 210,
          height: 42,
          bottom: 16,
          right: -10,
          rotate: "-5deg",
          border: "4px solid #050505",
          boxShadow: "8px 8px 0 #F24A05",
          zIndex: 20,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.7, ease: easings.primary }}
      >
        <span
          className="text-[#050505] text-[12px] font-black uppercase tracking-[0.04em] leading-none"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          OPEN TO INTERN
        </span>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Helper: Mobile Headline
// ═══════════════════════════════════════════════════════════════
function HeadlineMobile() {
  return (
    <div
      className="flex flex-col select-none uppercase"
      style={{
        fontFamily: "var(--font-anton), 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.06em",
        lineHeight: 0.88,
        marginTop: -10,
      }}
    >
      <motion.span
        className="block text-[#F4EFE6]"
        style={{
          fontSize: "clamp(65px, 19vw, 114px)",
          lineHeight: 0.88,
          marginTop: -35,
          marginBottom: 0,
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: easings.primary }}
      >
        BACKEND
      </motion.span>

      <motion.div
        className="inline-block"
        style={{
          border: "3px solid #D7F205",
          padding: "3px 12px 0px 12px",
          marginTop: 4,
          marginBottom: 2,
          maxWidth: "fit-content",
        }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: easings.primary }}
      >
        <span
          className="block text-[#D7F205]"
          style={{ fontSize: "clamp(61px, 18vw, 110px)", lineHeight: 0.85 }}
        >
          WITH
        </span>
      </motion.div>

      <motion.span
        className="block text-[#F24A05]"
        style={{
          fontSize: "clamp(65px, 19vw, 114px)",
          lineHeight: 0.88,
          marginTop: 4,
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: easings.primary }}
      >
        TASTE.
      </motion.span>

      <div
        style={{
          width: 48,
          height: 2,
          background: "#D7F205",
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      <motion.p
        className="font-mono text-[#E8E8E8] normal-case"
        style={{
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.5,
          opacity: 0.9,
          marginBottom: 18,
          letterSpacing: "0.01em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: easings.primary }}
      >
        Pressure tested builds with clean internals.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easings.primary }}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: -5,
        }}
      >
        <CTAMobile />
      </motion.div>
    </div>
  );
}

function CTAMobile() {
  return (
    <div style={{ position: "relative", width: 160, height: 40 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#F24A05",
          border: "3px solid #050505",
          transform: "translate(4px, 4px)",
          zIndex: 0,
        }}
      />
      <button
        style={{
          position: "absolute",
          inset: 0,
          background: "#D7F205",
          border: "3px solid #050505",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
          fontSize: 11,
          fontWeight: 900,
          fontFamily: "var(--font-archivo), sans-serif",
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          color: "#050505",
          outline: "none",
        }}
      >
        VIEW WORK
      </button>
    </div>
  );
}

function HeroPortraitMobile() {
  return (
    <div style={{ position: "relative", width: "90%", maxWidth: 268 }}>
      <motion.div
        className="relative"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          border: "4px solid #050505",
          boxShadow: "6px 6px 0 #F4EFE6",
          background: "#1F1F1F",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: easings.primary }}
      >
        <img
          src="/images/me2.jpeg"
          alt="Adith Manikonda"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 24%",
            filter: "grayscale(100%) contrast(1.18)",
            transform: "scale(1.02)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute flex items-center justify-center bg-[#D7F205]"
        style={{
          width: 140,
          height: 32,
          bottom: -6,
          right: -10,
          rotate: "-5deg",
          border: "3px solid #050505",
          boxShadow: "5px 5px 0 #F24A05",
          zIndex: 20,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.6, ease: easings.primary }}
      >
        <span
          className="text-[#050505] text-[9px] font-black uppercase tracking-[0.04em] leading-none"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          OPEN TO INTERN
        </span>
      </motion.div>
    </div>
  );
}
