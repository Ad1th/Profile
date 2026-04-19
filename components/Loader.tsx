"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WORDS = ["Hello", "Hola", "Bonjour", "नमस्ते", "Ciao", "こんにちは"];

type LoaderProps = {
  onDone: () => void;
};

export default function Loader({ onDone }: LoaderProps) {
  const [index, setIndex] = useState(0);
  const [finalPhase, setFinalPhase] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    const runSequence = async () => {
      for (let i = 0; i < WORDS.length; i += 1) {
        if (cancelled) return;
        setIndex(i);
        await sleep(760);
      }

      if (cancelled) return;
      setFinalPhase(true);
      await sleep(520);
      if (!cancelled) onDoneRef.current();
    };

    runSequence();

    return () => {
      cancelled = true;
    };
  }, []);

  const word = WORDS[index] ?? WORDS[0];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: finalPhase ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "#090909",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`${word}-${finalPhase ? "final" : "run"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={
            finalPhase
              ? { opacity: 0, y: 0, scale: 1.2, filter: "blur(6px)" }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: finalPhase ? 0.48 : 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            color: "#f2f2f2",
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            letterSpacing: "0.02em",
          }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
