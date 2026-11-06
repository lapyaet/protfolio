"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

/** Toggles the `dark` class on <html> and remembers the choice. */
const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const apply = (next: boolean) => {
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !dark;
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!reduce && doc.startViewTransition) {
      // Circle expands from the button across the whole screen
      const t = doc.startViewTransition(() => apply(next));
      t.ready.then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      // Fallback: fade all colors
      root.classList.add("theme-fade");
      apply(next);
      setTimeout(() => root.classList.remove("theme-fade"), 600);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-xl cursor-pointer text-slate-700 dark:text-white/80 hover:bg-violet-100 dark:hover:bg-white/10 transition-all duration-300"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      <motion.span
        key={mounted && !dark ? "moon" : "sun"}
        initial={mounted ? { rotate: -90, scale: 0.4, opacity: 0 } : false}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="block"
      >
        {mounted && !dark ? (
          <IconMoon className="w-5 h-5" />
        ) : (
          <IconSun className="w-5 h-5" />
        )}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
