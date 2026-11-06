import React from "react";
import type { Icon } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import { TiltCard } from "../ui/tilt-card";
import { GlowingEffect } from "../ui/glowing-effect";

type Props = {
  title: string;
  dec: string;
  icon: Icon;
  points: string[];
  index: number;
};

const ServiceCard = ({ title, dec, icon: ServiceIcon, points, index }: Props) => {
  return (
    <TiltCard maxTilt={7} className="h-full">
      <div className="group relative h-full rounded-3xl border border-violet-200/70 dark:border-white/15 bg-white/90 dark:bg-[#0f0e22]/90 shadow-xl shadow-violet-500/10 p-7">
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={60}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-4 right-6 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-violet-500/30 to-transparent select-none"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-white shadow-lg shadow-violet-500/40 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
          style={{ transform: "translateZ(40px)" }}
        >
          <ServiceIcon className="w-7 h-7" />
        </span>
        <h2 className="mt-5 text-xl lg:text-2xl font-extrabold">{title}</h2>
        <p className="mt-3 text-base font-medium text-slate-600 dark:text-white/70">
          {dec}
        </p>
        <ul className="mt-5 flex flex-col gap-2.5">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-sm font-semibold"
            >
              <span className="p-0.5 rounded-full bg-violet-500/15 text-[#8B5CF6]">
                <IconCheck className="w-4 h-4" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  );
};

export default ServiceCard;
