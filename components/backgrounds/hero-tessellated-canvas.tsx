"use client";

import { useEffect, useRef } from "react";

function fract(n: number) {
  return n - Math.floor(n);
}

function hash2(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return fract(n);
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function valueNoise2D(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = x - xi;
  const ty = y - yi;

  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);

  const ux = smoothstep(tx);
  const uy = smoothstep(ty);

  const lerpX1 = a + (b - a) * ux;
  const lerpX2 = c + (d - c) * ux;
  return lerpX1 + (lerpX2 - lerpX1) * uy;
}

function fbm(x: number, y: number, octaves = 4) {
  let total = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < octaves; i += 1) {
    total += valueNoise2D(x * frequency, y * frequency) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return total / norm;
}

export default function HeroTessellatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(true);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lowEndDevice =
      (typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency <= 4) ||
      // deviceMemory is optional and not in all browsers.
      (typeof navigator !== "undefined" &&
        "deviceMemory" in navigator &&
        Number(
          (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
        ) <= 4);

    const targetFps = prefersReducedMotion ? 24 : lowEndDevice ? 30 : 60;
    const frameInterval = 1000 / targetFps;
    let lastFrameTime = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onVisibility = () => {
      runningRef.current = !document.hidden;
      if (!document.hidden && rafRef.current === null) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const py = (event.clientY - rect.top) / Math.max(rect.height, 1);
      pointerRef.current.x = (px - 0.5) * 2;
      pointerRef.current.y = (py - 0.5) * 2;
    };

    const onPointerLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };

    const drawHex = (
      cx: number,
      cy: number,
      baseRadius: number,
      t: number,
      phaseOffset: number,
    ) => {
      const px = pointerRef.current.x * 5;
      const py = pointerRef.current.y * 5;

      let avgHeight = 0;
      const points: Array<{ x: number; y: number }> = [];

      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i;
        const nx = cx * 0.006 + Math.cos(angle) * 0.22 + phaseOffset;
        const ny = cy * 0.006 + Math.sin(angle) * 0.22 - phaseOffset;
        const n = fbm(nx + t * 0.02, ny - t * 0.016, 4);
        const h = (n - 0.5) * 2;
        avgHeight += h;

        const radius = baseRadius * (1 + h * 0.11);
        points.push({
          x: cx + Math.cos(angle) * radius + px,
          y: cy + Math.sin(angle) * radius + py,
        });
      }

      avgHeight /= 6;
      const shade = 205 + avgHeight * 18;
      const fillAlpha = 0.3;
      const strokeAlpha = 0.34;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade + 4}, ${fillAlpha})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(185, 192, 199, ${strokeAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const loop = (time: number) => {
      rafRef.current = null;

      if (!runningRef.current) return;
      if (time - lastFrameTime < frameInterval) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      lastFrameTime = time;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const cellSize = lowEndDevice ? 82 : 72;
      const radius = cellSize * 0.5;
      const colStep = cellSize * 0.75;
      const rowStep = cellSize * 0.86;
      const cols = Math.ceil(width / colStep) + 3;
      const rows = Math.ceil(height / rowStep) + 3;
      const t = time * 0.001;

      for (let row = -1; row < rows; row += 1) {
        for (let col = -1; col < cols; col += 1) {
          const offsetX = row % 2 === 0 ? 0 : colStep * 0.5;
          const cx = col * colStep + offsetX;
          const cy = row * rowStep;
          const phaseOffset = (row * 0.11 + col * 0.07) * 0.05;
          drawHex(cx, cy, radius, t, phaseOffset);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    runningRef.current = !document.hidden;

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.36,
        filter: "blur(14px)",
        mixBlendMode: "multiply",
        transform: "scale(1.06)",
      }}
    />
  );
}
