"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Optimized particle count for performance
function ParticleCloud({ count = 1200 }) {
  const ref = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a subtle sphere
      const radius = Math.random() * 15 + 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Very slow, elegant rotation
      ref.current.rotation.x += delta * 0.01;
      ref.current.rotation.y += delta * 0.015;

      // Subtle mouse parallax
      ref.current.rotation.x +=
        (mouseRef.current.y * 0.05 - ref.current.rotation.x) * 0.02;
      ref.current.rotation.y +=
        (mouseRef.current.x * 0.05 - ref.current.rotation.y) * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={particles}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export function ParticleField() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay rendering for smoother initial load
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 -z-10 opacity-40 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ParticleCloud count={1000} />
      </Canvas>
    </div>
  );
}
