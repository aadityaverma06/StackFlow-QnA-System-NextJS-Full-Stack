"use client";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { FloatingDock } from "@/components/ui/floatingDock";
import { links } from "@/utils/navbarLinks";
import { IconUser, IconUserFilled, IconClockFilled } from "@tabler/icons-react";
import React from "react";
import { NavLink } from "@/utils/navLinkTag";
import  ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useRouter } from "next/navigation";
function layout({ children }) {
  const router = useRouter();
  const BottomGradient = () => {
    return (
      <>
        <span className="absolute inset-x-0 -bottom-px block h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-250 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-250 group-hover/btn:opacity-100" />
      </>
    );
  };
  return (
    <div className="grid grid-cols-[14%_1fr_1fr_1fr] gap-4 pl-10 pt-16 pb-2 pr-10 min-h-screen relative overflow-hidden">
      <ParticlesBackground quantity="500" />
      <div className="flex justify-center w-full fixed md:static left-[42%] bottom-[2%] z-20 col-span-4 row-start-1">
        <FloatingDock items={links} />
      </div>
      <div className="col-start-1 row-start-2">
        <IconUser size={150} className="border border-white/30" />
      </div>
      <div className="col-start-1 row-start-3 flex flex-col gap-4 group text-white/60 pt-2">
        <NavLink
          href="/profile-summary"
          className="text-lg hover:text-foreground"
        >
          Summary
        </NavLink>
        <NavLink
          href="/profile-questions"
          className="text-lg hover:text-foreground"
        >
          Questions
        </NavLink>
        <NavLink
          href="/profile-answers"
          className="text-lg hover:text-foreground"
        >
          Answers
        </NavLink>
        <NavLink
          href="/profile-votes"
          className="text-lg hover:text-foreground"
        >
          Votes
        </NavLink>
      </div>
      <div className="col-start-2 row-start-2 flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Four Gmail</h1>
        <h2 className="text-xl font-bold">Four@gmail.com</h2>
        <ul className="list-none">
          <li className="flex gap-2 py-2">
            <IconUserFilled size={20} />
            <p>Dropped 1 Hour Ago</p>
          </li>
          <li className="flex gap-2">
            <IconClockFilled size={20} />
            <p>Last Activity Four Minutes Ago.</p>
          </li>
        </ul>
      </div>
      <div className="col-start-2 col-span-3 row-start-3 border-t-2 border-gray-600 pt-4">{children}</div>
      <div className="col-start-4 pt-4 row-start-2 flex justify-end">
        <button
          className="group/btn relative block h-max rounded-lg bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer px-4 py-2"
          type="button"
          onClick={() => router.push("/profile-edit")}
        >
          Edit Profile
          <BottomGradient />
        </button>
      </div>
      <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background row-start-5 col-start-1 col-span-4">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={1.5}
          repeatDelay={1}
          className="mask-radial-[800px_circle_at_center,white,transparent] inset-x-0 inset-y-[-70%] h-[200%] skew-y-12"
        />
        <p className="text-lg absolute translate-y-[240%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default layout;
