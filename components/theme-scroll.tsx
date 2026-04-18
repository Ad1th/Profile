"use client";

import { useEffect } from "react";

const SECTION_ORDER = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "patents",
  "achievements",
  "hackathons",
  "hobbies",
  "contact",
] as const;

type SectionId = (typeof SECTION_ORDER)[number];

type SectionTheme = {
  bg: string;
  text: string;
  accent?: string;
};

const SECTION_THEMES: Record<SectionId, SectionTheme> = {
  hero: { bg: "#111111", text: "#E5E5E5", accent: "#FF7A1F" },
  about: { bg: "#111111", text: "#E5E5E5", accent: "#FF7A1F" },
  experience: { bg: "#FF7A1F", text: "#111111" },
  skills: { bg: "#E6A8A1", text: "#C63D3D" },
  projects: { bg: "#6F6BAE", text: "#F2C6BD" },
  patents: { bg: "#F4E62A", text: "#111111" },
  achievements: { bg: "#8FA1B5", text: "#F4E62A" },
  hackathons: { bg: "#2F4F2F", text: "#F2C6BD" },
  hobbies: { bg: "#A24B8C", text: "#F2C6BD" },
  contact: { bg: "#111111", text: "#E5E5E5", accent: "#FF7A1F" },
};

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
};

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;

const rgbToHslValue = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) return `0 0% ${Math.round(lightness * 1000) / 10}%`;

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;

  if (max === red) hue = ((green - blue) / delta) % 6;
  if (max === green) hue = (blue - red) / delta + 2;
  if (max === blue) hue = (red - green) / delta + 4;
  if (hue < 0) hue += 6;

  return `${Math.round(hue * 60)} ${Math.round(saturation * 1000) / 10}% ${
    Math.round(lightness * 1000) / 10
  }%`;
};

const mixHex = (from: string, to: string, amount = 0.5) => {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const alpha = Math.min(Math.max(amount, 0), 1);

  return rgbToHex({
    r: start.r + (end.r - start.r) * alpha,
    g: start.g + (end.g - start.g) * alpha,
    b: start.b + (end.b - start.b) * alpha,
  });
};

const relativeLuminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const convert = (channel: number) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  };

  const red = convert(r);
  const green = convert(g);
  const blue = convert(b);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export default function ThemeScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let frameId = 0;
    let lastSection: SectionId | null = null;

    const applyTheme = (sectionId: SectionId) => {
      if (sectionId === lastSection) return;
      lastSection = sectionId;

      const theme = SECTION_THEMES[sectionId];
      const bg = theme.bg;
      const text = theme.text;
      const accent = theme.accent ?? text;
      const mutedText = mixHex(text, bg, 0.38);
      const isLightBackground = relativeLuminance(bg) > 0.52;
      const surface = isLightBackground
        ? "rgba(17, 17, 17, 0.12)"
        : "rgba(255, 255, 255, 0.08)";
      const borderColor = isLightBackground
        ? "rgba(17, 17, 17, 0.28)"
        : "rgba(229, 229, 229, 0.2)";

      root.style.setProperty("--bg", bg);
      root.style.setProperty("--text", text);
      root.style.setProperty("--muted-text", mutedText);
      root.style.setProperty("--accent", accent);
      root.style.setProperty("--surface", surface);
      root.style.setProperty("--border-color", borderColor);
      root.style.setProperty("--background", rgbToHslValue(hexToRgb(bg)));
      root.style.setProperty("--foreground", rgbToHslValue(hexToRgb(text)));
      root.style.setProperty(
        "--muted-foreground",
        rgbToHslValue(hexToRgb(mutedText)),
      );
    };

    const getActiveSection = (): SectionId => {
      const markerY = window.scrollY + window.innerHeight * 0.35;
      let active: SectionId = "hero";

      for (const sectionId of SECTION_ORDER) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        if (section.offsetTop <= markerY) active = sectionId;
      }

      return active;
    };

    const updateTheme = () => {
      frameId = 0;
      applyTheme(getActiveSection());
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateTheme);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
