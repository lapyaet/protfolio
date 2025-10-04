"use client";

import React from "react";
import { motion } from "framer-motion";
import { SmoothIn } from "@/lib/animation";
import { GlowingEffect } from "@/component/ui/glowing-effect";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconHome,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";
import ContactForm from "@/component/ContactForm";

const contactList = [
  {
    name: "mail",
    value: "lapyae12442@gmail.com",
  },
  {
    name: "phone",
    value: "+66 864 477 363",
  },
  {
    name: "address",
    value: "Chiang Mai, Thailand",
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

const ContactPage = () => {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto px-4 lg:px-8 py-[110px] lg:gap-16 gap-8 overflow-scroll flex flex-col lg:justify-center lg:items-center">
      <motion.h1
        variants={SmoothIn("up", 1.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-center bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 lg:text-4xl text-transparent font-bold text-2xl"
      >
        Contact Me
      </motion.h1>
      <motion.div
        variants={SmoothIn("up", 2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className=" w-full h-auto shadow-2xl rounded-2xl p-4 relative border border-gray-200/30 lg:gap-10 gap-5 flex lg:flex-row flex-col"
      >
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        <div className=" relative overflow-hidden lg:w-1/3 w-full h-full bg-[#8B5CF6] rounded-xl px-4 py-8 flex flex-col justify-between gap-4 lg:gap-0">
          <h3 className="text-2xl font-bold text-white z-10">
            Les't talk on something greting together{" "}
          </h3>
          <div className="flex flex-col gap-4 z-10">
            {contactList.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                {item.name === "mail" && (
                  <IconMail className="w-5 h-5 text-white" />
                )}
                {item.name === "phone" && (
                  <IconPhone className="w-5 h-5 text-white" />
                )}
                {item.name === "address" && (
                  <IconHome className="w-5 h-5 text-white" />
                )}
                <p className="text-white">: {item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 z-10">
            {Links.map((link) => (
              <Link key={link.name} href={link.href} target="_blank">
                <button className=" bg-white text-[#8B5CF6] p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/80 hover:scale-95">
                  {link.name === "facebook" && (
                    <IconBrandFacebookFilled className="w-5 h-5 " />
                  )}
                  {link.name === "LinkedIn" && (
                    <IconBrandLinkedinFilled className=" w-5 h-5 " />
                  )}
                  {link.name === "Github" && (
                    <IconBrandGithubFilled className=" w-5 h-5" />
                  )}
                </button>
              </Link>
            ))}
          </div>
          <div className=" absolute w-[150px] h-[150px] bg-white/30 backdrop-blur-xs rounded-full -right-5 -bottom-5 z-0" />
          {/* <div className=" absolute w-[150px] h-[150px] bg-white/30 backdrop-blur-xs rounded-full -left-5 -top-5 z-0" /> */}
        </div>

        <ContactForm />
      </motion.div>
    </div>
  );
};

export default ContactPage;
