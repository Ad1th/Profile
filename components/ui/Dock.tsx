"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "motion/react";
import {
  Children, cloneElement, useEffect, useMemo, useRef, useState,
  type ReactElement, type ReactNode,
} from "react";

type DockItemData = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  separator?: boolean;
};

type DockIconChildProps = {
  isHovered?: ReturnType<typeof useMotionValue<number>>;
};

function DockItem({
  children, className = "", onClick, mouseX, spring, distance, magnification, baseItemSize,
}: {
  children: ReactNode; className?: string; onClick: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: SpringOptions; distance: number; magnification: number; baseItemSize: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={className}
      tabIndex={0}
      role="button"
      style={{
        width: size, height: size,
        position: "relative",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: 10, background: "transparent", border: "none",
        cursor: "none", outline: "none", color: "#c0c0c0",
        transition: "color 0.15s ease",
      }}
      whileHover={{ color: "#f0f0f0" } as any}
    >
      {Children.map(children, (child) => {
        if (!child || typeof child !== "object") return child;
        return cloneElement(child as ReactElement<DockIconChildProps>, { isHovered });
      })}
    </motion.div>
  );
}

function DockLabel({ children, ...rest }: {
  children: ReactNode;
  isHovered?: ReturnType<typeof useMotionValue<number>>;
}) {
  const { isHovered } = rest;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsub = isHovered.on("change", (v) => setVisible(v === 1));
    return () => unsub();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: -6 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          role="tooltip"
          style={{
            position: "absolute", top: "-1.9rem", left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap", borderRadius: 5,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(14,14,14,0.96)",
            padding: "0.15rem 0.55rem",
            fontSize: "0.68rem", fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 600, letterSpacing: "0.03em", color: "#d0d0d0",
            pointerEvents: "none",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.07, stiffness: 190, damping: 14 },
  magnification = 58,
  distance = 160,
  panelHeight = 56,
  dockHeight = 200,
  baseItemSize = 40,
}: {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification * 1.6), [magnification, dockHeight]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{
        height, scrollbarWidth: "none",
        position: "fixed", left: "50%", bottom: 14,
        transform: "translateX(-50%)",
        display: "flex", maxWidth: "calc(100% - 28px)",
        alignItems: "center", zIndex: 70, pointerEvents: "none",
      }}
    >
      <motion.div
        onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
        onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
        className={className}
        style={{
          pointerEvents: "auto",
          display: "flex", alignItems: "flex-end", width: "fit-content",
          gap: "0.45rem", borderRadius: 14, height: panelHeight,
          background: "rgba(14,14,14,0.84)",
          backdropFilter: "blur(18px) saturate(1.5)",
          WebkitBackdropFilter: "blur(18px) saturate(1.5)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.03)",
          padding: "0 0.5rem 0.5rem",
        }}
        role="toolbar"
        aria-label="Site navigation"
      >
        {items.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "flex-end" }}>
            {item.separator && (
              <div style={{
                width: 1, height: 22, background: "rgba(255,255,255,0.08)",
                marginRight: "0.45rem", alignSelf: "center", marginBottom: "0.3rem",
              }} aria-hidden />
            )}
            <DockItem
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
