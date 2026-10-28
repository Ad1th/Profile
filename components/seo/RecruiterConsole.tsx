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
    sudo?: (cmd: string) => string;
  }
}

export default function RecruiterConsole() {
  useEffect(() => {
    window.help = () => [
      "about() - who Adith Manikonda is",
      "projects() - selected backend and systems projects",
      "skills() - core engineering stack",
      "showSecrets() - the recruiter-only hint",
      "sudo(\"hire adith\") - try it",
    ];

    window.about = () =>
      "Adith Manikonda is a backend-focused engineer from VIT Vellore building scalable systems, research prototypes, patents and developer tools.";

    window.projects = () => [
      "Renderd - open source app that makes a Windows PC a second monitor for a Mac",
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

    window.showSecrets = () => "No secrets. Just Prisma schemas.";

    window.sudo = (cmd: string) => {
      const c = String(cmd ?? "").toLowerCase();
      return c.includes("hire") && c.includes("adith")
        ? "Permission granted. Welcome aboard."
        : "Permission denied.";
    };

    if (greeted) return;
    greeted = true;
    console.log("ADITH.EXE READY");
    console.log("Backend Engineer | Systems Builder | VIT Vellore");
    console.log("Type help()");
  }, []);

  return null;
}
