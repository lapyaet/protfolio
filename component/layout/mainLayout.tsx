"use client";

import React from "react";
import Header from "../Header";
import { usePathname } from "next/navigation";
import Transition from "../Transition";
import dynamic from "next/dynamic";

const BackgroundScene = dynamic(() => import("../ui/background-scene"), {
  ssr: false,
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#ede9fe_0%,#ffffff_65%)] dark:bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#07070f_60%)] text-slate-900 dark:text-white">
      <BackgroundScene />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.18),transparent_55%)]" />
      {/* Sits outside the page wrapper and remounts on every route change. */}
      <Transition key={`transition-${pathName}`} />
      {/* Keyed so each page's entrance animations replay on navigation. */}
      <div key={pathName} className="relative z-10 w-full h-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
