"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AdvancedCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for the outer ring
  const ringConfig = { damping: 30, stiffness: 180 };
  const ringXSpring = useSpring(cursorX, ringConfig);
  const ringYSpring = useSpring(cursorY, ringConfig);

  useEffect(() => {
    setHasMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerCheck = (e: MouseEvent) => {
      const hoveredEl = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredEl) {
        const computedStyle = window.getComputedStyle(hoveredEl);
        const isClickable =
          computedStyle.cursor === "pointer" ||
          hoveredEl.tagName === "A" ||
          hoveredEl.tagName === "BUTTON" ||
          hoveredEl.closest("a") !== null ||
          hoveredEl.closest("button") !== null;

        setIsPointer(isClickable);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousemove", handlePointerCheck, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handlePointerCheck);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!hasMounted) return null;
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-3 h-3 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.6 : isPointer ? 0.6 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
      >
        <motion.div
          className="rounded-full border-2 border-purple-500/60 -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isPointer ? 56 : 40,
            height: isPointer ? 56 : 40,
            opacity: isVisible ? (isPointer ? 1 : 0.6) : 0,
            borderColor: isClicking
              ? "rgba(139, 92, 246, 1)"
              : "rgba(139, 92, 246, 0.6)",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
