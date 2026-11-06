import type { Variants } from "motion/react";

/**
 * Pages list delays starting around 1.5s. Compress them so content follows
 * the 2s page transition lifting, instead of arriving seconds after it.
 */
const pace = (delay: number) => Math.max(0, 1.3 + (delay - 1.5) * 0.3);

export const SmoothIn = (direction: string, delay: number): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      transition: {
        type: "tween",
        duration: 1,
        delay: pace(delay),
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
        delay: pace(delay),
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const Scale = (delay: number): Variants => {
  return {
    hidden: {
      scale: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        delay: pace(delay),
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
    show: {
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        delay: pace(delay),
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
  };
};
