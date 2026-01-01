"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export function MagneticWrapper({
  children,
  className = "",
  strength = 0.5,
  disabled = false,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function RippleButton({
  children,
  className = "",
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
    onClick?.();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples((prev) => prev.slice(1));
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [ripples]);

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{
            width: 0,
            height: 0,
            x: ripple.x,
            y: ripple.y,
            opacity: 0.5,
          }}
          animate={{
            width: 500,
            height: 500,
            x: ripple.x - 250,
            y: ripple.y - 250,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
      {children}
    </button>
  );
}

interface HoverLiftCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverLiftCard({
  children,
  className = "",
}: HoverLiftCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 40px -15px rgba(139, 92, 246, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

interface BorderTrailProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function BorderTrail({
  children,
  className = "",
  duration = 4,
}: BorderTrailProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated border gradient */}
      <div className="absolute -inset-[1px] rounded-xl overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, transparent, #8b5cf6, transparent 30%)`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content with background */}
      <div className="relative bg-card rounded-xl">{children}</div>
    </div>
  );
}

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBorder({
  children,
  className = "",
}: AnimatedBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Gradient border that animates on hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
        style={{ backgroundSize: "200% 100%" }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative bg-card rounded-xl border border-purple-500/20 group-hover:border-transparent transition-colors duration-500">
        {children}
      </div>
    </div>
  );
}

interface PulseDotsProps {
  count?: number;
  className?: string;
  color?: string;
}

export function PulseDots({
  count = 3,
  className = "",
  color = "bg-purple-500",
}: PulseDotsProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${color}`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

interface ExpandingLineProps {
  className?: string;
  color?: string;
}

export function ExpandingLine({
  className = "",
  color = "bg-purple-500",
}: ExpandingLineProps) {
  return (
    <motion.div
      className={`h-0.5 ${color} ${className}`}
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function FloatingElement({
  children,
  className = "",
  amplitude = 10,
  duration = 3,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleInView({
  children,
  className = "",
  delay = 0,
}: ScaleInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      {children}
    </motion.div>
  );
}
