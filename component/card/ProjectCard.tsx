import React, { useState } from "react";
import FlipCard from "./FlipCard";
import Image from "next/image";
import { IconArrowsDiagonal } from "@tabler/icons-react";
import Link from "next/link";
import { ContainerTextFlip } from "../ui/container-flip-text";

type Props = {
  project: any;
};

const ProjectCard = ({ project }: Props) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <FlipCard
      flipped={flipped}
      setFlipped={setFlipped}
      front={
        <div className=" relative flex flex-col gap-4 h-full">
          <div className=" relative">
            <Image
              src={project.src}
              alt={project.name}
              width={200}
              height={200}
              className="w-full h-[150px] object-cover object-center"
            />
            <button
              className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-md border border-white/30 rounded-xl cursor-pointer"
              onClick={() => setFlipped((s) => !s)}
            >
              <IconArrowsDiagonal className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex flex-col gap-3 px-4 pb-4">
            <h3 className="text-xl font-bold text-center">{project.name}</h3>
            <p className="text-base font-medium line-clamp-3">{project.dec}</p>
          </div>
        </div>
      }
      back={
        <div className="w-full h-full relative flex flex-col p-4 justify-between gap-5">
          <button
            className=" absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-md border border-white/30 rounded-xl cursor-pointer"
            onClick={() => setFlipped((s) => !s)}
          >
            <IconArrowsDiagonal className="w-5 h-5 text-white" />
          </button>
          <div>
            <h3 className=" text-3xl font-bold text-center">{project.name}</h3>
            <div className="flex flex-col gap-2 items-center mt-5">
              <p className="text-xl font-bold">
                {" "}
                The Technologies of the project are:
              </p>
              <div className="w-full  flex justify-center">
                <ContainerTextFlip words={project.use} />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Link href={project.link} target="_blank">
              <button className=" relative hover:before:scale-100 before:scale-0 before:transition-all before:duration-300 before:left-0 w-auto before:absolute before:w-full before:bottom-0 before:h-[2px] before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 px-4 py-2 rounded-xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 font-bold cursor-pointer">
                Visit Website
              </button>
            </Link>
          </div>
        </div>
      }
    />
  );
};

export default ProjectCard;
