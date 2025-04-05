import type React from "react";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

export const metadata = {
  title: "Adith Manikonda",
  description:
    "Personal portfolio website of Adith Manikonda, an Engineering Freshman at VIT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Layout component rendering");
  console.log("ThemeProvider being used from:", "../components/theme-provider");
  console.log("Environment:", process.env.NODE_ENV);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
