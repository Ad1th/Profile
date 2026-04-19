"use client";

import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";

import "./FallingText.css";

type FallingTextProps = {
  className?: string;
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
};

export default function FallingText({
  className = "",
  text,
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "click",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  wordSpacing = "2px",
  activated,
  floorRatio = 0.72,
  maxDropDistance = 120,
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(" ");
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (typeof activated === "boolean") {
      if (activated) setEffectStarted(true);
      return;
    }

    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, activated]);

  useEffect(() => {
    if (!effectStarted || !containerRef.current || !textRef.current || !canvasContainerRef.current) {
      return;
    }

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const floorY = Math.max(30, Math.min(height - 24, height * floorRatio));

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };

    // Invisible floor aligned to the underline zone.
    const floor = Bodies.rectangle(width / 2, floorY + 20, width, 40, boundaryOptions);
    const leftWall = Bodies.rectangle(-20, height / 2, 40, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -20, width, 40, boundaryOptions);

    const wordSpans = textRef.current.querySelectorAll<HTMLSpanElement>(".word");

    const wordBodies = Array.from(wordSpans).map((elem) => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const originalY = rect.top - containerRect.top + rect.height / 2;
      const y = Math.max(originalY, floorY - maxDropDistance);

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.3,
        frictionAir: 0.03,
        friction: 0.45,
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.4, y: 0 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.008);

      elem.style.position = "absolute";
      elem.style.left = `${x}px`;
      elem.style.top = `${y}px`;
      elem.style.transform = "translate(-50%, -50%)";

      return { elem, body };
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });

    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let raf = 0;
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      raf = window.requestAnimationFrame(updateLoop);
    };
    raf = window.requestAnimationFrame(updateLoop);

    return () => {
      window.cancelAnimationFrame(raf);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current?.contains(render.canvas)) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    floorRatio,
    maxDropDistance,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize,
          lineHeight: 1.2,
          wordSpacing,
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
}
