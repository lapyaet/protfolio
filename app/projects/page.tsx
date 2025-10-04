"use client";

import React from "react";
import { motion } from "framer-motion";
import { SmoothIn } from "@/lib/animation";
import Image from "next/image";
import ProjectCard from "@/component/card/ProjectCard";

const ProjectList = [
  {
    name: "CGC-Learn",
    src: "/cgc.png",
    dec: "CGC-Learn is a mobile-first platform that empowers young people with tools for mental resilience, employability, and lifelong learning. Target users include high school and university students, job seekers, career changers, and participants in youth development programs. The app integrates wellbeing practices, interactive career guidance, and professional skill-building resources into a single accessible platform.",
    link: "https://cgc-learn.com",
    use: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "React Native",
      "Next Auth",
      "Framer Motion",
      "Vercel",
      "GraphQL",
    ],
  },
  {
    name: "MM-Fonts",
    src: "/mmFont.png",
    dec: "This platform serves as a dedicated online marketplace where designers can sell their Myanmar fonts. Users can explore and try out different fonts, with options to download free fonts or purchase premium fonts—all in one place for convenience. The platform provides an easy way to upload and sell their creations while also gaining exposure and building recognition. As an e-commerce platform, it brings together a wide variety of fonts in one accessible space, making it simple for users to discover, test, and obtain the fonts they need in today’s fast-growing digital era.",
    link: "https://mmfont.vercel.app/en/",
    use: ["SolidJS", "Tailwind CSS", "TypeScript", "Framer Motion", "Vercel"],
  },
  {
    name: "Epic Uni",
    src: "/epicUni.png",
    dec: "EPIC Uni's practice platform is your key to enhancing PTE skills, offering tailored exercises and designed to elevate your PTE proficiency through targeted practice sessions.",
    link: "https://epicuni.net/",
    use: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Socket.io",
      "GraphQL",
    ],
  },
  {
    name: "DigitHouse",
    src: "/digitHouse.png",
    dec: "Digit House is a company that offers a wide range of digital products and services, including e-commerce, digital marketing, and digital content creation. The platform provides a user-friendly interface for users to browse, purchase, and manage their digital products and services. Digit House also offers a range of tools and resources to help users optimize their digital presence and achieve their business goals.",
    link: "https://digithouse.co",
    use: ["SolidJS", "Tailwind CSS", "TypeScript", "GSAP", "Vercel"],
  },
  {
    name: "DH Ticket",
    src: "/dhTicket.png",
    dec: "DH Ticket is a ticketing platform that offers a range of services to help users manage their travel arrangements. The platform provides a user-friendly interface for users to browse, purchase, and manage their travel tickets. DH Ticket also offers a range of tools and resources to help users optimize their travel experience and achieve their business goals.",
    link: "https://digithouse.co",
    use: ["SolidJS", "Tailwind CSS", "TypeScript", "GSAP", "Vercel"],
  },
];

const ProjectsPage = () => {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto px-4 lg:px-8 py-[110px] lg:gap-10 gap-8 overflow-scroll">
      <motion.h3
        variants={SmoothIn("up", 1.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-center bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 lg:text-4xl text-transparent font-bold text-2xl"
      >
        My Projects
      </motion.h3>
      <motion.p
        variants={SmoothIn("up", 1.8)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-center text-lg font-medium mt-4"
      >
        A collection of my favorite work, built with passion and creativity.
        <br />
        Each project reflects my journey as a front-end developer, combining
        design and technology to deliver beautiful and functional experiences.
      </motion.p>
      <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
        {ProjectList.map((project, i) => (
          <motion.div
            key={project.name}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={SmoothIn("up", i * 0.5 + 2.5)}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
