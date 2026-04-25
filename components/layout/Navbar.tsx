"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function Navbar() {
  const links = ["ABOUT", "PROJECTS", "STACK", "CONTACT"];

  return (
    <nav className="absolute top-[34px] left-[56px] right-[48px] h-[56px] z-50 flex justify-between items-center pointer-events-none max-w-[1344px] mx-auto">
      <div className="pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -24, rotate: -4, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.05, ease: easings.snap }}
          className="w-[72px] h-[72px] bg-[#F05A24] border-[3px] border-[#111] flex items-center justify-center shadow-[8px_8px_0_#111]"
        >
          <span className="text-[44px] font-[900] text-[#111] pt-[2px] leading-none tracking-tight font-archivo">A.</span>
        </motion.div>
      </div>
      
      <div className="pointer-events-auto hidden md:flex items-center">
        {links.map((link, i) => (
          <div key={link} className="flex items-center">
            <motion.a
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 + i * 0.05, ease: easings.primary }}
              whileHover={{ y: -2, color: "#F05A24" }}
              className="text-[16px] font-[700] tracking-[0.04em] uppercase transition-colors text-[#111]"
            >
              {link}
            </motion.a>
            {i < links.length - 1 && (
              <span className="w-[1px] h-[28px] bg-[#111] opacity-30 mx-[16px]"></span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
