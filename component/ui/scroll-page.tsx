"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  cancelFrame,
  frame,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { ScrollProgress } from "./scroll-progress";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import Footer from "../Footer";

type ScrollRef = React.RefObject<HTMLDivElement | null>;

const ScrollContext = createContext<ScrollRef | null>(null);

/** The page's scrolling element, for scroll-linked animation in children. */
export const useScrollContainer = () => {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("Must be used inside <ScrollPage>");
  return ctx;
};

/** Scrolling shell for a page: smooth scroll, progress bar, parallax context, footer. */
export const ScrollPage = ({
  children,
  scrollRef,
}: {
  children: React.ReactNode;
  scrollRef: ScrollRef;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (reduce || !scrollRef.current || !contentRef.current) return;
    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: contentRef.current,
      lerp: 0.09,
      wheelMultiplier: 0.9,
    });
    // Run on motion's frame loop so scroll and transforms update together.
    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(update, true);
    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, [reduce, scrollRef]);

  return (
    <ScrollContext.Provider value={scrollRef}>
      <div
        ref={scrollRef}
        className="relative w-full h-screen overflow-y-auto overflow-x-hidden"
      >
        <ScrollProgress container={scrollRef} />
        <div ref={contentRef}>
          {children}
          <Footer />
        </div>
      </div>
    </ScrollContext.Provider>
  );
};

/**
 * Scroll-driven 3D: the element swings in from depth, sits flat through the
 * middle of the screen, then tips away while leaving. Uses transform and
 * opacity only, so the browser can animate it on the GPU.
 */
export const Parallax = ({
  children,
  speed = 40,
  rotateX: tiltX = 22,
  rotateY: tiltY = 0,
  depth = 240,
  className,
}: {
  children: React.ReactNode;
  /** Vertical offset in px. Larger values lag further behind the page. */
  speed?: number;
  rotateX?: number;
  rotateY?: number;
  depth?: number;
  className?: string;
}) => {
  const container = useScrollContainer();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress: p } = useScroll({
    container,
    target: ref,
    offset: ["start end", "end start"],
  });
  const stops = [0, 0.3, 0.7, 1];
  const y = useTransform(p, stops, [speed, 0, 0, -speed]);
  const z = useTransform(p, stops, [-depth, 0, 0, -depth * 0.6]);
  const rotateX = useTransform(p, stops, [tiltX, 0, 0, -tiltX * 0.6]);
  const rotateY = useTransform(p, stops, [tiltY, 0, 0, -tiltY * 0.6]);
  const opacity = useTransform(p, [0, 0.22, 0.85, 1], [0, 1, 1, 0.2]);

  return (
    <motion.div
      ref={ref}
      style={
        reduce
          ? undefined
          : { y, z, rotateX, rotateY, opacity, transformPerspective: 1100 }
      }
      className={`will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
};

/** Page opening: tips backwards into the distance as the page scrolls away. */
export const HeroParallax = ({
  children,
  rate = 0.3,
  fade = true,
  className,
}: {
  children: React.ReactNode;
  rate?: number;
  fade?: boolean;
  className?: string;
}) => {
  const container = useScrollContainer();
  const reduce = useReducedMotionSafe();
  const { scrollY } = useScroll({ container });
  const y = useTransform(scrollY, [0, 700], [0, 700 * rate]);
  const z = useTransform(scrollY, [0, 700], [0, fade ? -320 : -120]);
  const rotateX = useTransform(scrollY, [0, 700], [0, fade ? 24 : 10]);
  const opacity = useTransform(scrollY, [0, 520], [1, fade ? 0 : 1]);

  return (
    <motion.div
      style={
        reduce
          ? undefined
          : { y, z, rotateX, opacity, transformPerspective: 1100 }
      }
      className={`will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
};
