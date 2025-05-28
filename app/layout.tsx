import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Analytics from "@/components/Analytics"; // <-- Add this import

export const metadata = {
  title: "Adith Manikonda",
  description:
    "Personal portfolio website of Adith Manikonda, an Engineering Freshman at VIT",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Analytics /> {/* Add this line */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
