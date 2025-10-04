"use client";
import { TextGenerateEffect } from "@/component/ui/text-generate-effect";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, SmoothIn } from "@/lib/animation";

const worlds = [
  {
    text: "Front-End Web Developer",
  },
  {
    text: "</br>",
  },
  {
    text: "Hello I'm",
  },
  {
    text: "</br>",
  },
  {
    text: "La Pyae Htun",
    color: "#8B5CF6",
  },
];

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

export default function Home() {
  return (
    <div className=" w-full h-screen">
      <div className="w-full h-screen flex items-center lg:flex-row flex-col-reverse max-w-7xl mx-auto px-4 lg:px-8 py-[110px] lg:gap-0 gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <TextGenerateEffect words="Hello" delay={2} />
            <TextGenerateEffect words="I’m La Pyae Htun" delay={2.5} />
            <TextGenerateEffect
              words="Front-End Web Developer"
              color="text-transparent"
              delay={3.5}
              className=" bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500"
            />
          </div>
          <motion.p
            variants={SmoothIn("up", 2.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-black text-lg font-medium"
          >
            I build responsive, modern web applications with React, SolidJS, and
            Tailwind CSS.
          </motion.p>
          <div className="flex gap-4 items-center">
            <Link href="/contact">
              <motion.button
                variants={Scale(3)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className=" cursor-pointer px-4 py-2 rounded-xl bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/80 hover:text-white font-bold"
              >
                Contact Me
              </motion.button>
            </Link>
            {Links.map((link, i) => (
              <Link key={link.name} href={link.href} target="_blank">
                <motion.button
                  variants={Scale(i * 0.5 + 3.5)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  key={link.name}
                  className="cursor-pointer p-2 rounded-full border border-[#8B5CF6]  hover:bg-[#8B5CF6] transition-all duration-300 text-[#8B5CF6] hover:text-white"
                >
                  {link.name === "facebook" && (
                    <IconBrandFacebookFilled className="w-5 h-5 " />
                  )}
                  {link.name === "LinkedIn" && (
                    <IconBrandLinkedinFilled className=" w-5 h-5 " />
                  )}
                  {link.name === "Github" && (
                    <IconBrandGithubFilled className=" w-5 h-5" />
                  )}
                </motion.button>
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:flex-1 flex justify-end items-center">
          <motion.div
            variants={Scale(2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="lg:w-[500px] lg:h-[500px] w-[200px] h-[200px] relative border-2 rounded-full overflow-hidden shadow-[0_0_25px_rgba(167,139,250,0.8)] border-violet-300 "
          >
            <Image
              src={"/profile.png"}
              alt="profile"
              width={200}
              height={200}
              className="lg:w-[500px] lg:h-[500px] w-[200px] h-[200px] object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
