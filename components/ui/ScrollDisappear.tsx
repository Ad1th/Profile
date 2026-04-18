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
  animationDuration = 1.2,
  ease = "power2.inOut",
  scrollStart = "top top+=30%", // Start disappearing earlier
  scrollEnd = "bottom top-=20%", // Finish disappearing when section is mostly gone
  stagger = 0.04,
}: ScrollDisappearProps) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const sourceText =
    typeof children === "string"
      ? children
      : typeof splitText === "string"
        ? splitText
        : "";
  const hasCharOverlay = sourceText.length > 0;
  const isText = typeof children === "string";

  const splitChars = useMemo(() => {
    return sourceText.split("").map((char, index) => (
      <span className="char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [sourceText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;
    const charElements = el.querySelectorAll<HTMLElement>(
      ".scroll-disappear-overlay .char",
    );
    const textCharElements = el.querySelectorAll<HTMLElement>(
      ".scroll-disappear-text .char",
    );
    const contentElement = el.querySelector<HTMLElement>(
      ".scroll-disappear-content",
    );
    const animations: gsap.core.Tween[] = [];

    if (isText && textCharElements.length > 0) {
      const textTween = gsap.fromTo(
        textCharElements,
        {
          willChange: "opacity, transform",
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          transformOrigin: "50% 100%",
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 0,
          yPercent: -110,
          scaleY: 0.58,
          scaleX: 0.82,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
      animations.push(textTween);
    }

    if (!isText && hasCharOverlay && charElements.length > 0) {
      const overlayTween = gsap.fromTo(
        charElements,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          transformOrigin: "50% 100%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: -86,
          scaleY: 0.55,
          scaleX: 0.8,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
      animations.push(overlayTween);
    }

    if (isText && contentElement) {
      const contentTween = gsap.fromTo(
        contentElement,
        {
          willChange: "opacity, transform",
          opacity: 1,
          yPercent: 0,
          scale: 1,
          transformOrigin: "50% 50%",
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 0,
          yPercent: -68,
          scale: 0.95,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
      animations.push(contentTween);
    }

    return () => {
      animations.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, [
    isText,
    hasCharOverlay,
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-disappear ${containerClassName}`}>
      <style>{`
        .scroll-disappear {
          overflow: hidden;
          display: inline-block;
          width: 100%;
          height: 100%;
        }

        .scroll-disappear-text {
          display: inline-block;
          font-size: clamp(2.5rem, 8vw, 7rem);
          font-weight: 900;
          text-align: center;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .char {
          display: inline-block;
          transform-origin: 50% 100%;
        }

        .scroll-disappear-content {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .scroll-disappear-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 20;
          color: #111111;
          font-family: 'IBM Plex Mono', 'Courier New', monospace;
          font-size: clamp(2.5rem, 8vw, 7rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.05;
          text-shadow: none;
          mix-blend-mode: normal;
        }
      `}</style>
      {isText ? (
        <span className={`scroll-disappear-text ${textClassName}`}>
          {splitChars}
        </span>
      ) : (
        <span className={`scroll-disappear-content ${textClassName}`}>
          {children}
          {hasCharOverlay && (
            <span className="scroll-disappear-overlay">{splitChars}</span>
          )}
        </span>
      )}
    </h2>
  );
};

export default ScrollDisappear;
