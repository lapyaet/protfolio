"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/util";

/**
 * Wraps children in a card that tilts in 3D toward the cursor,
 * with a moving glare highlight. Disabled for reduced-motion users.
 */
export const TiltCard = ({
  children,
  className,
  maxTilt = 12,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Normalised pointer position, -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const glareX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 55%)`;
  const glareOpacity = useMotionValue(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    glareOpacity.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full motion-reduce:!transform-none"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            )}
            style={{ background: glareBg, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
};
