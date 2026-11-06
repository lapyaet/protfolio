"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion } from "motion/react";
import { SmoothIn } from "@/lib/animation";

const Links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Me",
    href: "/about",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  const pathName = usePathname();
  return (
    <div className=" w-full fixed top-8 z-50">
      <motion.div
        key={pathName}
        initial={"hidden"}
        animate={"show"}
        exit={"hidden"}
        variants={SmoothIn("down", 1.5)}
        className="w-fit max-w-[calc(100%-1rem)] overflow-x-auto py-2 bg-white/90 dark:bg-[#0f0e22]/90 border border-white/60 dark:border-white/15 shadow-lg shadow-violet-500/20 mx-auto rounded-2xl flex items-center sm:gap-1 px-1 sm:px-2"
      >
        {Links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-xs sm:text-base font-bold whitespace-nowrap px-2 sm:px-4 py-2 rounded-xl transition-all duration-300 ${
              link.href === pathName
                ? "text-white bg-[#8B5CF6] shadow-md shadow-violet-500/30"
                : "bg-transparent text-slate-700 dark:text-white/80 hover:text-[#8B5CF6] dark:hover:text-white hover:bg-violet-100 dark:hover:bg-white/10"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <ThemeToggle />
      </motion.div>
    </div>
  );
};

export default Header;
