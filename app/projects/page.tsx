"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { HeroParallax, ScrollPage } from "@/component/ui/scroll-page";
import { SmoothIn } from "@/lib/animation";
import ProjectCard from "@/component/card/ProjectCard";
import { ProjectList } from "@/lib/projects";

const filters = ["All", "Next.js", "SolidJS", "React Native", "GraphQL"];

// Page transition covers the screen until about this long after mount.
const INTRO_DELAY = 1.3;

const ProjectsPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");
  // Only the first row is visible on arrival, so only it waits for the page
  // transition. Rows further down must appear the moment they scroll in.
  const [filtered, setFiltered] = useState(false);

  const visible = ProjectList.filter(
    (p) => filter === "All" || p.use.includes(filter)
  );

  return (
    <ScrollPage scrollRef={scrollRef}>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-[120px] pb-16">
        {/* ---------- Heading ---------- */}
        <HeroParallax>
        <section className="text-center max-w-3xl mx-auto">
          <motion.p
            variants={SmoothIn("up", 1.5)}
            initial="hidden"
            animate="show"
            className="text-sm font-bold tracking-[0.3em] uppercase text-[#8B5CF6]"
          >
            Selected Work
          </motion.p>
          <motion.h1
            variants={SmoothIn("up", 1.7)}
            initial="hidden"
            animate="show"
            className="mt-3 bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 lg:text-6xl text-4xl text-transparent font-extrabold"
          >
            My Projects
          </motion.h1>
          <motion.p
            variants={SmoothIn("up", 1.9)}
            initial="hidden"
            animate="show"
            className="mt-4 text-lg font-medium text-slate-600 dark:text-white/70"
          >
            A selection of products I’ve helped build, each one blending
            thoughtful design with solid engineering.
          </motion.p>

          {/* Filters */}
          <motion.div
            variants={SmoothIn("up", 2.1)}
            initial="hidden"
            animate="show"
            role="group"
            aria-label="Filter projects by technology"
            className="mt-7 flex flex-wrap justify-center gap-2"
          >
            {filters.map((f) => {
              const active = f === filter;
              const count =
                f === "All"
                  ? ProjectList.length
                  : ProjectList.filter((p) => p.use.includes(f)).length;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(f);
                    setFiltered(true);
                  }}
                  className={`relative cursor-pointer px-4 py-2 rounded-full text-sm font-bold border transition-colors duration-300 ${
                    active
                      ? "text-white border-transparent"
                      : "text-slate-700 dark:text-white/80 border-violet-300/70 dark:border-white/20 bg-white/90 dark:bg-[#15142c]/90 hover:border-[#8B5CF6]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B5CF6] to-indigo-500 shadow-lg shadow-violet-500/40"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {f} <span className="opacity-70">{count}</span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        </section>
        </HeroParallax>

        {/* ---------- Showcase ---------- */}
        <div key={filter} className="mt-20 flex flex-col gap-24 lg:gap-32">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              root={scrollRef}
              introDelay={i === 0 && !filtered ? INTRO_DELAY : 0}
            />
          ))}
        </div>

        {/* ---------- Call to action ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ root: scrollRef, once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-28 rounded-3xl border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#15142c]/90 px-6 py-12 text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-extrabold">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-lg font-medium text-slate-600 dark:text-white/70">
            Let’s turn your idea into a polished, working product.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/40 hover:scale-105 transition-transform"
          >
            Get in Touch
          </Link>
        </motion.section>
      </div>
    </ScrollPage>
  );
};

export default ProjectsPage;
