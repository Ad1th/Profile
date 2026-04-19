"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import "./BubbleMenu.css";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export default function BubbleMenu({
  open,
  onRequestClose,
  className,
  style,
  menuBg = "#E2E2E2",
  menuContentColor = "#111111",
  useFixedPosition = true,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.45,
  staggerDelay = 0.08,
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
      gsap.set(overlay, { display: "flex", autoAlpha: 1 });
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 20, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });

        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: "power3.out",
            },
            `-=${animationDuration * 0.85}`,
          );
        }
      });
      return;
    }

    gsap.to(labels, {
      y: 20,
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(bubbles, {
      scale: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { autoAlpha: 0, display: "none" });
        }
      },
    });
  }, [open, animationDuration, animationEase, staggerDelay]);

  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onRequestClose();
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onRequestClose]);

  if (!items.length) return null;

  return (
    <div
      ref={overlayRef}
      className={`bubble-menu-items ${useFixedPosition ? "fixed" : "absolute"} ${className ?? ""}`}
      style={style}
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onRequestClose();
        }
      }}
    >
      <ul className="pill-list" role="menu" aria-label="More sections">
        {items.map((item, idx) => (
          <li key={item.label} role="none" className="pill-col">
            <a
              role="menuitem"
              href={item.href}
              aria-label={item.ariaLabel || item.label}
              className="pill-link"
              onClick={onRequestClose}
              style={
                {
                  "--item-rot": `${item.rotation ?? 0}deg`,
                  "--pill-bg": menuBg,
                  "--pill-color": menuContentColor,
                  "--hover-bg": item.hoverStyles?.bgColor || "#E85D1F",
                  "--hover-color": item.hoverStyles?.textColor || "#F5F5F5",
                } as CSSProperties
              }
              ref={(el) => {
                bubblesRef.current[idx] = el;
              }}
            >
              <span
                className="pill-label"
                ref={(el) => {
                  labelRefs.current[idx] = el;
                }}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
