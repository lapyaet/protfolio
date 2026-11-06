"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SmoothIn } from "@/lib/animation";
import { GlowingEffect } from "@/component/ui/glowing-effect";
import { TiltCard } from "@/component/ui/tilt-card";
import { HeroParallax, Parallax, ScrollPage } from "@/component/ui/scroll-page";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconCheck,
  IconClock,
  IconCopy,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import ContactForm from "@/component/ContactForm";

const EMAIL = "lapyae12442@gmail.com";

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

const glass =
  "rounded-2xl border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#0f0e22]/90";

/** Current time in Chiang Mai, rendered after mount so it matches the visitor's clock. */
const LocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => setTime(format.format(new Date()));
    const first = setTimeout(update, 0);
    const id = setInterval(update, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
};

const ContactPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <ScrollPage scrollRef={scrollRef}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-[120px] pb-12">
        {/* ---------- Heading ---------- */}
        <HeroParallax>
        <section className="text-center max-w-3xl mx-auto">
          <motion.p
            variants={SmoothIn("up", 1.5)}
            initial="hidden"
            animate="show"
            className="text-sm font-bold tracking-[0.3em] uppercase text-[#8B5CF6]"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            variants={SmoothIn("up", 1.7)}
            initial="hidden"
            animate="show"
            className="mt-3 bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 lg:text-6xl text-4xl text-transparent font-extrabold"
          >
            Contact Me
          </motion.h1>
          <motion.p
            variants={SmoothIn("up", 1.9)}
            initial="hidden"
            animate="show"
            className="mt-4 text-lg font-medium text-slate-600 dark:text-white/70"
          >
            Have a project or an idea? Tell me about it and let’s see how I can
            help.
          </motion.p>
        </section>
        </HeroParallax>

        <div className="mt-12 grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-8">
          {/* ---------- Left: details ---------- */}
          <Parallax speed={50} rotateY={16} className="min-w-0">
          <motion.div
            variants={SmoothIn("right", 2.2)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            <TiltCard maxTilt={6}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8B5CF6] via-indigo-600 to-cyan-500 p-7 text-white shadow-[0_30px_70px_-25px_rgba(139,92,246,0.8)]">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]"
                />
                <div
                  aria-hidden
                  className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/20 blur-xl"
                />
                <div className="relative">
                  <h2 className="text-2xl font-extrabold">
                    Let’s talk about your next project
                  </h2>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
                    <IconClock className="w-4 h-4" />
                    <LocalTime /> in Chiang Mai
                  </p>
                  <div className="mt-6 flex gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="p-2.5 rounded-full bg-white text-[#6d3df0] hover:scale-110 transition-transform"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Email */}
            <div className={`${glass} p-4 flex items-center gap-3`}>
              <span className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <IconMail className="w-5 h-5" />
              </span>
              <a href={`mailto:${EMAIL}`} className="flex-1 min-w-0 group">
                <p className="text-xs font-medium text-slate-500 dark:text-white/60">
                  Email
                </p>
                <p className="text-sm font-bold truncate group-hover:text-[#8B5CF6] transition-colors">
                  {EMAIL}
                </p>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="p-2 rounded-lg cursor-pointer text-slate-600 dark:text-white/70 hover:bg-violet-100 dark:hover:bg-white/10 transition-colors"
              >
                {copied ? (
                  <IconCheck className="w-5 h-5 text-emerald-500" />
                ) : (
                  <IconCopy className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Phone */}
              <a
                href="tel:+66864477363"
                className={`${glass} group p-4 flex items-center gap-3`}
              >
                <span className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  <IconPhone className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 dark:text-white/60">
                    Phone
                  </p>
                  <p className="text-sm font-bold truncate group-hover:text-[#8B5CF6] transition-colors">
                    +66 864 477 363
                  </p>
                </div>
              </a>
              {/* Location */}
              <div className={`${glass} p-4 flex items-center gap-3`}>
                <span className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  <IconMapPin className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 dark:text-white/60">
                    Location
                  </p>
                  <p className="text-sm font-bold">
                    Chiang Mai, Thailand
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          </Parallax>

          {/* ---------- Right: form ---------- */}
          <Parallax speed={25} rotateY={-12} className="min-w-0">
          <motion.div
            variants={SmoothIn("left", 2.5)}
            initial="hidden"
            animate="show"
            className={`${glass} !rounded-3xl relative p-6 lg:p-8 shadow-2xl shadow-violet-500/10`}
          >
            <GlowingEffect
              blur={0}
              borderWidth={2}
              spread={80}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <h2 className="text-2xl font-extrabold mb-6">Send a message</h2>
            <ContactForm />
          </motion.div>
          </Parallax>
        </div>
      </div>
    </ScrollPage>
  );
};

export default ContactPage;
