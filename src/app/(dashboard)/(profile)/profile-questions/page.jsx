"use client";

import React from "react";
import QuestionsContainer from "@/components/custom/QuestionsContainer";

function profileQuestions() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <h3 className="text-lg">1 Questions</h3>
      <QuestionsContainer
        CardStyle="Beam"
        className=" bg-[#141e388e] hover:bg-[#141e38] border-2"
      />
      <QuestionsContainer
        CardStyle="Beam"
        className=" bg-[#141e388e] hover:bg-[#141e38] border-2"
      />
      <QuestionsContainer
        CardStyle="Beam"
        className=" bg-[#141e388e] hover:bg-[#141e38] border-2"
      />
      <div className="flex justify-center gap-4 items-center mt-4">
        <button className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100">
          Previous
        </button>
        <h4 className="text-md">1 of 1</h4>
        <button className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100">
          Next
        </button>
      </div>
    </div>
  );
}

export default profileQuestions;
