import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  front: React.ReactNode;
  back: React.ReactNode;
  axis?: "x" | "y";
  flipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
};

const FlipCard = ({ front, back, axis = "y", flipped, setFlipped }: Props) => {
  return (
    <div
      className={`group w-full cursor-pointer`}
      style={{ perspective: 1000 }}
    >
      {/* <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setFlipped((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((s) => !s);
          }
        }}
        className="relative w-full h-full p-0 border-0 bg-transparent"
      >
      </button> */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: axis === "x" ? (flipped ? 180 : 0) : 0,
          rotateY: axis === "y" ? (flipped ? 180 : 0) : 0,
        }}
        transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* Front */}
        <div
          className=" w-full overflow-hidden rounded-xl bg-white shadow-lg h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className=" absolute inset-0 w-full overflow-hidden rounded-2xl bg-white shadow-lg h-full"
          style={{
            transform: axis === "x" ? "rotateX(180deg)" : "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
