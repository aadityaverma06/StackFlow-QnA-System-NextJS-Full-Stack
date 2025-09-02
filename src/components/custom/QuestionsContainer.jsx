"use client";

import React from "react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { cn } from "@/utils/cn";
import { BorderBeam } from "../magicui/border-beam";
import dateFormatter from "@/utils/dateFormatter";
import ProfileQuestionEditAndDelete from "./ProfileQuestionEditAndDelete";

function QuestionsContainer({
  className,
  CardStyle = "Shine",
  title = "hi",
  tags = ["tag1", "tag2", "tag3"],
  author = "author",
  createdAt = new Date(Date.now()),
  avatar,
  reputation,
  totalAnswers,
  totalVotes,
  type = "question",
  id,
  imageId,
}) {
  return (
    <div
      className={cn(
        className,
        "rounded-xl relative overflow-hidden cursor-pointer transition duration-200 font-bold"
      )}
    >
      {CardStyle === "Shine" ? (
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      ) : (
        <BorderBeam duration={6} size={110} />
      )}
      <div className="grid grid-cols-[auto_1fr] xs:grid xs:grid-cols-[auto_1fr_auto] p-4 gap-x-4 gap-y-2 xs:gap-4">
        <div className="col-start-1 row-start-1 flex flex-col items-end ">
          <p className="text-sm sm:text-md text-purple-500">
            {totalVotes === 1 ? (
              <>
                1 <span className="text-foreground">Vote</span>
              </>
            ) : (
              <>
                {totalVotes} <span className="text-foreground">Votes</span>
              </>
            )}
          </p>
          <p className="text-sm sm:text-md text-purple-500">
            {totalAnswers === 1 ? (
              <>
                1 <span className="text-foreground">Answer</span>
              </>
            ) : (
              <>
                {totalAnswers} <span className="text-foreground">Answers</span>
              </>
            )}
          </p>
        </div>
        <div className="col-start-2 row-start-1 flex flex-col gap-2 xs:gap-4">
          <p className="text-md sm:text-xl text-orange-400">{title}</p>
          <div className="flex gap-2">
            {tags?.map((tag, index) => (
              <div key={index}>
                <button
                  className="rounded-lg bg-zinc-800 py-1 px-2 text-xs xs:text-sm sm:text-md hover:bg-zinc-900 cursor-pointer transition duration-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {`#${tag}`}
                </button>
              </div>
            ))}
          </div>
        </div>
        {type === "question" ? (
          <div className="flex flex-row lg:flex-row xs:flex-col xs:items-end gap-2 col-start-1 row-start-2 col-span-2 xs:col-start-3 xs:row-start-1 xs:col-span-1">
            <div className="flex gap-2">
              <img
                src={avatar}
                alt="Avatar"
                className="rounded-sm w-max h-max place-self-center"
              />
              <p className="text-sm sm:text-lg text-orange-400 font-bold">
                {author}
              </p>
            </div>
            <p className="text-sm sm:text-lg font-bold px-2">
              Rep: <span className="text-purple-500">{reputation}</span>
            </p>
            <p className="text-sm sm:text-lg text-yellow-300">
              {" "}
              {dateFormatter(createdAt)}
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-end gap-2 col-start-1 row-start-2 col-span-2 xs:col-start-3 xs:row-start-1 xs:col-span-1">
            <ProfileQuestionEditAndDelete
              id={id}
              createdAt={createdAt}
              imageId={imageId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionsContainer;
