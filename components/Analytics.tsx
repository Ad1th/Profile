"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    // Load the GA script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-G2C29BV53T";
    script.async = true;
    document.head.appendChild(script);

    // Configure GA
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-G2C29BV53T');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  return null;
}
