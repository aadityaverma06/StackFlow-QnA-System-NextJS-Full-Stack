"use client";

import {
  IconCaretUpFilled,
  IconCaretDownFilled,
  IconUser,
} from "@tabler/icons-react";

import  ParticlesBackground  from "@/components/custom/ParticlesBackground";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { FloatingDock } from "@/components/ui/floatingDock.jsx";
import { links } from "@/utils/navbarLinks.js";
import { useState } from "react";
import AnswerContainer from "@/components/custom/AnswerContainer";
import MarkdownEditor from "@/components/ui/MarkdownEditor.jsx";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";

function question() {
  const [loadParticles, setLoadParticles] = useState(false);
  return (
    <div className="grid grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content_max-content_max-content] pl-10 pt-16 pb-6 pr-10 gap-16 relative overflow-hidden min-h-max">
      {loadParticles && <ParticlesBackground />}
      <div className="flex justify-center w-full fixed md:static left-[42%] bottom-[2%] z-20">
        <FloatingDock items={links} />
      </div>
      <div className="flex justify-between border-b-2 border-zinc-700 p-2 h-max">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-4xl">Another Question Related to Python</h1>
          <div className="flex">
            <p>Asked 1 year Ago</p>
            <p>Answer: 1</p>
            <p>Votes: 1</p>
          </div>
        </div>
        <ShimmerButton className="shadow-2xl h-max place-self-end p-4">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg ">
            Ask A Question
          </span>
        </ShimmerButton>
      </div>
      <div className="grid grid-cols-[4%_1fr] grid-rows-[max-content_max-content_max-content] gap-4">
        <div className="col-start-1 row-span-3 flex flex-col items-center gap-4">
          <button className="rounded-full hover:bg-gray-800 transition duration-200 border-2 border-gray-500 w-max cursor-pointer p-1">
            <IconCaretUpFilled size={30} />
          </button>
          <p className="text-lg">1</p>
          <button className="rounded-full hover:bg-gray-800  transition duration-200 border-2 border-gray-500 w-max cursor-pointer p-1">
            <IconCaretDownFilled size={30} />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#080d1a] z-20 col-start-2 row-start-1">
          <h2 className="text-2xl border-b-2 pb-2 border-zinc-800">
            learn about python in 2024
          </h2>
          <p className="text-lg">
            Is this important to learn about python in 2024, is it still a
            relevant programming language.
          </p>
        </div>
        <div className="flex flex-col gap-4 col-start-2 row-start-2 z-20">
          <img
            className="rounded-lg"
            src="/Test.jpg"
            alt="Assassins Creed IV Black Flag"
            onLoad={() => setLoadParticles(true)}
            onError={() => setLoadParticles(true)}
          />
          <div className="flex justify-between">
            <p className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100 h-max">
              #Javascript
            </p>
            <div className="grid grid-cols-[max-content_max-content] grid-rows-[max-content_max-content]">
              <div className="col-start-1 row-span-2">
                <IconUser className="w-full h-full border border-white/30" />
              </div>
              <p className="text-md col-start-2 row-start-1">Deepesh Gupta</p>
              <p className="text-md col-start-2 row-start-2">13</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-start-2 row-start-3 gap-2">
          <p className="p-2 border-b-2 border-zinc-700 border-t-2">
            Is this a new queston ? - hitesh choudhary 1 year ago
          </p>
          <div className="grid grid-cols-[85%_1fr] gap-2 border-b-2 border-zinc-700 pb-2">
            <textarea
              className="p-2 rounded-lg bg-[#080d1a] z-20 border border-zinc-700"
              placeholder="Add a comment..."
              rows="1"
            ></textarea>
            <button className="col-start-2 rounded-lg text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer max-h-max p-2">
              Add Comment
            </button>
          </div>
        </div>
      </div>
      <div className="row-start-4 flex flex-col gap-8 pt-4 border-t-2 border-zinc-700">
        <h3 className="text-xl">1 Answers</h3>
        <AnswerContainer />
        <AnswerContainer />
      </div>
      <div className="row-start-5 flex flex-col gap-4 pt-4 border-t-2 border-zinc-700">
        <h3 className="text-xl">Your Answer</h3>
        <MarkdownEditor />
        <button className="col-start-2 rounded-lg text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer w-max pt-2 pb-2 pl-4 pr-4">
          Post Answer
        </button>
      </div>
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background row-start-6">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={1.5}
          repeatDelay={1}
          className="mask-radial-[800px_circle_at_center,white,transparent] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
        <p className="text-lg absolute translate-y-[380%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default question;
