"use client";

import { useEffect } from "react";

/** Strict Mode + the desktop/compact swap remount this; print the banner once. */
let greeted = false;

declare global {
  interface Window {
    help?: () => string[];
    about?: () => string;
    projects?: () => string[];
    skills?: () => string[];
    showSecrets?: () => string;
  }
}

export default function RecruiterConsole() {
  useEffect(() => {
    window.help = () => [
      "about() - who Adith Manikonda is",
      "projects() - selected backend and systems projects",
      "skills() - core engineering stack",
      "showSecrets() - the recruiter-only hint",
    ];

    window.about = () =>
      "Adith Manikonda is a backend-focused engineer from VIT Vellore building scalable systems, research prototypes, patents and developer tools.";

    window.projects = () => [
      "Argus - database query visualization and telemetry",
      "Threddit - productivity-focused Chrome extension",
      "EcoSync - AI sustainability tooling for textile industries",
      "SevaVerse - community service coordination",
      "KonectUs - real-time social networking with Socket.IO",
      "Cloudify - Google Drive style cloud storage platform",
    ];

    window.skills = () => [
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "Prisma",
      "Python",
      "Cloud infrastructure",
      "Telemetry",
      "Systems design",
    ];

    window.showSecrets = () =>
      "Recruiter signal: this portfolio hides crawlable SEO, structured data and a tiny console interface without disturbing the UI.";

    if (greeted) return;
    greeted = true;
    console.log("ADITH.EXE READY");
    console.log("Backend Engineer | Systems Builder | VIT Vellore");
    console.log("Type help()");
  }, []);

  return null;
}
