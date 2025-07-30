"use client";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { FloatingDock } from "@/components/ui/floatingDock";
import { links } from "@/utils/navbarLinks";
import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/inputAceternity";
import QuestionsContainer from "@/components/custom/QuestionsContainer";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
function questions() {
    const router = useRouter();
  return (
    <div className="grid grid-cols-[1fr_20%] gap-4 pt-16 pb-2 px-25 min-h-screen relative overflow-hidden">
      <ParticlesBackground quantity="500" />
      <div className="flex justify-center w-full fixed md:static left-[42%] bottom-[2%] z-20 col-span-2 row-start-1">
        <FloatingDock items={links} />
      </div>
      <div className="row-start-2 col-start-1">
        <h1 className="text-3xl">All Questions</h1>
      </div>
      <div className="row-start-2 col-start-2 flex justify-end">
        <ShimmerButton
          className="shadow-2xl"
          onClick={() => router.push("/askquestion")}
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Ask a Question
          </span>
        </ShimmerButton>
      </div>
      <div className="row-start-3 col-start-1 grid grid-cols-[85%_1fr] gap-4">
        <Input type="text" placeholder="Search Questions"/>
        <button className="col-start-2 rounded-lg text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer p-2">
          Search
        </button>
      </div>
      <div className="col-start-1 row-start-4 flex flex-col gap-4">
        <h2 className="text-2xl mt-4">1 Questions</h2>
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35 mt-4"} />
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
      </div>
      <div className="row-start-5 col-span-2 mt-4">
        <div className="flex justify-center gap-4 items-center ">
          <button className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100">
            Previous
          </button>
          <h4 className="text-md">1 of 1</h4>
          <button className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100">
            Next
          </button>
        </div>
      </div>
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background row-start-6 col-span-2 mt-4">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={1.5}
          repeatDelay={1}
          className="mask-radial-[800px_circle_at_center,white,transparent] inset-x-0 inset-y-[-70%] h-[200%] skew-y-12"
        />
        <p className="text-lg absolute translate-y-[380%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default questions;
