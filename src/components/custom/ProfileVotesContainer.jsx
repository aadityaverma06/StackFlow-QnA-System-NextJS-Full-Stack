"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { BorderBeam } from "../magicui/border-beam";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import dateFormatter from "@/utils/dateFormatter";
import MDEditor from "@uiw/react-md-editor";

function ProfileVotesContainer({ className, vote }) {
  const { questionVotesDetails, answerVotesDetails } =
    useLoggedInUserDetailsStore();

  return (
    <div
      className={cn(
        className,
        "rounded-lg relative overflow-hidden cursor-pointer transition duration-200"
      )}
    >
      <BorderBeam duration={6} size={110} />
      <div className="grid grid-cols-[max-content_1fr_max-content] p-4 gap-4">
        <p className="col-start-1 row-start-1 text-xl text-purple-500">
          {`${vote.voteStatus.charAt(0).toUpperCase()}${vote.voteStatus.slice(1)}`}
        </p>
        <div className="col-start-2 row-start-1 text-xl font-bold">
          {vote.type === "question" ? (
            questionVotesDetails.filter(
              (question) => question.$id === vote.typeId
            )[0].title
          ) : (
            <MDEditor.Markdown
              source={
                answerVotesDetails.filter(
                  (answer) => answer.$id === vote.typeId
                )[0].content
              }
              style={{ backgroundColor: "transparent" }}
            />
          )}
        </div>
        <p className="col-start-3 row-start-2 text-lg flex items-end text-yellow-400 font-bold">
          {dateFormatter(vote.$createdAt)}
        </p>
      </div>
    </div>
  );
}

export default ProfileVotesContainer;
