"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export default function Navbar() {
  const links = ["WORK", "ABOUT", "CONTACT"];

  return (
    <nav className="absolute left-[36px] right-[48px] top-[26px] z-50 flex h-[58px] items-start justify-between pointer-events-none">
      <div className="pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -24, rotate: -4, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.05, ease: easings.snap }}
          className="flex h-[86px] w-[86px] items-center justify-center border-[4px] border-[#111] bg-[#F45113] shadow-[8px_8px_0_#111]"
        >
          <span className="pt-[3px] font-archivo text-[54px] font-[900] leading-none tracking-[-0.08em] text-[#111]">
            A.
          </span>
        </motion.div>
      </div>

      <div className="pointer-events-auto hidden items-center gap-[64px] md:flex">
        {links.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.16 + i * 0.05,
              ease: easings.primary,
            }}
            whileHover={{ y: -2, color: "#F45113" }}
            className="font-archivo text-[23px] font-[900] uppercase leading-none tracking-[-0.04em] text-[#111] transition-colors"
          >
            {link}
          </motion.a>
        ))}
        <span className="h-[30px] w-[2px] bg-[#111]" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: easings.primary }}
          className="grid h-[58px] w-[58px] grid-cols-3 place-items-center bg-[#111] p-[10px]"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-[5px] w-[5px] rounded-full bg-[#EEE7DC]"
            />
          ))}
        </motion.div>
      </div>
    </nav>
  );
}
