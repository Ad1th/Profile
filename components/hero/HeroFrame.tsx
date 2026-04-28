"use client";

// HeroFrame is no longer used as a separate component —
// the left panel in Hero.tsx serves as the frame directly.
// This file is kept as a passthrough for any legacy imports.

import React from "react";

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
