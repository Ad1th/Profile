import type React from "react";
// @ts-expect-error -- Global CSS side-effect import is handled by Next.js
import "./globals.css";
import { Amatic_SC, Anton, Archivo_Black } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

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

const amatic = Amatic_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handdrawn",
});

export const metadata = {
  title: "Adith Manikonda",
  description:
    "Personal portfolio website of Adith Manikonda, a pre-final CS major at VIT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${anton.variable} ${amatic.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
