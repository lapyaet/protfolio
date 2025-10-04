"use client";

import ServiceCard from "@/component/card/ServiceCard";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { SmoothIn } from "@/lib/animation";

const serviceList = [
  {
    title: "Frontend Development",
    dec: "Pixel-perfect, responsive, and optimized web apps built with React, Next.js, and Tailwind CSS.",
  },
  {
    title: "UI/UX Implementation",
    dec: "Transforming Figma/Sketch designs into clean, interactive, and user-friendly interfaces.",
  },
  {
    title: "Real-Time Applications",
    dec: "Building chat apps, live dashboards, and interactive tools with Socket.io and Apollo Client.",
  },
];

const ServicePage = () => {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto px-4 lg:px-8 py-[110px] lg:gap-16 gap-8 overflow-scroll flex flex-col justify-center ">
      <section className="text-center">
        <motion.h1
          variants={SmoothIn("up", 1.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-center bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 lg:text-4xl text-transparent font-bold text-2xl"
        >
          My Services
        </motion.h1>
        <motion.p
          variants={SmoothIn("up", 2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-center text-lg font-medium mt-4 max-w-2xl mx-auto"
        >
          I help businesses and startups build modern, responsive, and
          high-performance web applications with clean code and great user
          experience.
        </motion.p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
        {serviceList.map((item, i) => (
          <motion.div
            variants={SmoothIn("up", i * 0.5 + 2.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            key={item.title}
          >
            <ServiceCard title={item.title} dec={item.dec} />
          </motion.div>
        ))}
      </section>

      <motion.section
        className="text-center"
        variants={SmoothIn("up", 3.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to work together?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Let’s bring your idea to life with clean code and modern design.
        </p>
        <Link
          href="#contact"
          className="px-6 py-3 bg-[#8B5CF6] text-white rounded-lg shadow-md hover:bg-[#8B5CF6]/80 hover:text-white transition-all duration-300 font-bold"
        >
          Get in Touch
        </Link>
      </motion.section>
    </div>
  );
};

export default ServicePage;
