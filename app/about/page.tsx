"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { SmoothIn } from "@/lib/animation";

const ProgressList = [
  {
    name: "HTML",
    percentage: 100,
  },
  {
    name: "CSS / Tailwind CSS",
    percentage: 100,
  },
  {
    name: "React",
    percentage: 95,
  },
  {
    name: "Next.js",
    percentage: 90,
  },
  {
    name: "ReactNative",
    percentage: 85,
  },
];

const AboutMePage = () => {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto px-4 lg:px-8 py-[110px] lg:gap-10 gap-8 flex lg:flex-row flex-col-reverse">
      <div className="flex-1 flex flex-col justify-center gap-4">
        <motion.h3
          variants={SmoothIn("up", 1.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className=" bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 lg:text-4xl text-transparent font-bold text-2xl"
        >
          About Me
        </motion.h3>
        <motion.p
          variants={SmoothIn("up", 2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-lg font-medium"
        >
          Hi, I’m <strong>La Pyae Htun</strong>, a passionate{" "}
          <strong>Front-End Web Developer</strong> with over 4 years of
          experience crafting modern, responsive, and user-friendly web
          applications. Currently, I work at <strong>Digithouse Company</strong>{" "}
          in Chiang Mai, Thailand, where I collaborate with designers and
          developers to bring creative ideas to life.
        </motion.p>
        <div>
          <motion.p
            variants={SmoothIn("up", 2.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-lg font-bold"
          >
            specialize in building high-quality websites and applications using:
          </motion.p>
          <div className="flex flex-col gap-4 mt-4">
            {ProgressList.map((item, i) => (
              <motion.div
                variants={SmoothIn("up", i * 0.5 + 3)}
                initial="hidden"
                animate="show"
                exit="hidden"
                key={item.name}
                className="flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">{item.name}</p>
                  <p>{item.percentage}%</p>
                </div>

                <div className="w-full h-2 rounded-full bg-gray-300 relative overflow-hidden">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut",
                      delay: i * 0.5 + 3,
                    }}
                    className={`h-2 rounded-full bg-[#8B5CF6]`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <motion.div
          variants={SmoothIn("left", 2.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full"
        >
          <Image
            src={"/aboutMe.png"}
            alt="about me"
            width={600}
            height={400}
            className="object-cover object-center aspect-auto w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMePage;
