"use client";

import React from "react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { cn } from "@/utils/cn";
import { BorderBeam } from "../magicui/border-beam";

function QuestionsContainer({ className, CardStyle = "Shine" }) {
  return (
    <div
      className={cn(
        className,
        "rounded-lg relative overflow-hidden cursor-pointer transition duration-200"
      )}
    >
      {CardStyle === "Shine" ? (
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      ) : (
        <BorderBeam duration={8} size={80} />
      )}
      <div className="grid grid-cols-[max-content_1fr_max-content] p-4 gap-4">
        <div className="flex flex-col items-end">
          <p className="text-md">0 Votes</p>
          <p className="text-md">0 Answers</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl text-orange-400">
            I have another doubt in Javascript
          </p>
          <div className="flex gap-4">
            <button className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100">
              #Javascript
            </button>
            <button className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100">
              #Typescript
            </button>
          </div>
        </div>
        <div className="flex items-end">
          <p className="text-md">Deepesh Gupta 12 asked 1 year ago</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionsContainer;
