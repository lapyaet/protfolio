"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "motion/react";
import { TiltCard } from "../ui/tilt-card";
import { Parallax } from "../ui/scroll-page";

export type Project = {
  name: string;
  category: string;
  src: string;
  dec: string;
  link: string;
  use: string[];
};

type Props = {
  project: Project;
  index: number;
  /** Scrolling element of the page, used for reveal and parallax. */
  root: React.RefObject<HTMLDivElement | null>;
  /** Holds the first reveal back until the page transition has cleared. */
  introDelay: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

const ProjectCard = ({ project, index, root, introDelay }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const domain = project.link.replace(/^https?:\/\//, "").split("/")[0];

  // Number and screenshot drift at different speeds while scrolling.
  const { scrollYProgress } = useScroll({
    container: root,
    target: ref,
    offset: ["start end", "end start"],
  });
  const numberY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const viewport = { root, once: true, amount: 0.25 };

  return (
    <article
      ref={ref}
      className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
    >
      {/* ---------- Screenshot in a browser window ---------- */}
      <Parallax
        speed={70}
        rotateX={8}
        rotateY={reversed ? -32 : 32}
        depth={320}
        className={`min-w-0 ${reversed ? "lg:order-2" : ""}`}
      >
      <motion.div
        initial={{ opacity: 0, x: reversed ? 80 : -80, rotateZ: reversed ? 2 : -2 }}
        whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease, delay: introDelay }}
      >
        <TiltCard maxTilt={6}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.name}`}
            className="group block rounded-2xl overflow-hidden border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#0f0e22]/90 shadow-[0_30px_70px_-25px_rgba(139,92,246,0.65)]"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-violet-200/70 dark:border-white/10">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="flex-1 min-w-0 truncate rounded-md bg-violet-100/70 dark:bg-white/10 px-3 py-0.5 text-center text-xs font-medium text-slate-600 dark:text-white/60">
                {domain}
              </span>
            </div>
            <div className="relative aspect-[2.2/1] overflow-hidden bg-slate-900">
              {/* Screenshots vary in shape: show them whole over a blurred fill. */}
              <Image
                src={project.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover scale-125 blur-2xl opacity-70"
              />
              <Image
                src={project.src}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </a>
        </TiltCard>
      </motion.div>
      </Parallax>

      {/* ---------- Details ---------- */}
      <Parallax
        speed={130}
        rotateX={8}
        rotateY={reversed ? 18 : -18}
        depth={140}
        className={`min-w-0 ${reversed ? "lg:order-1" : ""}`}
      >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease, delay: introDelay + 0.15 }}
        className="relative rounded-3xl border border-violet-200/70 dark:border-white/10 bg-white/90 dark:bg-[#0f0e22]/90 p-6 lg:p-8"
      >
        <motion.span
          aria-hidden
          style={{ y: numberY }}
          className="pointer-events-none absolute top-2 right-5 text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-violet-500/30 to-transparent select-none"
        >
          {number}
        </motion.span>
        <p className="text-sm font-bold tracking-widest uppercase text-[#8B5CF6]">
          {project.category}
        </p>
        <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold">
          {project.name}
        </h2>
        <p className="mt-4 text-base lg:text-lg font-medium text-slate-600 dark:text-white/70">
          {project.dec}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.use.map((tech) => (
            <li
              key={tech}
              className="px-3 py-1 rounded-full text-sm font-semibold border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#15142c]/90 text-slate-700 dark:text-white/80"
            >
              {tech}
            </li>
          ))}
        </ul>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/40 hover:scale-105 transition-transform"
        >
          Visit Website
          <IconArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
      </Parallax>
    </article>
  );
};

export default ProjectCard;
