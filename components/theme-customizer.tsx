"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Subtle floating toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass border border-purple-500/20 shadow-lg flex items-center justify-center text-muted-foreground hover:text-purple-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Minimal dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-20 right-6 z-50 w-48 glass rounded-xl border border-purple-500/20 shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Theme</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded hover:bg-purple-500/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Theme Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 p-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                      theme === "light"
                        ? "border-purple-500 bg-purple-500/10 text-purple-400"
                        : "border-purple-500/20 hover:border-purple-500/40"
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 p-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                      theme === "dark"
                        ? "border-purple-500 bg-purple-500/10 text-purple-400"
                        : "border-purple-500/20 hover:border-purple-500/40"
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
