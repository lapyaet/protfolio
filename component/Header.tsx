"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { SmoothIn } from "@/lib/animation";

const Links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Me",
    href: "/about",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  const pathName = usePathname();
  return (
    <div className=" w-full fixed top-8 z-50">
      <motion.div
        key={pathName}
        initial={"hidden"}
        animate={"show"}
        exit={"hidden"}
        variants={SmoothIn("down", 1.5)}
        className="w-fit py-2 bg-white shadow max-w-7xl mx-auto rounded-2xl flex items-center gap-4 px-4"
      >
        {Links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-base font-bold   px-4 py-2 rounded-xl transition-all duration-300 ${
              link.href === pathName
                ? "text-white bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 hover:text-white"
                : "bg-transparent text-black hover:text-[#8B5CF6]"
            }`}
          >
            {link.name}
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default Header;
