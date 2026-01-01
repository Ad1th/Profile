"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState("");
  const sections = [
    "about",
    "experience",
    "skills",
    "projects",
    "achievements",
    "hackathons",
    "hobbies",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map((section) => (
        <motion.a
          key={section}
          href={`#${section}`}
          className="group flex items-center gap-3"
          whileHover={{ x: -5 }}
        >
          <span
            className={`text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity ${
              activeSection === section
                ? "text-purple-500"
                : "text-muted-foreground"
            }`}
          >
            {section}
          </span>
          <motion.div
            className={`w-2 h-2 rounded-full transition-colors ${
              activeSection === section
                ? "bg-purple-500 scale-150"
                : "bg-muted-foreground/30"
            }`}
            whileHover={{ scale: 1.5 }}
          />
        </motion.a>
      ))}
    </div>
  );
}
