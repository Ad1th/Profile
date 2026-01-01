"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.4,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          ...directions[direction],
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : directions[direction].y,
          x: isInView ? 0 : directions[direction].x,
        }}
        transition={{
          duration,
          delay: Math.min(delay, 0.3),
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Stagger children animation
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect
export function Parallax({
  children,
  className = "",
  speed = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: 0,
      }}
      whileInView={{
        y: [-20 * speed, 20 * speed],
      }}
      transition={{
        y: {
          duration: 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating animation
export function Float({
  children,
  className = "",
  duration = 3,
  distance = 10,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
