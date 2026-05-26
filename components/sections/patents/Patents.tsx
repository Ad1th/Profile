"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Magnetic } from "@/components/ui/react-bits";

gsap.registerPlugin(Flip);

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  seed: number;
  size: number;
};

type LabelAnchor = {
  text: string;
  x: number;
  y: number;
  ax: number;
  ay: number;
};

const COLORS = {
  celadon: "#A8D3A8",
  chartreuse: "#C8D45A",
  blue: "#89B8E0",
};

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const PATENT_LABELS: LabelAnchor[] = [
  { text: "OBSTACLE", x: 0.66, y: 0.38, ax: 0.54, ay: 0.45 },
  { text: "STAIRCASE", x: 0.34, y: 0.62, ax: 0.47, ay: 0.59 },
  { text: "PATH", x: 0.69, y: 0.69, ax: 0.55, ay: 0.67 },
  { text: "SIGNAL", x: 0.39, y: 0.31, ax: 0.47, ay: 0.39 },
];

function humanPoint(index: number, count: number, width: number, height: number) {
  const t = index / count;
  const cx = width * 0.53;
  const cy = height * 0.53;
  const jitter = (Math.sin(index * 12.9898) * 43758.5453) % 1;

  if (t < 0.18) {
    const a = index * 2.39996;
    const r = Math.sqrt(t / 0.18) * Math.min(width, height) * 0.065;
    return { x: cx + Math.cos(a) * r * 0.86, y: cy - height * 0.22 + Math.sin(a) * r * 1.1 };
  }

  if (t < 0.58) {
    const local = (t - 0.18) / 0.4;
    const y = cy - height * 0.12 + local * height * 0.31;
    const half = Math.sin(local * Math.PI) * width * 0.082 + width * 0.02;
    const side = Math.sin(index * 5.17) * half;
    return { x: cx + side + (jitter - 0.5) * 10, y };
  }

  if (t < 0.78) {
    const local = (t - 0.58) / 0.2;
    const side = index % 2 === 0 ? -1 : 1;
    return {
      x: cx + side * (width * 0.075 + local * width * 0.095) + Math.sin(local * 8 + index) * 5,
      y: cy - height * 0.05 + local * height * 0.22,
    };
  }

  const local = (t - 0.78) / 0.22;
  const side = index % 2 === 0 ? -1 : 1;
  return {
    x: cx + side * (width * 0.025 + local * width * 0.055) + Math.sin(index) * 5,
    y: cy + height * 0.16 + local * height * 0.25,
  };
}

function wavePoint(index: number, count: number, width: number, height: number) {
  const line = index % 7;
  const t = (index / count + line * 0.137) % 1;
  const x = width * (0.29 + t * 0.65);
  const base = height * (0.29 + line * 0.072);
  const y =
    base +
    Math.sin(t * Math.PI * (2.4 + line * 0.15) + line) * height * 0.025 +
    Math.sin(t * Math.PI * (7.2 + line * 0.21)) * height * 0.01;
  return { x, y };
}

function setTargets(particles: Particle[], mode: "human" | "wave", width: number, height: number) {
  particles.forEach((particle, index) => {
    const target =
      mode === "human"
        ? humanPoint(index, particles.length, width, height)
        : wavePoint(index, particles.length, width, height);
    particle.tx = target.x;
    particle.ty = target.y;
  });
}

export default function Patents() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<"human" | "wave">("human");
  const progressRef = useRef({ labels: 0, rings: 0, waves: 0, assemble: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!canvas || !section || !stage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    const particles: Particle[] = Array.from({ length: 2400 }, (_, index) => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      tx: 0,
      ty: 0,
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      seed: Math.random() * 1000 + index,
      size: Math.random() * 0.95 + 0.45,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setTargets(particles, modeRef.current, width, height);
      particles.forEach((particle, index) => {
        if (!particle.ox && !particle.oy) {
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
        }
        particle.ox = particle.tx + Math.sin(index) * 160;
        particle.oy = particle.ty + Math.cos(index * 0.7) * 110;
      });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .to(progressRef.current, { assemble: 1, duration: 1.6 })
      .to(progressRef.current, { rings: 1, duration: 1.1 }, "-=0.45")
      .to(progressRef.current, { labels: 1, duration: 0.8 }, "-=0.35");

    const drift = gsap.to(stage, {
      x: 2.5,
      y: -2,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const disturbance = gsap.to(stage, {
      scale: 1.003,
      duration: 0.55,
      repeat: -1,
      repeatDelay: 11.5,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 50%",
    });

    const drawHumanSystem = (time: number) => {
      const rings = progressRef.current.rings;
      const cx = width * 0.53;
      const cy = height * 0.52;
      ctx.strokeStyle = `rgba(51, 41, 39, ${0.14 * rings})`;
      ctx.lineWidth = 0.55;
      for (let i = 0; i < 5; i += 1) {
        const radius = (((time * 0.035 + i * 62) % 310) + 36) * rings;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 1.06, radius * 0.78, -0.08, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.font = "10px 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "middle";
      PATENT_LABELS.forEach((label) => {
        const alpha = progressRef.current.labels;
        const x = label.x * width;
        const y = label.y * height;
        const ax = label.ax * width;
        const ay = label.ay * height;
        ctx.strokeStyle = `rgba(51, 41, 39, ${0.2 * alpha})`;
        ctx.fillStyle = `rgba(51, 41, 39, ${0.72 * alpha})`;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(x - 10, y);
        ctx.stroke();
        ctx.fillText(label.text, x, y);
      });
    };

    const drawWaveSystem = (time: number) => {
      const waveAlpha = progressRef.current.waves;
      const palette = [COLORS.celadon, COLORS.chartreuse, COLORS.blue];
      const cursorPull = pointer.active ? 1 : 0;
      for (let line = 0; line < 7; line += 1) {
        ctx.beginPath();
        for (let i = 0; i <= 190; i += 1) {
          const t = i / 190;
          const x = width * (0.29 + t * 0.65);
          const base = height * (0.29 + line * 0.073);
          let y =
            base +
            Math.sin(t * Math.PI * (2.35 + line * 0.16) + line + time * 0.006) * height * 0.026 +
            Math.sin(t * Math.PI * (7.4 + line * 0.25) - time * 0.004) * height * 0.01;
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 170 && cursorPull) y += dy * 0.09 * (1 - dist / 170);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hexToRgba(palette[line % palette.length], 0.54 * waveAlpha);
        ctx.lineWidth = line % 3 === 0 ? 0.85 : 0.62;
        ctx.stroke();

        const nodeTexts = ["V", "I", "P", "η"];
        const numberTexts = ["48.2", "164", "92%"];
        const t = (time * (0.00008 + line * 0.000008) + line * 0.16) % 1;
        const nx = width * (0.29 + t * 0.65);
        const ny =
          height * (0.29 + line * 0.073) +
          Math.sin(t * Math.PI * (2.35 + line * 0.16) + line + time * 0.006) * height * 0.026;
        ctx.fillStyle = `rgba(51, 41, 39, ${0.72 * waveAlpha})`;
        ctx.font = "10px 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(nodeTexts[line % nodeTexts.length], nx + 5, ny - 5);
        if (line % 2 === 0 && Math.sin(time * 0.0012 + line) > 0.74) {
          ctx.fillStyle = `rgba(51, 41, 39, ${0.32 * waveAlpha})`;
          ctx.fillText(numberTexts[line % numberTexts.length], nx + 18, ny + 14);
        }
      }
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      if (modeRef.current === "human") drawHumanSystem(time);
      else drawWaveSystem(time);

      particles.forEach((particle, index) => {
        const breathe = Math.sin(time * 0.0015 + particle.seed) * 2.8;
        const driftX = Math.sin(time * 0.0008 + particle.seed * 0.31) * 2.2;
        const driftY = Math.cos(time * 0.0007 + particle.seed * 0.27) * 2.2;
        let targetX = particle.tx + driftX;
        let targetY = particle.ty + driftY + breathe;

        if (modeRef.current === "human") {
          const assembly = progressRef.current.assemble;
          targetX = particle.ox + (targetX - particle.ox) * assembly;
          targetY = particle.oy + (targetY - particle.oy) * assembly;
        }

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = modeRef.current === "human" ? 92 : 130;
          if (dist < radius && dist > 0.1) {
            const force = (1 - dist / radius) * (modeRef.current === "human" ? 3.2 : 1.1);
            if (modeRef.current === "human") {
              particle.vx += (dx / dist) * force;
              particle.vy += (dy / dist) * force;
            } else {
              targetY += (pointer.y - particle.y) * 0.055 * (1 - dist / radius);
            }
          }
        }

        particle.vx += (targetX - particle.x) * 0.018;
        particle.vy += (targetY - particle.y) * 0.018;
        particle.vx *= 0.86;
        particle.vy *= 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.fillStyle =
          modeRef.current === "human" ? "rgba(51, 41, 39, 0.58)" : "rgba(51, 41, 39, 0.36)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (modeRef.current === "human" && index % 54 === 0) {
          const next = particles[index + 11];
          if (next) {
            const dx = next.x - particle.x;
            const dy = next.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 42) {
              ctx.strokeStyle = "rgba(51, 41, 39, 0.055)";
              ctx.lineWidth = 0.45;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(next.x, next.y);
              ctx.stroke();
            }
          }
        }
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const leave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    const activate = (mode: "human" | "wave") => {
      if (modeRef.current === mode) return;
      const state = Flip.getState(stage.querySelectorAll("[data-flip-patent]"));
      modeRef.current = mode;
      stage.dataset.mode = mode;
      setTargets(particles, mode, width, height);
      progressRef.current.labels = mode === "human" ? 0 : progressRef.current.labels;
      progressRef.current.rings = mode === "human" ? 0 : progressRef.current.rings;
      progressRef.current.waves = mode === "wave" ? 0 : progressRef.current.waves;
      Flip.from(state, { duration: 0.8, ease: "power3.inOut", absolute: true });

      gsap.timeline()
        .to(progressRef.current, {
          labels: mode === "human" ? 1 : 0,
          rings: mode === "human" ? 1 : 0,
          waves: mode === "wave" ? 1 : 0,
          duration: 0.9,
          ease: "power2.inOut",
        })
        .to(
          particles,
          {
            vx: () => (Math.random() - 0.5) * 8,
            vy: () => (Math.random() - 0.5) * 8,
            duration: 0.24,
            stagger: { each: 0.00018, from: "random" },
            ease: "power3.out",
          },
          0,
        );
    };

    const buttons = Array.from(section.querySelectorAll<HTMLButtonElement>("[data-patent-mode]"));
    const listeners = buttons.map((button) => {
      const mode = button.dataset.patentMode === "wave" ? "wave" : "human";
      const handler = () => activate(mode);
      button.addEventListener("mouseenter", handler);
      button.addEventListener("focus", handler);
      return { button, handler };
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      intro.kill();
      drift.kill();
      disturbance.kill();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      listeners.forEach(({ button, handler }) => {
        button.removeEventListener("mouseenter", handler);
        button.removeEventListener("focus", handler);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="patents"
      className="patents-installation relative min-h-screen overflow-hidden bg-[#F2EDE5] text-[#332927]"
      style={{ isolation: "isolate" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(51,41,39,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(51,41,39,.6)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.03] mix-blend-multiply" />

      <div
        ref={stageRef}
        data-mode="human"
        className="relative min-h-screen px-5 py-20 sm:px-8 lg:px-12"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-crosshair"
          aria-label="Interactive patent particle systems"
        />

        <div className="pointer-events-none relative z-10 grid min-h-[calc(100vh-10rem)] grid-cols-1 gap-10 lg:grid-cols-[minmax(290px,0.38fr)_1fr]">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="patents-hand text-[clamp(6.4rem,18vw,17.5rem)] leading-[0.72] text-[#332927]">
                <span>PAT</span>
                <span>ENTS</span>
              </h2>
              <div className="mt-10 space-y-1 font-mono text-[10px] font-medium uppercase tracking-[0.13em] text-[#332927] sm:text-[11px]">
                <p>02 RECORDS</p>
                <p>2026</p>
                <p>
                  STATUS: <span className="text-[#9CA83F]">PUBLISHED</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[52vh] lg:min-h-0" />
        </div>

        <div className="pointer-events-auto absolute right-8 top-[42%] z-30 flex -translate-y-1/2 flex-col gap-10 font-mono text-[11px] tracking-[0.2em] sm:right-12 lg:right-[9vw]">
          <Magnetic strength={0.35}>
            <button
              data-flip-patent
              data-patent-mode="human"
              className="patent-mode text-[#332927] transition-colors hover:text-[#9CA83F] focus:outline-none"
              type="button"
              aria-label="Activate blind assistance system"
            >
              01
            </button>
          </Magnetic>
          <Magnetic strength={0.35}>
            <button
              data-flip-patent
              data-patent-mode="wave"
              className="patent-mode text-[#332927] transition-colors hover:text-[#9CA83F] focus:outline-none"
              type="button"
              aria-label="Activate wave energy harvester"
            >
              02
            </button>
          </Magnetic>
        </div>

        <div className="pointer-events-none absolute right-5 top-7 z-20 font-mono text-[9px] uppercase tracking-[0.16em] text-[#332927] sm:right-8 lg:right-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <span>FILED</span>
            <span className="h-px w-8 bg-[#332927]/35 sm:w-14" />
            <span className="relative text-[#332927]">
              PUBLISHED
              <span className="absolute left-1/2 top-5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#C8D45A] patents-pulse" />
            </span>
            <span className="h-px w-8 bg-[#332927]/35 sm:w-14" />
            <span>GRANTED</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .patents-hand {
          width: max-content;
          font-family: "April 10", "Amatic SC", "Bradley Hand", "Segoe Print", cursive;
          font-weight: 300;
          letter-spacing: 0.015em;
          transform: rotate(-1.15deg) scaleX(0.73) scaleY(1.08);
          transform-origin: left top;
          filter: url("#rough-text");
          text-shadow:
            0.35px 0 rgba(51, 41, 39, 0.26),
            -0.35px 0.25px rgba(51, 41, 39, 0.12);
        }

        .patents-hand span {
          display: block;
        }

        .patents-hand span:nth-child(2) {
          margin-left: 0.06em;
        }

        .patent-mode {
          font-variant-numeric: tabular-nums;
        }

        [data-mode="human"] [data-patent-mode="human"],
        [data-mode="wave"] [data-patent-mode="wave"] {
          transform: translateX(11px);
          color: #9ca83f;
        }

        [data-mode="wave"] [data-patent-mode="human"],
        [data-mode="human"] [data-patent-mode="wave"] {
          transform: translateX(0);
        }

        .patents-pulse {
          animation: patentsPulse 1.9s ease-in-out infinite;
        }

        @keyframes patentsPulse {
          0%,
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.72;
          }
          50% {
            transform: translateX(-50%) scale(1.9);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .patents-hand {
            transform: rotate(-1deg) scaleX(0.74) scaleY(1.04);
          }
        }
      `}</style>

      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id="rough-text">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.09" numOctaves="2" seed="8" />
          <feDisplacementMap in="SourceGraphic" scale="1.35" />
        </filter>
      </svg>
    </section>
  );
}
