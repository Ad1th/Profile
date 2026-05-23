"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Magnetic({ children, strength = 0.18 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  return (
    <motion.span
      style={{ x: springX, y: springY, display: "inline-block" }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function Tilt({ children, amount = 5 }: { children: ReactNode; amount?: number }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useTransform(py, [0, 1], [amount, -amount]);
  const rotateY = useTransform(px, [0, 1], [-amount, amount]);

  return (
    <motion.span
      style={{
        display: "block",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.span>
  );
}

export function BlurIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.span
      initial={{ filter: "blur(8px)", y: 12 }}
      whileInView={{ filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}
