"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
} from "@tabler/icons-react";
import { useScrollContainer } from "./ui/scroll-page";

const pages = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/la.pyae.523759",
    icon: IconBrandFacebookFilled,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/la-pyae-a24359226/",
    icon: IconBrandLinkedinFilled,
  },
  {
    name: "GitHub",
    href: "https://github.com/lapyaet",
    icon: IconBrandGithubFilled,
  },
];

const Footer = () => {
  const container = useScrollContainer();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    container,
    target: ref,
    offset: ["start end", "end end"],
  });
  // The big name slides into place as the footer scrolls up.
  const x = useTransform(scrollYProgress, [0, 1], ["-14%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [65, 0]);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-violet-200/70 dark:border-white/10 bg-white/90 dark:bg-[#0f0e22]/90"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-sm font-semibold text-slate-600 dark:text-white/70 hover:text-[#8B5CF6] dark:hover:text-white transition-colors"
              >
                {page.name}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 rounded-full border border-violet-300/70 dark:border-white/20 text-slate-700 dark:text-white/80 hover:bg-[#8B5CF6] hover:border-transparent hover:text-white transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <motion.p
          aria-hidden
          style={{ x, y, rotateX, transformPerspective: 900, transformOrigin: "bottom" }}
          className="mt-6 whitespace-nowrap text-center text-[11vw] xl:text-[150px] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 select-none"
        >
          La Pyae Htun
        </motion.p>
        <p className="mt-6 text-center text-xs font-medium text-slate-500 dark:text-white/50">
          © La Pyae Htun · Front-End Web Developer · Chiang Mai, Thailand
        </p>
      </div>
    </footer>
  );
};

export default Footer;
