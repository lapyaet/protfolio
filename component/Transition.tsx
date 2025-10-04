import React from "react";
import { animate, motion } from "framer-motion";

const transionAnimation = {
  initial: {
    x: "-100%",
  },
  animate: {
    x: ["-100%", "0%", "-100%"],
  },
  exit: {
    x: ["-100%", "0%", "-100%"],
  },
};

const rightTransitionAnimation = {
  initial: {
    x: "100%",
  },
  animate: {
    x: ["100%", "0%", "100%"],
  },
  exit: {
    x: ["100%", "0%", "100%"],
  },
};

const Transition = () => {
  return (
    <>
      <motion.div
        variants={transionAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay: 0.2,
          duration: 2,
          ease: "easeInOut",
        }}
        className=" absolute w-1/2 left-0 h-screen z-100 top-0 bg-white shadow-2xl"
      />
      <motion.div
        variants={rightTransitionAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay: 0.2,
          duration: 2,
          ease: "easeInOut",
        }}
        className=" absolute w-1/2 right-0 h-screen z-100 top-0 bg-white shadow-2xl"
      />
    </>
  );
};

export default Transition;
