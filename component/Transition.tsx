"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { usePathname } from "next/navigation";

const COLUMNS = 6;

const titles: Record<string, string> = {
  "/": "Home",
  "/about": "About Me",
  "/projects": "Projects",
  "/services": "Services",
  "/contact": "Contact",
};

// Each column rises to cover the screen, holds, then continues up to reveal the page.
const columnVariants = {
  initial: { y: "100%" },
  animate: (i: number) => ({
    y: ["100%", "0%", "0%", "-100%"],
    transition: {
      // Hold (0.6s) must outlast the stagger (0.35s) so the screen is fully covered.
      duration: 1.7,
      times: [0, 0.33, 0.68, 1],
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.05 + i * 0.07,
    },
  }),
};

const Transition = () => {
  const pathname = usePathname();
  const reduce = useReducedMotionSafe();
  if (reduce) return null;

  const title = titles[pathname] ?? "";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Curtain columns */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={columnVariants}
            initial="initial"
            animate="animate"
            className="relative h-full flex-1 bg-gradient-to-b from-violet-600 via-indigo-700 to-[#07070f] -mr-px"
          >
            <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
          </motion.div>
        ))}
      </div>

      {/* Center label while the screen is covered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
          transition={{
            delay: 0.6,
            duration: 1.0,
            times: [0, 0.25, 0.75, 1],
            ease: "easeOut",
          }}
          className="text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-white/70"
        >
          La Pyae Htun
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [40, 0, 0, -40],
            filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"],
          }}
          transition={{
            delay: 0.65,
            duration: 1.0,
            times: [0, 0.25, 0.75, 1],
            ease: "easeOut",
          }}
          className="text-4xl sm:text-6xl font-extrabold"
        >
          {title}
        </motion.h2>
        <motion.span
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{
            delay: 0.75,
            duration: 0.9,
            times: [0, 0.7, 1],
            ease: "easeInOut",
          }}
          className="block h-1 w-40 origin-left rounded-full bg-gradient-to-r from-cyan-300 via-white to-violet-300"
        />
      </div>
    </div>
  );
};

export default Transition;
