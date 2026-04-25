import type React from "react";
import "./globals.css";
import { Archivo_Black } from "next/font/google";

const archivo = Archivo_Black({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata = {
  title: "Adith Manikonda",
  description: "Personal portfolio website of Adith Manikonda, an Engineering Freshman at VIT",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
