"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: { bgColor?: string; textColor?: string };
};

export default function BubbleMenu({
  open,
  onRequestClose,
  className,
  style,
  menuBg = "#1a1a1a",
  menuContentColor = "#ebebeb",
  useFixedPosition = true,
  items,
  animationEase = "back.out(1.35)",
  animationDuration = 0.38,
  staggerDelay = 0.055,
}: {
  open: boolean;
  onRequestClose: () => void;
  className?: string;
  style?: CSSProperties;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!overlay || !bubbles.length) return;

    gsap.killTweensOf([overlay, ...bubbles, ...labels]);

    if (open) {
      gsap.set(overlay, { display: "flex", autoAlpha: 0 });
      gsap.set(bubbles, { scale: 0.82, autoAlpha: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 10, autoAlpha: 0 });

      gsap.to(overlay, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });

      bubbles.forEach((bubble, i) => {
        const delay = 0.04 + i * staggerDelay;
        const tl = gsap.timeline({ delay });
        tl.to(bubble, { scale: 1, autoAlpha: 1, duration: animationDuration, ease: animationEase });
        if (labels[i]) {
          tl.to(labels[i], { y: 0, autoAlpha: 1, duration: animationDuration * 0.8, ease: "power3.out" }, `-=${animationDuration * 0.72}`);
        }
      });
    } else {
      gsap.to(labels, { y: 6, autoAlpha: 0, duration: 0.13, ease: "power2.in" });
      gsap.to(bubbles, {
        scale: 0.88, autoAlpha: 0, duration: 0.16, ease: "power2.in", stagger: 0.018,
        onComplete: () => {
          gsap.to(overlay, { autoAlpha: 0, duration: 0.14, onComplete: () => gsap.set(overlay, { display: "none" }) });
        },
      });
    }
  }, [open, animationDuration, animationEase, staggerDelay]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onRequestClose(); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onRequestClose]);

  if (!items.length) return null;

  return (
    <div
      ref={overlayRef}
      className={className}
      aria-hidden={!open}
      role={open ? "dialog" : undefined}
      aria-modal={open}
      onClick={(e) => { if (e.target === e.currentTarget) onRequestClose(); }}
      style={{
        position: useFixedPosition ? "fixed" : "absolute",
        inset: 0,
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 65,
        background: "rgba(8,8,8,0.78)",
        backdropFilter: "blur(10px) saturate(1.3)",
        WebkitBackdropFilter: "blur(10px) saturate(1.3)",
        ...style,
      }}
    >
      {/* Close hint */}
      <span style={{
        position: "absolute", top: "1.5rem", right: "2rem",
        fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "rgba(200,200,200,0.3)",
        pointerEvents: "none",
      }}>
        Esc to close
      </span>

      <ul role="menu" aria-label="More sections" style={{
        listStyle: "none", margin: 0, padding: "0 24px",
        display: "flex", flexWrap: "wrap", gap: 12,
        width: "100%", maxWidth: 860,
        justifyContent: "center",
      }}>
        {items.map((item, idx) => (
          <li key={item.label} role="none" style={{
            display: "flex", justifyContent: "center", alignItems: "stretch",
            flex: "0 0 calc(100% / 3 - 12px)",
          }}>
            <a
              role="menuitem"
              href={item.href}
              aria-label={item.ariaLabel || item.label}
              onClick={onRequestClose}
              ref={(el) => { bubblesRef.current[idx] = el; }}
              style={{
                width: "100%", minHeight: 92, padding: "18px 0",
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(1rem,2.2vw,1.8rem)",
                fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1,
                borderRadius: 999,
                background: menuBg, color: menuContentColor,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                // custom var trick for hover
                transition: "background 0.22s ease, color 0.22s ease, transform 0.22s cubic-bezier(0.16,1,0.3,1)",
                transform: `rotate(${item.rotation ?? 0}deg)`,
                cursor: "none",
              } as CSSProperties}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = item.hoverStyles?.bgColor || "#d96516";
                (e.currentTarget as HTMLElement).style.color = item.hoverStyles?.textColor || "#f5f5f5";
                (e.currentTarget as HTMLElement).style.transform = `rotate(${item.rotation ?? 0}deg) scale(1.03)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = menuBg;
                (e.currentTarget as HTMLElement).style.color = menuContentColor;
                (e.currentTarget as HTMLElement).style.transform = `rotate(${item.rotation ?? 0}deg) scale(1)`;
              }}
            >
              <span ref={(el) => { labelRefs.current[idx] = el; }} style={{ display: "inline-block" }}>
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
