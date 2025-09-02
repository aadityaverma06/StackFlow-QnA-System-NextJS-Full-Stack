"use client";

import React from "react";
import { cn } from "@/utils/cn.js";
import dynamic from "next/dynamic";
const Meteors = dynamic(() => import("@/components/ui/meteors.jsx"), { ssr: false });

function AskQuestionPageContainer(props) {
  return (
    <div
      className={cn(
        "border rounded-lg border-gray-800 flex flex-col p-4 gap-4 bg-blue-950/20 relative overflow-hidden",
        props.className
      )}
    >
      <Meteors spreadWidth={2000} number={30} />
      <h3 className="text-xl sm:text-2xl text-yellow-400 font-bold">{props.title}</h3>
      <p className="text-md sm:text-lg font-medium sm:font-bold">{props.description}</p>
      {props.customField}
    </div>
  );
}

export default AskQuestionPageContainer;
