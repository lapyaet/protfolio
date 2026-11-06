"use client";

import React from "react";
import { motion, useScroll } from "motion/react";

/** Thin bar at the top of the screen showing how far a page has been scrolled. */
export const ScrollProgress = ({
  container,
}: {
  container: React.RefObject<HTMLElement | null>;
}) => {
  const { scrollYProgress: scaleX } = useScroll({ container });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
    />
  );
};
