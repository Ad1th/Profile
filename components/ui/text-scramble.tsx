"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealDelay?: number;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({
  text,
  className = "",
  scrambleSpeed = 30,
  revealDelay = 0,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef(0);
  const resolveRef = useRef<string[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
      resolveRef.current = text.split("");
      let iteration = 0;

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return resolveRef.current[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }

        iteration += 1 / 3;
      }, scrambleSpeed);

      return () => clearInterval(interval);
    }, revealDelay);

    return () => clearTimeout(timeout);
  }, [text, scrambleSpeed, revealDelay]);

  return (
    <span className={className}>
      {displayText ||
        text
          .split("")
          .map(() => " ")
          .join("")}
    </span>
  );
}

// Animated gradient text
export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-[length:200%_auto] animate-gradient ${className}`}
    >
      {children}
    </span>
  );
}

// Text reveal animation
export function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.span>
  );
}

// Split text animation (word by word)
export function SplitText({
  children,
  className = "",
  wordClassName = "",
  delay = 0,
  staggerDelay = 0.05,
}: {
  children: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDelay?: number;
}) {
  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClassName}`}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}
