"use client";

import ServiceCard from "@/component/card/ServiceCard";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  IconBroadcast,
  IconCode,
  IconMessageCircle,
  IconPalette,
  IconRocket,
  IconTemplate,
} from "@tabler/icons-react";
import { SmoothIn } from "@/lib/animation";
import { HeroParallax, Parallax, ScrollPage } from "@/component/ui/scroll-page";

const serviceList = [
  {
    title: "Frontend Development",
    dec: "Pixel-perfect, responsive and optimized web apps built with React, Next.js and Tailwind CSS.",
    icon: IconCode,
    points: ["React & Next.js apps", "Responsive layouts", "Performance tuning"],
  },
  {
    title: "UI/UX Implementation",
    dec: "Turning Figma and Sketch designs into clean, interactive, user-friendly interfaces.",
    icon: IconPalette,
    points: [
      "Figma & Sketch to code",
      "Smooth interactions",
      "Reusable components",
    ],
  },
  {
    title: "Real-Time Applications",
    dec: "Chat apps, live dashboards and interactive tools built with Socket.io and Apollo Client.",
    icon: IconBroadcast,
    points: ["Chat & messaging", "Live dashboards", "Socket.io & Apollo Client"],
  },
];

const process = [
  {
    icon: IconMessageCircle,
    title: "Discuss",
    text: "We talk through your goals, users and what success looks like.",
  },
  {
    icon: IconTemplate,
    title: "Plan",
    text: "We turn the idea into clear screens, scope and next steps.",
  },
  {
    icon: IconCode,
    title: "Build",
    text: "I develop in small steps, so you can review progress as it grows.",
  },
  {
    icon: IconRocket,
    title: "Launch",
    text: "We test, polish and ship a fast, responsive product.",
  },
];

const ServicePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);

  // The line through the process steps draws itself while scrolling.
  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: processRef,
    offset: ["start end", "center center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
            What I Do
          </motion.p>
          <motion.h1
            variants={SmoothIn("up", 1.7)}
            initial="hidden"
            animate="show"
            className="mt-3 bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 lg:text-6xl text-4xl text-transparent font-extrabold"
          >
            My Services
          </motion.h1>
          <motion.p
            variants={SmoothIn("up", 1.9)}
            initial="hidden"
            animate="show"
            className="mt-4 text-lg font-medium text-slate-600 dark:text-white/70"
          >
            I help businesses and startups ship fast, responsive web
            applications with clean code and a great user experience.
          </motion.p>
        </section>
        </HeroParallax>

        {/* ---------- Service cards ---------- */}
        <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {serviceList.map((item, i) => (
            <Parallax
              key={item.title}
              speed={[50, 110, 70][i]}
              rotateY={[24, 0, -24][i]}
            >
              <motion.div
                variants={SmoothIn("up", 2.2 + i * 0.4)}
                initial="hidden"
                animate="show"
                className="h-full"
              >
                <ServiceCard {...item} index={i} />
              </motion.div>
            </Parallax>
          ))}
        </section>

        {/* ---------- Process ---------- */}
        <section ref={processRef} className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ root: scrollRef, once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-[#8B5CF6]">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold">
              From idea to launch
            </h2>
          </motion.div>

          <div className="relative mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Connecting line behind the step icons */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-violet-200 dark:bg-white/10"
            >
              <motion.div
                style={{ scaleX: lineScale }}
                className="h-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
              />
            </div>
            {process.map((step, i) => (
              <Parallax
                key={step.title}
                speed={i % 2 ? 90 : 40}
                rotateY={[20, 7, -7, -20][i]}
              >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ root: scrollRef, once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative h-full text-center rounded-2xl border border-violet-200/70 dark:border-white/10 bg-white/90 dark:bg-[#0f0e22]/90 p-5"
              >
                <span className="relative inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-violet-500/40">
                  <step.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold">
                  {i + 1}. {step.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-white/70 max-w-[240px] mx-auto">
                  {step.text}
                </p>
              </motion.div>
              </Parallax>
            ))}
          </div>
        </section>

        {/* ---------- Call to action ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ root: scrollRef, once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative mt-28 overflow-hidden rounded-3xl bg-gradient-to-br from-[#8B5CF6] via-indigo-600 to-cyan-500 px-6 py-14 text-center text-white shadow-[0_30px_80px_-25px_rgba(139,92,246,0.8)]"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px]"
          />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-extrabold">
              Ready to work together?
            </h2>
            <p className="mt-3 text-lg font-medium text-white/85">
              Let’s turn your idea into a polished, working product.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-[#6d3df0] font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Get in Touch
              </Link>
              <Link
                href="/projects"
                className="px-6 py-3 rounded-xl border border-white/60 text-white font-bold hover:bg-white/15 transition-colors"
              >
                See My Work
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </ScrollPage>
  );
};

export default ServicePage;
