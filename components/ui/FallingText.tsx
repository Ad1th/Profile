"use client";

import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./FallingText.css";

type FallingTextProps = {
  className?: string;
  style?: CSSProperties;
  text: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: "click" | "hover" | "auto" | "scroll";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  wordSpacing?: string;
  activated?: boolean;
  floorRatio?: number;
  maxDropDistance?: number;
  showFloorLine?: boolean;
};

export default function FallingText({
  className = "",
  style,
  text,
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "click",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 0.9,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  wordSpacing = "2px",
  activated,
  floorRatio = 0.72,
  maxDropDistance = 120,
  showFloorLine = false,
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.innerHTML = text
      .split(" ")
      .map((word) => {
        const hl = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="falling-word${hl ? ` ${highlightClass}` : ""}">${word}</span>`;
      })
      .join(" ");
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (typeof activated === "boolean") {
      if (activated) setEffectStarted(true);
      return;
    }
    if (trigger === "auto") { setEffectStarted(true); return; }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setEffectStarted(true); observer.disconnect(); } },
        { threshold: 0.15 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, activated]);

  useEffect(() => {
    if (!effectStarted || !containerRef.current || !textRef.current || !canvasContainerRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;
    const cr = containerRef.current.getBoundingClientRect();
    const W = cr.width, H = cr.height;
    if (W <= 0 || H <= 0) return;

    const floorY = Math.max(30, Math.min(H - 24, H * floorRatio));
    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: { width: W, height: H, background: backgroundColor, wireframes, pixelRatio: Math.min(window.devicePixelRatio || 1, 2) },
    });

    const s = { isStatic: true, render: { fillStyle: "transparent" } };
    const walls = [
      Bodies.rectangle(W / 2, floorY + 20, W, 40, s),
      Bodies.rectangle(-20, H / 2, 40, H, s),
      Bodies.rectangle(W + 20, H / 2, 40, H, s),
      Bodies.rectangle(W / 2, -20, W, 40, s),
    ];

    const spans = textRef.current.querySelectorAll<HTMLSpanElement>(".falling-word");

    // Reset to normal inline flow before measurement so words do not stack.
    spans.forEach((elem) => {
      elem.style.position = "static";
      elem.style.left = "";
      elem.style.top = "";
      elem.style.transform = "";
    });

    // Preserve layout height after words switch to absolute positioning.
    const measuredTextRect = textRef.current.getBoundingClientRect();
    textRef.current.style.height = `${Math.max(1, measuredTextRect.height)}px`;

    const wordBodies = Array.from(spans).map((elem) => {
      const x = elem.offsetLeft + elem.offsetWidth / 2;
      const naturalY = elem.offsetTop + elem.offsetHeight / 2;
      const y = Math.max(naturalY, floorY - maxDropDistance);

      const body = Bodies.rectangle(x, y, elem.offsetWidth, elem.offsetHeight, {
        render: { fillStyle: "transparent" },
        restitution: 0.18, frictionAir: 0.045, friction: 0.58, density: 0.002,
      });
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.3, y: 0 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.006);

      elem.style.position = "absolute";
      elem.style.left = `${x}px`;
      elem.style.top = `${y}px`;
      elem.style.transform = "translate(-50%, -50%)";

      return { elem, body };
    });

    const worldItems: Matter.Body[] = [...walls, ...wordBodies.map((wb) => wb.body)];

    // Only add mouse constraint when stiffness > 0, otherwise it steals pointer events and breaks scroll
    if (mouseConstraintStiffness > 0) {
      const mouse = Mouse.create(containerRef.current);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
      });
      render.mouse = mouse;
      World.add(engine.world, mc as unknown as Matter.Body);
    }

    World.add(engine.world, worldItems);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let raf = 0;
    const loop = () => {
      wordBodies.forEach(({ body, elem }) => {
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current?.contains(render.canvas)) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (textRef.current) textRef.current.style.height = "";
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, floorRatio, maxDropDistance]);

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        pointerEvents: "auto",
        ...style,
      }}
    >
      <div
        ref={textRef}
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          fontSize,
          lineHeight: 1.3,
          wordSpacing,
          userSelect: "none",
        }}
      />

      {showFloorLine && (
        <div
          aria-hidden
          style={{
            position: "absolute", left: 0, right: 0,
            top: `${floorRatio * 100}%`,
            height: 2, background: "rgba(217,101,22,0.58)",
            pointerEvents: "none", zIndex: 2,
          }}
        />
      )}

      <div
        ref={canvasContainerRef}
        style={{
          position: "absolute", inset: 0,
          zIndex: 0, pointerEvents: "none",
        }}
      />
    </div>
  );
}
