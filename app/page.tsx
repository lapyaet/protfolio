"use client";
import { TextGenerateEffect } from "@/component/ui/text-generate-effect";
import { ContainerTextFlip } from "@/component/ui/container-flip-text";
import { TiltCard } from "@/component/ui/tilt-card";
import { HeroParallax, Parallax, ScrollPage } from "@/component/ui/scroll-page";
import { ProjectList } from "@/lib/projects";
import { useRef } from "react";
import {
  IconArrowRight,
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconMapPin,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Scale, SmoothIn } from "@/lib/animation";

const Links = [
  {
    name: "facebook",
    href: "https://www.facebook.com/la.pyae.523759",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/la-pyae-a24359226/",
  },
  {
    name: "Github",
    href: "https://github.com/lapyaet",
  },
];

const stats = [
  { value: "4+", label: "Years experience" },
  { value: "5", label: "Featured projects" },
  { value: "10+", label: "Technologies" },
];

const techStack = [
  "React",
  "Next.js",
  "SolidJS",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "GraphQL",
  "Socket.io",
  "GSAP",
  "Framer Motion",
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollPage scrollRef={scrollRef}>
      <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 lg:px-8 pt-[110px] pb-6">
        <div className="flex-1 flex items-center lg:flex-row flex-col-reverse lg:gap-6 gap-10">
          {/* ---------- Left: copy ---------- */}
          <HeroParallax rate={0.35} className="flex-1 w-full flex flex-col gap-5 lg:items-start items-center lg:text-left text-center">
            <motion.div
              variants={SmoothIn("down", 1.8)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="inline-flex items-center gap-2 rounded-full border border-violet-300/60 dark:border-white/15 bg-white/90 dark:bg-[#15142c]/90 px-4 py-1.5 text-sm font-semibold"
            >
              <IconMapPin className="w-4 h-4 text-[#8B5CF6]" />
              Based in Chiang Mai, Thailand
            </motion.div>

            <div>
              <TextGenerateEffect words="Hello," delay={1.35} />
              <TextGenerateEffect words="I’m La Pyae Htun" delay={1.5} />
              <TextGenerateEffect
                words="Front-End Web Developer"
                color="text-transparent"
                delay={1.7}
                className="bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400"
              />
            </div>

            <motion.div
              variants={SmoothIn("up", 3.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-wrap items-center lg:justify-start justify-center gap-x-3 text-lg font-medium text-slate-600 dark:text-white/70"
            >
              <span>I build fast, modern web apps with</span>
              <ContainerTextFlip
                words={["React", "Next.js", "SolidJS", "React Native"]}
                className="!text-base !pt-1 !pb-2"
              />
            </motion.div>

            <div className="flex flex-wrap lg:justify-start justify-center gap-4 items-center">
              <Link href="/projects">
                <motion.button
                  variants={Scale(3.6)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/40"
                >
                  View My Work
                  <IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  variants={Scale(3.8)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer relative px-5 py-3 rounded-xl font-bold text-slate-800 dark:text-white border border-violet-400/60 dark:border-white/25 bg-white/90 dark:bg-[#15142c]/90 shadow-sm hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-indigo-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300"
                >
                  Let’s Work Together
                </motion.button>
              </Link>
              <div className="flex gap-2">
                {Links.map((link, i) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    aria-label={link.name}
                  >
                    <motion.button
                      variants={Scale(i * 0.2 + 4)}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="cursor-pointer p-2.5 rounded-full border border-violet-400/60 dark:border-white/25 bg-white/90 dark:bg-[#15142c]/90 text-slate-800 dark:text-white hover:bg-[#8B5CF6] hover:border-transparent hover:text-white transition-all duration-300"
                    >
                      {link.name === "facebook" && (
                        <IconBrandFacebookFilled className="w-5 h-5" />
                      )}
                      {link.name === "LinkedIn" && (
                        <IconBrandLinkedinFilled className="w-5 h-5" />
                      )}
                      {link.name === "Github" && (
                        <IconBrandGithubFilled className="w-5 h-5" />
                      )}
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              variants={SmoothIn("up", 4.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mt-2 grid grid-cols-3 gap-3 w-full max-w-md"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#15142c]/90 px-3 py-3"
                >
                  <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-purple-500">
                    {s.value}
                  </p>
                  <p className="text-xs font-medium text-slate-600 dark:text-white/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </HeroParallax>

          {/* ---------- Right: 3D hero card ---------- */}
          <HeroParallax rate={0.12} fade={false} className="lg:flex-1 flex justify-center lg:justify-end items-center">
            <motion.div
              variants={SmoothIn("left", 2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="relative w-[280px] sm:w-[340px] lg:w-[420px]"
            >
              <TiltCard maxTilt={9} glare={false}>
                <div className="relative aspect-[4/5] w-full">
                  {/* Rotating orbit rings behind everything */}
                  <motion.div
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-6 rounded-full border border-dashed border-violet-400/50"
                    style={{ z: -40 }}
                  />
                  <motion.div
                    aria-hidden
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-14 rounded-full border border-cyan-400/30"
                    style={{ z: -60 }}
                  />

                  {/* Glass panel (head pops out of the top) */}
                  <div
                    className="absolute inset-x-0 bottom-0 top-[20%] rounded-[2.25rem] border border-white/40 dark:border-white/15 bg-gradient-to-br from-violet-500/80 via-indigo-500/70 to-cyan-400/60 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.7)] overflow-hidden"
                    style={{ transform: "translateZ(0px)" }}
                  >
                    {/* dot grid texture */}
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:18px_18px]" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/30 blur-2xl" />
                  </div>

                  {/* Portrait */}
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "translateZ(50px)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 82%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to bottom, black 82%, transparent 100%)",
                    }}
                  >
                    <Image
                      src="/profile.png"
                      alt="La Pyae Htun"
                      width={484}
                      height={516}
                      priority
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
                    />
                  </div>

                  {/* Floating code card */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[6%] -left-6 lg:-left-16"
                    style={{ z: 90 }}
                  >
                    <div className="rounded-xl border border-white/20 bg-slate-900/90 px-3 py-2.5 shadow-xl text-[10px] lg:text-xs font-mono leading-relaxed text-slate-200">
                      <div className="flex gap-1 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                      <p>
                        <span className="text-violet-400">const</span> dev = {"{"}
                      </p>
                      <p className="pl-3">
                        role: <span className="text-emerald-400">"Front-End"</span>,
                      </p>
                      <p className="pl-3">
                        stack: <span className="text-cyan-300">"React"</span>,
                      </p>
                      <p>{"}"}</p>
                    </div>
                  </motion.div>

                  {/* Floating experience card */}
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[10%] -right-4 lg:-right-12"
                    style={{ z: 80 }}
                  >
                    <div className="rounded-2xl border border-white/40 dark:border-white/20 bg-white/85 dark:bg-slate-900/90 px-4 py-3 shadow-xl">
                      <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-purple-500 leading-none">
                        4+ yrs
                      </p>
                      <p className="text-[11px] font-medium text-slate-600 dark:text-white/70 mt-1">
                        building for the web
                      </p>
                    </div>
                  </motion.div>

                  {/* Floating tech badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[34%] -right-3 lg:-right-10"
                    style={{ z: 110 }}
                  >
                    <span className="block px-3 py-1.5 rounded-xl text-xs lg:text-sm font-bold border border-white/40 dark:border-white/20 bg-white/85 dark:bg-slate-900/90 shadow-lg">
                      ⚛️ React · Next.js
                    </span>
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          </HeroParallax>
        </div>

        {/* ---------- Bottom: tech marquee ---------- */}
        <HeroParallax rate={0.35}>
        <motion.div
          variants={SmoothIn("up", 4.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="marquee flex w-max gap-3">
            {[...techStack, ...techStack].map((t, i) => (
              <span
                key={t + i}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#15142c]/90 text-slate-700 dark:text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
        </HeroParallax>
      </div>

      {/* ---------- Selected work ---------- */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ root: scrollRef, once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-[#8B5CF6]">
              Selected Work
            </p>
            <h2 className="mt-3 text-3xl lg:text-5xl font-extrabold">
              Recent projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-bold text-[#8B5CF6] dark:text-violet-300"
          >
            View all projects
            <IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {ProjectList.slice(0, 3).map((project, i) => (
            <Parallax
              key={project.name}
              speed={[50, 120, 70][i]}
              rotateY={[24, 0, -24][i]}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ root: scrollRef, once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <TiltCard maxTilt={7}>
                  <Link
                    href="/projects"
                    className="group block overflow-hidden rounded-2xl border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#0f0e22]/90 shadow-xl shadow-violet-500/10"
                  >
                    <div className="relative aspect-[2.2/1] overflow-hidden bg-slate-900">
                      <Image
                        src={project.src}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold tracking-widest uppercase text-[#8B5CF6]">
                        {project.category}
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold">
                        {project.name}
                      </h3>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </section>
    </ScrollPage>
  );
}
