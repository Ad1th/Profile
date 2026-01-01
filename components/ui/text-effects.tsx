"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MorphingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function MorphingText({
  texts,
  interval = 3000,
  className = "",
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {texts.map((text, index) => (
        <motion.span
          key={text}
          className="absolute inset-0"
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: currentIndex === index ? "0%" : "-100%",
            opacity: currentIndex === index ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          {text}
        </motion.span>
      ))}
      {/* Invisible text for sizing */}
      <span className="invisible">{texts[0]}</span>
    </div>
  );
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursor = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-current ml-1"
          animate={{ opacity: isComplete ? [1, 0] : 1 }}
          transition={{
            duration: 0.5,
            repeat: isComplete ? Infinity : 0,
            repeatType: "reverse",
          }}
        />
      )}
    </span>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function GlitchText({
  text,
  className = "",
  intensity = "medium",
}: GlitchTextProps) {
  const intensityValues = {
    low: { offset: 1, duration: 0.1 },
    medium: { offset: 2, duration: 0.15 },
    high: { offset: 3, duration: 0.2 },
  };

  const { offset, duration } = intensityValues[intensity];

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-cyan-500 opacity-70"
        style={{ clipPath: "inset(0 0 50% 0)" }}
        animate={{
          x: [-offset, offset, -offset],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-red-500 opacity-70"
        style={{ clipPath: "inset(50% 0 0 0)" }}
        animate={{
          x: [offset, -offset, offset],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);

        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(start + (end - start) * eased);

        setCount(currentCount);

        if (now < endTime) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [hasStarted, start, end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  colors?: string[];
}

export function AnimatedGradientText({
  children,
  className = "",
  animate = true,
  colors = ["#8b5cf6", "#6366f1", "#a855f7", "#8b5cf6"],
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: animate ? "200% 100%" : "100% 100%",
      }}
      animate={
        animate
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShinyText({ children, className = "" }: ShinyTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{ mixBlendMode: "overlay" }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
    </span>
  );
}

interface WavyTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WavyText({ text, className = "", delay = 0 }: WavyTextProps) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: delay + i * 0.05,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
