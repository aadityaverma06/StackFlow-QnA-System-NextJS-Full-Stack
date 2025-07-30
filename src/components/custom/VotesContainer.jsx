"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { BorderBeam } from "../magicui/border-beam";

function VotesContainer({ className }) {
  return (
    <div
      className={cn(
        className,
        "rounded-lg relative overflow-hidden cursor-pointer transition duration-200"
      )}
    >
      <BorderBeam duration={8} size={80} />
      <div className="grid grid-cols-[max-content_1fr_max-content] p-4 gap-4">
        <p className="col-start-1 row-start-1 text-lg">0 Votes</p>
        <p className="col-start-2 row-start-1 text-xl text-orange-400">
          I have another doubt in Javascript
        </p>
        <p className="col-start-3 row-start-2 text-md flex items-end">
          2 Hours Ago
        </p>
      </div>
    </div>
  );
}

export default VotesContainer;
