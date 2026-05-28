"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── types ─────────────── */
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
type PathNumbers = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

/* ─────────────── colours ─────────────── */
const COLORS = {
  humanInk: "#6B5B53",
  humanText: "#2A2624",
  humanAccent: "#A58D8D",
  waveA: "#4F6B67",
  waveB: "#6E7F68",
  waveC: "#2D4B4A",
  waveAccent: "#8B6A52",
};

/* ─────────────── patent data ─────────────── */
const PATENTS = [
  {
    id: "human" as const,
    title:
      "A System for Real Time Environmental Perception and Assistance for a Visually Impaired User",
    application: "202641010249",
    published: "13 FEB 2026",
    filed: "31 JAN 2026",
    status: "published" as const,
  },
  {
    id: "wave" as const,
    title:
      "Wave Energy Generator Electrical Circuit with Maximum Power Point Tracking and IoT Telemetry System",
    application: "202641032830",
    published: "18 MAR 2026",
    filed: "18 MAR 2026",
    status: "published" as const,
  },
];

/* ─────────────── path helpers ─────────────── */
function hexToRgba(hex: string, alpha: number) {
  const v = hex.replace("#", "");
  return `rgba(${parseInt(v.slice(0, 2), 16)},${parseInt(v.slice(2, 4), 16)},${parseInt(v.slice(4, 6), 16)},${alpha})`;
}
function pathFromNumbers(v: PathNumbers) {
  return `M ${v[0]} ${v[1]} C ${v[2]} ${v[3]} ${v[4]} ${v[5]} ${v[6]} ${v[7]} C ${v[8]} ${v[9]} ${v[10]} ${v[11]} ${v[12]} ${v[13]}`;
}
function lerpPath(a: PathNumbers, b: PathNumbers, p: number): PathNumbers {
  return a.map((val, i) => val + (b[i] - val) * p) as PathNumbers;
}
function humanTracePath(line: number, w: number, h: number): PathNumbers {
  const cx = w * 0.53,
    cy = h * 0.52,
    spread = (line - 3) * w * 0.018,
    lift = Math.sin(line * 1.7) * h * 0.035;
  return [
    cx - w * 0.07 + spread,
    cy - h * 0.18 + lift,
    cx - w * 0.03 + spread,
    cy - h * 0.08 - lift,
    cx + w * 0.035 + spread,
    cy + h * 0.04 + lift,
    cx + w * 0.015 + spread,
    cy + h * 0.16 - lift,
    cx - w * 0.03 + spread,
    cy + h * 0.25 + lift,
    cx + w * 0.06 + spread,
    cy + h * 0.26 - lift,
    cx + w * 0.09 + spread,
    cy + h * 0.34 + lift,
  ];
}
function waveTracePath(line: number, w: number, h: number): PathNumbers {
  const y = h * (0.2 + line * 0.09),
    amp = h * (0.025 + (line % 3) * 0.006),
    phase = line % 2 === 0 ? 1 : -1;
  return [
    w * 0.04,
    y,
    w * 0.2,
    y - amp * phase,
    w * 0.31,
    y + amp * 1.7 * phase,
    w * 0.45,
    y - amp * 0.7 * phase,
    w * 0.6,
    y - amp * 2.1 * phase,
    w * 0.78,
    y + amp * 1.3 * phase,
    w * 0.96,
    y - amp * 0.45 * phase,
  ];
}
const LABELS_HUMAN = [
  { text: "OBSTACLE", x: 0.66, y: 0.38, ax: 0.54, ay: 0.45 },
  { text: "STAIRCASE", x: 0.34, y: 0.62, ax: 0.47, ay: 0.59 },
  { text: "PATH", x: 0.69, y: 0.69, ax: 0.55, ay: 0.67 },
  { text: "SIGNAL", x: 0.39, y: 0.31, ax: 0.47, ay: 0.39 },
];
function humanPoint(i: number, count: number, w: number, h: number) {
  const t = i / count,
    cx = w * 0.53,
    cy = h * 0.53,
    jitter = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  if (t < 0.18) {
    const a = i * 2.39996,
      r = Math.sqrt(t / 0.18) * Math.min(w, h) * 0.065;
    return {
      x: cx + Math.cos(a) * r * 0.86,
      y: cy - h * 0.22 + Math.sin(a) * r * 1.1,
    };
  }
  if (t < 0.58) {
    const local = (t - 0.18) / 0.4,
      y = cy - h * 0.12 + local * h * 0.31,
      half = Math.sin(local * Math.PI) * w * 0.082 + w * 0.02,
      side = Math.sin(i * 5.17) * half;
    return { x: cx + side + (jitter - 0.5) * 10, y };
  }
  if (t < 0.78) {
    const local = (t - 0.58) / 0.2,
      side = i % 2 === 0 ? -1 : 1;
    return {
      x:
        cx +
        side * (w * 0.075 + local * w * 0.095) +
        Math.sin(local * 8 + i) * 5,
      y: cy - h * 0.05 + local * h * 0.22,
    };
  }
  const local = (t - 0.78) / 0.22,
    side = i % 2 === 0 ? -1 : 1;
  return {
    x: cx + side * (w * 0.025 + local * w * 0.055) + Math.sin(i) * 5,
    y: cy + h * 0.16 + local * h * 0.25,
  };
}
function wavePoint(i: number, count: number, w: number, h: number) {
  const line = i % 7,
    t = (i / count + line * 0.137) % 1,
    x = w * (0.29 + t * 0.65),
    base = h * (0.29 + line * 0.072);
  return {
    x,
    y:
      base +
      Math.sin(t * Math.PI * (2.4 + line * 0.15) + line) * h * 0.025 +
      Math.sin(t * Math.PI * (7.2 + line * 0.21)) * h * 0.01,
  };
}
function setTargets(
  particles: Particle[],
  mode: "human" | "wave",
  w: number,
  h: number,
) {
  particles.forEach((p, i) => {
    const t =
      mode === "human"
        ? humanPoint(i, particles.length, w, h)
        : wavePoint(i, particles.length, w, h);
    p.tx = t.x;
    p.ty = t.y;
  });
}

/* ─────────────── component ─────────────── */
export default function Patents() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // text refs — patent 1
  const p1TitleRef = useRef<HTMLDivElement>(null);
  const p1AppRef = useRef<HTMLDivElement>(null);
  const p1PubRef = useRef<HTMLDivElement>(null);
  const p1TimeRef = useRef<HTMLDivElement>(null);
  const p1IndexRef = useRef<HTMLDivElement>(null);

  // text refs — patent 2
  const p2TitleRef = useRef<HTMLDivElement>(null);
  const p2AppRef = useRef<HTMLDivElement>(null);
  const p2PubRef = useRef<HTMLDivElement>(null);
  const p2TimeRef = useRef<HTMLDivElement>(null);
  const p2IndexRef = useRef<HTMLDivElement>(null);

  // heading
  const headRef = useRef<HTMLHeadingElement>(null);

  const modeRef = useRef<"human" | "wave">("human");
  const prog = useRef({
    labels: 0,
    rings: 0,
    waves: 0,
    assemble: 0,
    tLines: 0,
    nodes: 0,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!wrap || !sticky || !canvas || !svg) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── canvas setup ── */
    let W = 0,
      H = 0,
      dpr = 1,
      raf = 0;
    const ptr = { x: -9999, y: -9999, active: false };
    const wavePaths = Array.from(
      svg.querySelectorAll<SVGPathElement>("[data-wp]"),
    );
    const particles: Particle[] = Array.from({ length: 2400 }, (_, i) => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      tx: 0,
      ty: 0,
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      seed: Math.random() * 1000 + i,
      size: Math.random() * 0.95 + 0.45,
    }));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setTargets(particles, modeRef.current, W, H);
      wavePaths.forEach((p, i) => {
        p.setAttribute(
          "d",
          pathFromNumbers(
            modeRef.current === "wave"
              ? waveTracePath(i, W, H)
              : humanTracePath(i, W, H),
          ),
        );
      });
      particles.forEach((p, i) => {
        if (!p.ox && !p.oy) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
        }
        p.ox = p.tx + Math.sin(i) * 160;
        p.oy = p.ty + Math.cos(i * 0.7) * 110;
      });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── draw human system ── */
    const drawHuman = (t: number) => {
      const rings = prog.current.rings,
        cx = W * 0.53,
        cy = H * 0.52;
      ctx.strokeStyle = hexToRgba(COLORS.humanInk, 0.18 * rings);
      ctx.lineWidth = 0.55;
      for (let i = 0; i < 5; i++) {
        const r = (((t * 0.035 + i * 62) % 310) + 36) * rings;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 1.06, r * 0.78, -0.08, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.font = "10px 'JetBrains Mono',ui-monospace,monospace";
      ctx.textBaseline = "middle";
      LABELS_HUMAN.forEach((label) => {
        const a = prog.current.labels,
          x = label.x * W,
          y = label.y * H,
          ax = label.ax * W,
          ay = label.ay * H;
        ctx.strokeStyle = hexToRgba(COLORS.humanInk, 0.24 * a);
        ctx.fillStyle = hexToRgba(COLORS.humanText, 0.72 * a);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(x - 10, y);
        ctx.stroke();
        ctx.fillText(label.text, x, y);
      });
    };

    /* ── draw wave system ── */
    const drawWave = (t: number) => {
      const wa = prog.current.waves,
        pal = [COLORS.waveA, COLORS.waveB, COLORS.waveAccent];
      const cursorPull = ptr.active ? 1 : 0,
        nodeSpeed = ptr.active ? 1.9 : 1;
      for (let line = 0; line < 8; line++) {
        ctx.beginPath();
        for (let i = 0; i <= 190; i++) {
          const s = i / 190,
            x = W * (0.04 + s * 0.92),
            base = H * (0.2 + line * 0.09);
          let y =
            base +
            Math.sin(s * Math.PI * (2.15 + line * 0.19) + line + t * 0.006) *
              H *
              0.03 +
            Math.sin(s * Math.PI * (8.4 + line * 0.25) - t * 0.004) * H * 0.012;
          const dx = ptr.x - x,
            dy = ptr.y - y,
            dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 190 && cursorPull) y += dy * 0.18 * (1 - dist / 190);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hexToRgba(pal[line % pal.length], 0.54 * wa);
        ctx.lineWidth = line % 3 === 0 ? 0.85 : 0.62;
        ctx.stroke();
        const nTxt = ["V", "I", "P", "η"],
          numTxt = ["48.2V", "164W", "92%"];
        const s =
          (t * (0.00008 + line * 0.000008) * nodeSpeed + line * 0.16) % 1;
        const nx = W * (0.04 + s * 0.92),
          ny =
            H * (0.2 + line * 0.09) +
            Math.sin(s * Math.PI * (2.15 + line * 0.19) + line + t * 0.006) *
              H *
              0.03;
        ctx.fillStyle = `rgba(232,221,208,${0.72 * wa * prog.current.nodes})`;
        ctx.font = "10px 'JetBrains Mono',ui-monospace,monospace";
        ctx.fillText(nTxt[line % nTxt.length], nx + 5, ny - 5);
        ctx.strokeStyle = hexToRgba(pal[(line + 1) % pal.length], 0.34 * wa);
        ctx.beginPath();
        ctx.arc(
          nx - 5,
          ny,
          2.3 + Math.sin(t * 0.006 + line) * 0.7,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
        if (line % 2 === 0 && Math.sin(t * 0.0012 + line) > 0.74) {
          ctx.fillStyle = `rgba(232,221,208,${0.42 * wa})`;
          ctx.fillText(numTxt[line % numTxt.length], nx + 18, ny + 14);
        }
        const ps = (t * 0.00016 * nodeSpeed + line * 0.21) % 1;
        const px = W * (0.04 + ps * 0.92),
          py =
            H * (0.2 + line * 0.09) +
            Math.sin(ps * Math.PI * (2.15 + line * 0.19) + line + t * 0.006) *
              H *
              0.03;
        ctx.fillStyle = hexToRgba(pal[(line + 2) % pal.length], 0.52 * wa);
        ctx.fillRect(px, py - 0.5, 8, 1);
      }
    };

    /* ── render loop ── */
    const render = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      if (modeRef.current === "human") drawHuman(t);
      else drawWave(t);

      particles.forEach((p, i) => {
        const breathe = Math.sin(t * 0.0015 + p.seed) * 2.8;
        const dX = Math.sin(t * 0.0008 + p.seed * 0.31) * 2.2,
          dY = Math.cos(t * 0.0007 + p.seed * 0.27) * 2.2;
        let tx = p.tx + dX,
          ty = p.ty + dY + breathe;
        if (modeRef.current === "human") {
          const a = prog.current.assemble;
          tx = p.ox + (tx - p.ox) * a;
          ty = p.oy + (ty - p.oy) * a;
        }
        if (ptr.active) {
          const dx = p.x - ptr.x,
            dy = p.y - ptr.y,
            dist = Math.sqrt(dx * dx + dy * dy);
          const rad = modeRef.current === "human" ? 92 : 130;
          if (dist < rad && dist > 0.1) {
            const force =
              (1 - dist / rad) * (modeRef.current === "human" ? 3.2 : 1.1);
            if (modeRef.current === "human") {
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            } else ty += (ptr.y - p.y) * 0.055 * (1 - dist / rad);
          }
        }
        p.vx += (tx - p.x) * 0.018;
        p.vy += (ty - p.y) * 0.018;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        if (modeRef.current === "human" || prog.current.tLines > 0.01) {
          ctx.fillStyle =
            modeRef.current === "human"
              ? hexToRgba(COLORS.humanInk, 0.58)
              : "rgba(232,221,208,0.18)";
          ctx.beginPath();
          ctx.arc(
            p.x,
            p.y,
            modeRef.current === "human" ? p.size : 0.35,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        if (
          (modeRef.current === "human" || prog.current.tLines > 0.01) &&
          i % 54 === 0
        ) {
          const next = particles[i + 11];
          if (next) {
            const dx = next.x - p.x,
              dy = next.y - p.y,
              dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 42) {
              ctx.strokeStyle =
                modeRef.current === "human"
                  ? hexToRgba(COLORS.humanInk, 0.08)
                  : `rgba(232,221,208,${0.14 * prog.current.tLines})`;
              ctx.lineWidth = modeRef.current === "human" ? 0.45 : 0.65;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(next.x, next.y);
              ctx.stroke();
            }
          }
        }
      });
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const stickyEl = stickyRef.current!;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
      ptr.active = true;
    };
    const onLeave = () => {
      ptr.active = false;
      ptr.x = -9999;
      ptr.y = -9999;
    };
    stickyEl.addEventListener("pointermove", onMove as EventListener);
    stickyEl.addEventListener("pointerleave", onLeave);

    /* ── transition between modes ── */
    const switchMode = (mode: "human" | "wave") => {
      if (modeRef.current === mode) return;
      const fromMode = modeRef.current;
      const pathTweens = wavePaths.map((path, i) => {
        const s = { p: 0 };
        const from =
          fromMode === "wave"
            ? waveTracePath(i, W, H)
            : humanTracePath(i, W, H);
        const to =
          mode === "wave" ? waveTracePath(i, W, H) : humanTracePath(i, W, H);
        return gsap.to(s, {
          p: 1,
          duration: 1.2,
          ease: "power3.inOut",
          onUpdate: () => {
            path.setAttribute("d", pathFromNumbers(lerpPath(from, to, s.p)));
          },
        });
      });
      modeRef.current = mode;
      stickyEl.dataset.mode = mode;
      gsap.to(".patent-bg--human", {
        opacity: mode === "human" ? 1 : 0,
        duration: 0.9,
        ease: "power2.inOut",
      });
      gsap.to(".patent-bg--wave", {
        opacity: mode === "wave" ? 1 : 0,
        duration: 0.9,
        ease: "power2.inOut",
      });
      setTargets(particles, mode, W, H);
      prog.current.labels = mode === "human" ? 0 : prog.current.labels;
      prog.current.rings = mode === "human" ? 0 : prog.current.rings;
      prog.current.waves = mode === "wave" ? 0 : prog.current.waves;
      prog.current.nodes = 0;
      gsap
        .timeline()
        .to(prog.current, { tLines: 1, duration: 0.42, ease: "power3.out" }, 0)
        .to(
          prog.current,
          { tLines: 0, duration: 0.7, ease: "power2.inOut" },
          0.58,
        )
        .to(prog.current, {
          labels: mode === "human" ? 1 : 0,
          rings: mode === "human" ? 1 : 0,
          waves: mode === "wave" ? 1 : 0,
          assemble: mode === "human" ? 1 : prog.current.assemble,
          duration: 1.15,
          ease: "power3.inOut",
        })
        .to(
          prog.current,
          {
            nodes: mode === "wave" ? 1 : 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.88,
        )
        .to(
          particles,
          {
            vx: () => (Math.random() - 0.5) * 18,
            vy: () => (Math.random() - 0.5) * 18,
            duration: 0.28,
            stagger: { each: 0.00018, from: "random" },
            ease: "power3.out",
          },
          0,
        )
        .eventCallback("onComplete", () => {
          pathTweens.forEach((t) => t.kill());
          wavePaths.forEach((path, i) => {
            path.setAttribute(
              "d",
              pathFromNumbers(
                mode === "wave"
                  ? waveTracePath(i, W, H)
                  : humanTracePath(i, W, H),
              ),
            );
          });
        });
    };

    /* ── particle intro ── */
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(prog.current, { assemble: 1, duration: 1.6 })
      .to(prog.current, { rings: 1, duration: 1.1 }, "-=0.45")
      .to(prog.current, { labels: 1, duration: 0.8 }, "-=0.35");

    /* ════════════════════════════════════════════
       SCROLL-LOCKED CINEMATIC SEQUENCE
       Total scroll height = 400vh
       Phase 0–33%  : Patent 1 enters
       Phase 33–50% : Patent 1 holds
       Phase 50–66% : Patent 1 exits / Patent 2 enters + canvas switches
       Phase 66–100%: Patent 2 holds + exits at very end
    ═══════════════════════════════════════════════ */

    const p1 = {
      title: p1TitleRef.current,
      app: p1AppRef.current,
      pub: p1PubRef.current,
      time: p1TimeRef.current,
      idx: p1IndexRef.current,
    };
    const p2 = {
      title: p2TitleRef.current,
      app: p2AppRef.current,
      pub: p2PubRef.current,
      time: p2TimeRef.current,
      idx: p2IndexRef.current,
    };
    const head = headRef.current;

    /* set initial states */
    const p1Els = [p1.idx, p1.title, p1.app, p1.pub, p1.time].filter(Boolean);
    const p2Els = [p2.idx, p2.title, p2.app, p2.pub, p2.time].filter(Boolean);
    const headLetters = head
      ? Array.from(head.querySelectorAll<HTMLSpanElement>(".ltr"))
      : [];

    gsap.set(headLetters, {
      opacity: 0,
      y: 30,
      rotate: () => (Math.random() - 0.5) * 9,
    });
    gsap.set(p1Els, { opacity: 0, y: 24 });
    gsap.set(p2Els, { opacity: 0, y: 24 });

    /* timeline scrubbed by ScrollTrigger */
    const tl = gsap.timeline({ paused: true });

    /* — heading in — */
    tl.to(
      headLetters,
      {
        opacity: 1,
        y: 0,
        rotate: () => (Math.random() - 0.5) * 2.5,
        duration: 1,
        stagger: 0.06,
        ease: "power2.out",
      },
      0,
    );

    /* — patent 1 in — staggered lines */
    tl.to(p1.idx, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.3);
    tl.to(
      p1.title,
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      0.45,
    );
    tl.to(p1.app, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.6);
    tl.to(
      p1.pub,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.72,
    );
    tl.to(
      p1.time,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.84,
    );

    /* — patent 1 hold (timeline just idles) — */
    tl.to({}, { duration: 0.6 }, 1.2); // spacer

    /* — patent 1 exit + canvas switch — */
    tl.to(
      p1Els,
      {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
      },
      1.8,
    );

    /* — patent 2 in — */
    tl.to(p2.idx, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 2.2);
    tl.to(
      p2.title,
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      2.35,
    );
    tl.to(p2.app, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 2.5);
    tl.to(
      p2.pub,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      2.62,
    );
    tl.to(
      p2.time,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      2.74,
    );

    /* — patent 2 hold — */
    tl.to({}, { duration: 0.5 }, 3.1);

    /* — patent 2 + heading exit — */
    tl.to(
      [...p2Els, ...headLetters],
      {
        opacity: 0,
        y: -18,
        duration: 0.6,
        stagger: 0.03,
        ease: "power2.in",
      },
      3.6,
    );

    ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4,
      animation: tl,
    });

    /* canvas mode switch — bidirectional so scroll-back reverses it */
    ScrollTrigger.create({
      trigger: wrap,
      start: "48% top",
      end: "52% top",
      onEnter: () => switchMode("wave"),
      onLeaveBack: () => switchMode("human"),
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      stickyEl.removeEventListener(
        "pointermove",
        onMove as unknown as EventListener,
      );
      stickyEl.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="patents-wrap"
      style={{ height: "450vh", position: "relative" }}
    >
      {/* ── sticky viewport ── */}
      <div
        ref={stickyRef}
        className="patents-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#D9E1E8",
        }}
      >
        <div className="patent-bg patent-bg--human" />
        <div className="patent-bg patent-bg--wave" />
        {/* grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(var(--patent-muted)_1px,transparent_1px),linear-gradient(90deg,var(--patent-muted)_1px,transparent_1px)] [background-size:72px_72px]" />

        {/* canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        <svg
          ref={svgRef}
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              data-wp
              vectorEffect="non-scaling-stroke"
              fill="none"
              stroke={
                i % 3 === 0
                  ? COLORS.waveA
                  : i % 3 === 1
                    ? COLORS.waveB
                    : COLORS.waveAccent
              }
              strokeWidth={i % 3 === 0 ? 0.7 : 0.5}
              strokeOpacity={0.22}
            />
          ))}
        </svg>

        {/* ── UI layer ── */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col px-8 py-10 sm:px-14 lg:px-20">
          {/* heading */}
          <h2
            ref={headRef}
            className="patents-head select-none"
            aria-label="Patents"
          >
            {"PATENTS".split("").map((ch, i) => (
              <span key={i} className="ltr">
                {ch}
              </span>
            ))}
          </h2>

          {/* patent content — both patents, absolutely stacked */}
          <div className="relative mt-auto mb-16 flex-1">
            {/* ── PATENT 1 ── */}
            <div className="patent-copy patent-copy--human absolute bottom-0 left-0 w-full max-w-2xl space-y-7">
              <div
                ref={p1IndexRef}
                className="patent-meta font-mono text-[10px] tracking-[0.22em] uppercase"
              >
                01 / 02
              </div>
              <div ref={p1TitleRef} className="patent-title">
                {PATENTS[0].title}
              </div>
              <div
                ref={p1AppRef}
                className="patent-meta font-mono text-[11px] tracking-[0.14em] uppercase"
              >
                {PATENTS[0].application}
              </div>
              <div
                ref={p1PubRef}
                className="patent-meta font-mono text-[11px] tracking-[0.14em] uppercase"
              >
                Published &nbsp;{PATENTS[0].published}
              </div>
              <div ref={p1TimeRef}>
                <StatusLine
                  filed={PATENTS[0].filed}
                  status={PATENTS[0].status}
                  tone="human"
                />
              </div>
            </div>

            {/* ── PATENT 2 ── */}
            <div className="patent-copy patent-copy--wave absolute bottom-0 left-0 w-full max-w-2xl space-y-7">
              <div
                ref={p2IndexRef}
                className="patent-meta font-mono text-[10px] tracking-[0.22em] uppercase"
              >
                02 / 02
              </div>
              <div ref={p2TitleRef} className="patent-title">
                {PATENTS[1].title}
              </div>
              <div
                ref={p2AppRef}
                className="patent-meta font-mono text-[11px] tracking-[0.14em] uppercase"
              >
                {PATENTS[1].application}
              </div>
              <div
                ref={p2PubRef}
                className="patent-meta font-mono text-[11px] tracking-[0.14em] uppercase"
              >
                Published &nbsp;{PATENTS[1].published}
              </div>
              <div ref={p2TimeRef}>
                <StatusLine
                  filed={PATENTS[1].filed}
                  status={PATENTS[1].status}
                  tone="wave"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SVG filter */}
        <svg
          className="pointer-events-none absolute h-0 w-0"
          aria-hidden="true"
        >
          <filter id="rough-head">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.09"
              numOctaves="2"
              seed="8"
            />
            <feDisplacementMap in="SourceGraphic" scale="1.2" />
          </filter>
        </svg>
      </div>

      <style jsx>{`
        .patent-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.9s ease;
        }
        .patent-bg--human {
          background:
            radial-gradient(
              circle at 70% 22%,
              rgba(165, 141, 141, 0.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 18% 78%,
              rgba(107, 91, 83, 0.08),
              transparent 30%
            ),
            #d9e1e8;
          opacity: 1;
        }
        .patent-bg--wave {
          background:
            linear-gradient(
              135deg,
              rgba(79, 107, 103, 0.96),
              rgba(45, 75, 74, 0.98)
            ),
            radial-gradient(
              circle at 78% 68%,
              rgba(139, 106, 82, 0.22),
              transparent 30%
            );
          opacity: 0;
        }
        .patents-head {
          font-family:
            var(--font-handdrawn), "Bradley Hand", "Segoe Print", cursive;
          font-weight: 300;
          font-size: clamp(7rem, 19vw, 18rem);
          line-height: 0.76;
          letter-spacing: -0.01em;
          color: #2a2624;
          width: max-content;
          transform: rotate(-0.9deg) scaleX(0.78) scaleY(1.16);
          transform-origin: left top;
          filter: url("#rough-head");
          text-shadow:
            0.3px 0 rgba(51, 41, 39, 0.22),
            -0.3px 0.2px rgba(51, 41, 39, 0.1);
        }
        .patents-head .ltr {
          display: inline-block;
          will-change: transform, opacity;
        }
        .patent-title {
          font-family: "Georgia", "Times New Roman", serif;
          font-size: clamp(1.5rem, 3.8vw, 3.8rem);
          line-height: 1.08;
          color: currentColor;
          font-weight: 400;
          max-width: 18ch;
          transition: color 0.8s ease;
        }
        .patent-meta {
          color: inherit;
          opacity: 0.62;
        }
        .patent-copy {
          color: #2a2624;
        }
        .patent-copy--human {
          color: #2a2624;
        }
        .patent-copy--wave {
          color: #e8ddd0;
        }
      `}</style>
    </div>
  );
}

/* ── status timeline sub-component ── */
function StatusLine({
  filed,
  status,
  tone = "human",
}: {
  filed: string;
  status: "published" | "granted";
  tone?: "human" | "wave";
}) {
  const steps = [
    { key: "filed", label: "Filed", date: filed },
    { key: "published", label: "Published", date: "" },
    { key: "granted", label: "Granted", date: "" },
  ];
  const active = status === "granted" ? 2 : status === "published" ? 1 : 0;
  const ink = tone === "wave" ? "#E8DDD0" : "#2A2624";
  const muted =
    tone === "wave" ? "rgba(232,221,208,0.36)" : "rgba(42,38,36,0.34)";
  const accent = tone === "wave" ? "#8B6A52" : "#A58D8D";

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step.key} className="flex items-center">
          {/* dot */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: i <= active ? 7 : 6,
                height: i <= active ? 7 : 6,
                borderRadius: "50%",
                background: i <= active ? ink : "transparent",
                border: `1px solid ${i <= active ? ink : muted}`,
                transition: "all 0.4s ease",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono',ui-monospace,monospace",
                fontSize: 8,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: i <= active ? ink : muted,
                whiteSpace: "nowrap",
              }}
            >
              {step.label}
            </span>
          </div>
          {/* connector line */}
          {i < steps.length - 1 && (
            <div
              style={{
                width: 48,
                height: 1,
                marginBottom: 14,
                background: i < active ? accent : muted,
                transition: "background 0.4s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
