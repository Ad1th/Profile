"use client";

// Simplified static gradient - no animations to reduce GPU load
export function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Static gradient background */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(-20%, -20%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(20%, 20%)",
        }}
      />
    </div>
  );
}

export function AnimatedGridBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Animated grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(139, 92, 246, 0.05)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          mask="url(#gridMask)"
        />
      </svg>

      {/* Glowing lines that travel across */}
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-full"
        style={{ top: "30%" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-full"
        style={{ top: "60%" }}
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent h-full"
        style={{ left: "20%" }}
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent h-full"
        style={{ left: "80%" }}
        animate={{ y: ["100%", "-100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-purple-950/20" />

      {/* Aurora waves */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 50%,
              rgba(139, 92, 246, 0.03) 60%,
              rgba(99, 102, 241, 0.05) 70%,
              rgba(139, 92, 246, 0.03) 80%,
              transparent 100%
            )
          `,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating aurora strips */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-32 w-full blur-3xl"
          style={{
            top: `${30 + i * 10}%`,
            background: `linear-gradient(90deg, 
              transparent, 
              rgba(${139 - i * 10}, ${92 + i * 5}, 246, 0.1), 
              rgba(${99 + i * 10}, ${102 - i * 5}, 241, 0.1), 
              transparent
            )`,
            transform: `rotate(${-5 + i * 2}deg)`,
          }}
          animate={{
            x: ["-50%", "50%", "-50%"],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

interface ScrollProgressBackgroundProps {
  children?: React.ReactNode;
}

export function ScrollProgressBackground({
  children,
}: ScrollProgressBackgroundProps) {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(0, 0, 0, 0)",
      "rgba(88, 28, 135, 0.05)",
      "rgba(67, 56, 202, 0.05)",
      "rgba(88, 28, 135, 0.05)",
      "rgba(0, 0, 0, 0)",
    ]
  );

  return (
    <motion.div className="fixed inset-0 -z-20" style={{ backgroundColor }}>
      {children}
    </motion.div>
  );
}
