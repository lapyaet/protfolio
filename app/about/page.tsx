"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion } from "motion/react";
import { HeroParallax, Parallax, ScrollPage } from "@/component/ui/scroll-page";
import {
  IconBolt,
  IconBuilding,
  IconDeviceDesktop,
  IconMapPin,
  IconTimeline,
  IconUsers,
  IconCode,
} from "@tabler/icons-react";
import { SmoothIn } from "@/lib/animation";
import { TiltCard } from "@/component/ui/tilt-card";

const ProgressList = [
  { name: "HTML", percentage: 100 },
  { name: "CSS / Tailwind", percentage: 100 },
  { name: "React", percentage: 95 },
  { name: "Next.js", percentage: 90 },
  { name: "React Native", percentage: 85 },
];

const toolbox = [
  {
    group: "Frameworks",
    items: ["React", "Next.js", "SolidJS", "React Native"],
  },
  {
    group: "Languages & Styling",
    items: ["TypeScript", "JavaScript", "HTML", "Tailwind CSS"],
  },
  {
    group: "Data & Real-time",
    items: ["GraphQL", "Apollo Client", "Socket.io", "Next Auth"],
  },
  {
    group: "Motion & Deploy",
    items: ["Framer Motion", "GSAP", "Vercel", "Figma"],
  },
];

const facts = [
  { icon: IconBuilding, label: "Company", value: "Digithouse" },
  { icon: IconMapPin, label: "Location", value: "Chiang Mai, Thailand" },
  { icon: IconTimeline, label: "Experience", value: "4+ years" },
];

const values = [
  {
    icon: IconCode,
    title: "Clean code",
    text: "Readable, typed and maintainable components that are easy to grow.",
  },
  {
    icon: IconDeviceDesktop,
    title: "Responsive by default",
    text: "Interfaces that feel right on phones, tablets and desktops.",
  },
  {
    icon: IconBolt,
    title: "Performance",
    text: "Fast load times and smooth animation, not just pretty screens.",
  },
  {
    icon: IconUsers,
    title: "Collaboration",
    text: "Working closely with designers and developers to ship together.",
  },
];

const glass =
  "rounded-2xl border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#15142c]/90";

type Root = React.RefObject<HTMLDivElement | null>;

/** Scroll-triggered reveal: animates when the element enters the scroll container. */
const reveal = (i = 0) => ({
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const inView = (root: Root) => ({
  initial: "hidden",
  whileInView: "show",
  viewport: { root, once: true, amount: 0.25 },
});

const SectionTitle = ({ children, root }: { children: string; root: Root }) => (
  <motion.div variants={reveal()} {...inView(root)} className="mb-5">
    <h2 className="text-xl lg:text-2xl font-bold">{children}</h2>
    <motion.span
      variants={{
        hidden: { width: 0 },
        show: { width: 56, transition: { duration: 0.8, delay: 0.3 } },
      }}
      className="block h-1 mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
    />
  </motion.div>
);

/** Circular skill gauge */
const Ring = ({
  name,
  percentage,
  delay,
  root,
}: {
  name: string;
  percentage: number;
  delay: number;
  root: Root;
}) => {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className={`${glass} p-4 flex flex-col items-center gap-3`}>
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id={`g-${name}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            strokeWidth="7"
            className="stroke-violet-100 dark:stroke-white/10"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            stroke={`url(#g-${name})`}
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - percentage / 100) }}
            viewport={{ root, once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: "easeOut", delay }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold">
          {percentage}%
        </span>
      </div>
      <p className="text-sm font-semibold text-center">{name}</p>
    </div>
  );
};

const AboutMePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollPage scrollRef={scrollRef}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-[110px] pb-16 flex flex-col gap-16">
        {/* ---------- Intro ---------- */}
        <HeroParallax>
        <section className="flex lg:flex-row flex-col-reverse lg:items-center gap-10">
          <div className="flex-1 flex flex-col gap-5">
            <motion.h1
              variants={SmoothIn("up", 1.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 lg:text-5xl text-3xl text-transparent font-extrabold"
            >
              About Me
            </motion.h1>
            <motion.p
              variants={SmoothIn("up", 1.9)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-lg font-medium text-slate-700 dark:text-white/80"
            >
              I’m <strong>La Pyae Htun</strong>, a{" "}
              <strong>Front-End Web Developer</strong> with 4+ years of
              experience building modern, responsive and user-friendly web
              applications. I’m currently at <strong>Digithouse</strong> in
              Chiang Mai, Thailand, working closely with designers and
              developers to turn ideas into polished products.
            </motion.p>
            <motion.div
              variants={SmoothIn("up", 2.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid sm:grid-cols-3 gap-3"
            >
              {facts.map((f) => (
                <div key={f.label} className={`${glass} p-3 flex items-center gap-3`}>
                  <span className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                    <f.icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-white/60">
                      {f.label}
                    </p>
                    <p className="text-sm font-bold truncate">{f.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div
              variants={SmoothIn("up", 2.6)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex gap-4 flex-wrap"
            >
              <Link
                href="/projects"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/40 hover:scale-105 transition-transform"
              >
                See My Projects
              </Link>
              <Link
                href="/contact"
                className="relative px-5 py-3 rounded-xl font-bold text-slate-800 dark:text-white border border-violet-400/60 dark:border-white/25 bg-white/90 dark:bg-[#15142c]/90 shadow-sm hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-indigo-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={SmoothIn("left", 2.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 flex justify-center"
          >
            <TiltCard maxTilt={8} glare={false} className="w-full max-w-md">
              <div className="relative">
                <div
                  className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/60 via-indigo-500/40 to-cyan-400/40 blur-2xl"
                  style={{ transform: "translateZ(-30px)" }}
                />
                <div className={`${glass} !rounded-[2rem] p-4 relative`}>
                  <Image
                    src="/aboutMe.png"
                    alt="About me illustration"
                    width={500}
                    height={500}
                    priority
                    className="w-full h-auto"
                    style={{ transform: "translateZ(40px)" }}
                  />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>
        </HeroParallax>

        {/* ---------- Skills ---------- */}
        <section>
          <SectionTitle root={scrollRef}>Core Skills</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ProgressList.map((item, i) => (
              <Parallax
                key={item.name}
                speed={i % 2 ? 90 : 35}
                rotateY={(2 - i) * 11}
              >
                <motion.div variants={reveal(i)} {...inView(scrollRef)}>
                  <Ring
                    name={item.name}
                    percentage={item.percentage}
                    delay={0.3 + i * 0.15}
                    root={scrollRef}
                  />
                </motion.div>
              </Parallax>
            ))}
          </div>
        </section>

        {/* ---------- Toolbox ---------- */}
        <section>
          <SectionTitle root={scrollRef}>My Toolbox</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            {toolbox.map((g, i) => (
              <Parallax
                key={g.group}
                speed={i % 2 ? 90 : 40}
                rotateY={i % 2 ? -20 : 20}
              >
              <motion.div
                variants={reveal(i)}
                {...inView(scrollRef)}
                className={`${glass} p-5 h-full`}
              >
                <p className="text-sm font-bold text-[#8B5CF6] mb-3">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-sm font-semibold border border-violet-200/70 dark:border-white/15 bg-white/60 dark:bg-white/5 hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
              </Parallax>
            ))}
          </div>
        </section>

        {/* ---------- How I work ---------- */}
        <section>
          <SectionTitle root={scrollRef}>How I Work</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Parallax
                key={v.title}
                speed={[90, 35, 80, 30][i]}
                rotateY={[20, 7, -7, -20][i]}
              >
              <motion.div variants={reveal(i)} {...inView(scrollRef)}>
                <TiltCard maxTilt={8}>
                  <div className={`${glass} p-5 h-full`}>
                    <span className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white mb-3">
                      <v.icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-bold mb-1">{v.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-white/65">
                      {v.text}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
              </Parallax>
            ))}
          </div>
        </section>
      </div>
    </ScrollPage>
  );
};

export default AboutMePage;
