import type React from "react";
import "./globals.css";
import { Anton, Archivo_Black } from "next/font/google";

const archivo = Archivo_Black({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-archivo",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata = {
  title: "Adith Manikonda",
  description: "Personal portfolio website of Adith Manikonda, an Engineering Freshman at VIT",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${anton.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
