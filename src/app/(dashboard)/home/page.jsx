"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floatingDock.jsx";
import { links } from "@/utils/navbarLinks.js";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import images from "@/utils/iconCloudImages.js";
import { IconCloud } from "@/components/magicui/icon-cloud";
import QuestionsContainer from "@/components/custom/QuestionsContainer";
import { AnimatedListItems } from "@/components/custom/AnimatedListItems";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useRouter } from "next/navigation";

function home() {
  const router = useRouter();
  return (
    <div className="grid pl-10 pt-16 pb-6 pr-10 gap-16 relative overflow-hidden">
      <ParticlesBackground />
      <div className="flex justify-center w-full fixed md:static left-[42%] bottom-[2%] z-20 col-span-2">
        <FloatingDock items={links} />
      </div>
      <div className="flex">
        <div className="flex flex-col gap-6 justify-center">
          <h1 className="text-7xl bg-clip-text bg-gradient-to-b from-yellow-400 via-pink-600 to-purple-600 text-transparent font-bold self-center">
            StackFlow
          </h1>
          <p className="text-lg">
            A place to share your knowledge, ask questions, and connect with
            like-minded individuals to boost up your coding skills, all in one
            place.
          </p>
          <div className="flex [container-type:inline-size] justify-center gap-4">
            <InteractiveHoverButton onClick={() => router.push("/signup")}>
              Signup Now
            </InteractiveHoverButton>

            <ShimmerButton
              className="shadow-2xl"
              onClick={() => router.push("/login")}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Login
              </span>
            </ShimmerButton>
          </div>
        </div>
      </div>
      <div className="relative flex size-full items-center justify-center overflow-hidden row-start-2 col-start-2">
        <IconCloud images={images} distanceBetweenImage={200} />
      </div>
      <div className="flex flex-col col-start-1 row-start-3 gap-6">
        <p className="text-2xl">Latest Questions</p>
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
        <QuestionsContainer className={"bg-gray-800/30 hover:bg-gray-700/35"} />
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-2xl">Top Contributors</p>
        <AnimatedListItems className="col-start-2 row-start-3" />
      </div>
      <div className="col-start-1 row-start-4 col-span-2 flex">
        <BackgroundGradient
          className={
            " bg-zinc-900 rounded-[22px] flex flex-col items-center gap-6 p-10"
          }
        >
          <h1 className="bg-clip-text text-transparent font-bold text-6xl bg-gradient-to-br from-[#ff2975] from-25% via-purple-400 to-[#1fb0a8]">
            JOIN NOW
          </h1>
          <p className="text-xl text-center max-w-[50%]">
            "Sign up" to become a part of our dynamic community. Gain access to
            a vast pool of knowledge, connect with experts, and share your
            insights. Whether you're here to ask questions or provide answers,
            joining us will enhance your learning experience and help you stay
            updated with the latest discussions. Join now and start making
            meaningful contributions today!
          </p>
        </BackgroundGradient>
      </div>
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background row-start-5 col-start-1 col-span-2">
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

export default home;
