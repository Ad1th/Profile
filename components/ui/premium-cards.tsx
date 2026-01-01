"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Bento3DCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function Bento3DCard({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.3)",
}: Bento3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-px rounded-xl blur-xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${
              (mouseX.get() + 0.5) * 100
            }% ${(mouseY.get() + 0.5) * 100}%, ${glowColor}, transparent 50%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Card content */}
        <div className="relative bg-card/80 backdrop-blur-xl rounded-xl border border-purple-500/20 overflow-hidden">
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(
                105deg,
                transparent 40%,
                rgba(255, 255, 255, 0.03) 45%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.03) 55%,
                transparent 60%
              )`,
              transform: `translateX(${(mouseX.get() + 0.5) * 100 - 50}%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />

          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
}

export function GlassCard({
  children,
  className = "",
  blur = "md",
}: GlassCardProps) {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/5 ${blurClasses[blur]}
        border border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        ${className}
      `}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HolographicCard({
  children,
  className = "",
}: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotation({
      x: (y - 0.5) * 20,
      y: (x - 0.5) * -20,
    });
    setGlarePosition({
      x: x * 100,
      y: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Holographic gradient background */}
      <div
        className="absolute inset-0 rounded-xl opacity-50 transition-opacity duration-300 hover:opacity-80"
        style={{
          background: `
            linear-gradient(
              ${45 + rotation.y * 2}deg,
              #ff00ff33 0%,
              #00ffff33 25%,
              #ffff0033 50%,
              #ff00ff33 75%,
              #00ffff33 100%
            )
          `,
          backgroundSize: "400% 400%",
          animation: "holographic 3s ease infinite",
        }}
      />

      {/* Glare effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${glarePosition.x}% ${glarePosition.y}%,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 50%
          )`,
        }}
      />

      {/* Card content */}
      <div className="relative bg-card/90 backdrop-blur-xl rounded-xl border border-purple-500/30 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

interface NeonBorderCardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  animated?: boolean;
}

export function NeonBorderCard({
  children,
  className = "",
  borderColor = "#8b5cf6",
  animated = true,
}: NeonBorderCardProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated neon border */}
      <div
        className={`
          absolute -inset-0.5 rounded-xl opacity-75 blur-sm
          ${
            animated
              ? "group-hover:opacity-100 transition-opacity duration-500"
              : ""
          }
        `}
        style={{
          background: animated
            ? `linear-gradient(90deg, ${borderColor}, #6366f1, #a855f7, ${borderColor})`
            : borderColor,
          backgroundSize: "300% 100%",
          animation: animated ? "neon-flow 3s linear infinite" : "none",
        }}
      />

      {/* Inner card */}
      <div className="relative bg-card rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// Add keyframes via style tag
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes holographic {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes neon-flow {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    }
  `;
  document.head.appendChild(style);
}
