"use client";

import React from "react";
import Header from "../Header";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Transition from "../Transition";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <BackgroundBeamsWithCollision>
      <AnimatePresence mode="wait">
        <motion.div key={pathName} className="w-full h-full">
          <Transition />
          <Header />
          {children}
        </motion.div>
      </AnimatePresence>
    </BackgroundBeamsWithCollision>
  );
};

export default MainLayout;
