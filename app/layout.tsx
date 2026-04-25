import type React from "react";
import "./globals.css";

export const metadata = {
  title: "Adith Manikonda",
  description: "Personal portfolio website of Adith Manikonda, an Engineering Freshman at VIT",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
