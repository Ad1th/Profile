"use client";

import type { ReactNode, RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollDisappearProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  splitText?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

const ScrollDisappear = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  splitText,
  animationDuration = 1.0,
  ease = "power2.inOut",
  scrollStart = "top top+=25%",
  scrollEnd = "bottom top-=15%",
  stagger = 0.032,
}: ScrollDisappearProps) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  const sourceText =
    typeof children === "string" ? children
      : typeof splitText === "string" ? splitText
        : "";
  const hasCharOverlay = sourceText.length > 0;
  const isText = typeof children === "string";

  const splitChars = useMemo(() =>
    sourceText.split("").map((char, i) => (
      <span key={i} style={{ display: "inline-block", transformOrigin: "50% 100%", willChange: "transform, opacity" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    )),
    [sourceText]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;
    const textCharEls = el.querySelectorAll<HTMLElement>(".sd-text-chars .sd-char");
    const overlayCharEls = el.querySelectorAll<HTMLElement>(".sd-overlay .sd-char");
    const contentEl = el.querySelector<HTMLElement>(".sd-content");
    const animations: gsap.core.Tween[] = [];

    const triggerCfg = {
      trigger: el, scroller,
      start: scrollStart, end: scrollEnd,
      scrub: 1.1,
    };

    if (isText && textCharEls.length > 0) {
      animations.push(gsap.fromTo(textCharEls,
        { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, transformOrigin: "50% 100%" },
        { duration: animationDuration, ease, opacity: 0, yPercent: -100, scaleY: 0.5, scaleX: 0.78, stagger, scrollTrigger: triggerCfg }
      ));
    }

    if (!isText && hasCharOverlay && overlayCharEls.length > 0) {
      animations.push(gsap.fromTo(overlayCharEls,
        { opacity: 0, yPercent: 0, scaleY: 1, scaleX: 1, transformOrigin: "50% 100%" },
        { duration: animationDuration, ease, opacity: 1, yPercent: -86, scaleY: 0.55, scaleX: 0.8, stagger, scrollTrigger: triggerCfg }
      ));
    }

    if (isText && contentEl) {
      animations.push(gsap.fromTo(contentEl,
        { opacity: 1, yPercent: 0, scale: 1, transformOrigin: "50% 50%" },
        { duration: animationDuration, ease, opacity: 0, yPercent: -58, scale: 0.96, scrollTrigger: triggerCfg }
      ));
    }

    return () => {
      animations.forEach((a) => { a.scrollTrigger?.kill(); a.kill(); });
    };
  }, [isText, hasCharOverlay, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2
      ref={containerRef}
      className={containerClassName}
      style={{
        overflow: "hidden", display: "inline-block", width: "100%",
      }}
    >
      {isText ? (
        <span className={`sd-text-chars ${textClassName}`} style={{
          display: "inline-block",
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(2.8rem, 9vw, 7.5rem)",
          textAlign: "left",
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
        }}>
          {splitChars.map((c, i) =>
            <span key={i} className="sd-char" style={{ display: "inline-block", transformOrigin: "50% 100%" }}>
              {c.props.children}
            </span>
          )}
        </span>
      ) : (
        <span className={`sd-content ${textClassName}`} style={{ display: "block", position: "relative", width: "100%", height: "100%" }}>
          {children}
          {hasCharOverlay && (
            <span
              className="sd-overlay"
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "flex-start",
                pointerEvents: "none", zIndex: 20,
                color: "var(--text-secondary, rgba(17,17,17,0.45))",
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(2.8rem, 9vw, 7.5rem)",
                fontWeight: 400, letterSpacing: "-0.035em", lineHeight: 1.02,
              }}
            >
              {splitChars.map((c, i) =>
                <span key={i} className="sd-char" style={{ display: "inline-block", transformOrigin: "50% 100%" }}>
                  {c.props.children}
                </span>
              )}
            </span>
          )}
        </span>
      )}
    </h2>
  );
};

export default ScrollDisappear;
