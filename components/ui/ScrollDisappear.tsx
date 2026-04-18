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
  animationDuration = 1.2,
  ease = "power2.inOut",
  scrollStart = "top top+=30%", // Start disappearing earlier
  scrollEnd = "bottom top-=20%", // Finish disappearing when section is mostly gone
  stagger = 0.04,
}: ScrollDisappearProps) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const isText = typeof children === "string";

  const splitText = useMemo(() => {
    const text = isText ? children : "";
    return text.split("").map((char, index) => (
      <span className="char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children, isText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;
    const charElements = el.querySelectorAll<HTMLElement>(".char");
    const contentElement = el.querySelector<HTMLElement>(
      ".scroll-disappear-content",
    );

    if (isText && charElements.length > 0) {
      gsap.fromTo(
        charElements,
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
          yPercent: -80,
          scaleY: 0.6,
          scaleX: 0.85,
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
    }

    if (contentElement) {
      gsap.fromTo(
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
          yPercent: -48,
          scale: 0.96,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [
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
      `}</style>
      {isText ? (
        <span className={`scroll-disappear-text ${textClassName}`}>
          {splitText}
        </span>
      ) : (
        <span className={`scroll-disappear-content ${textClassName}`}>
          {children}
        </span>
      )}
    </h2>
  );
};

export default ScrollDisappear;
