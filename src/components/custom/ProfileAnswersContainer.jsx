import React from "react";
import { cn } from "@/utils/cn";
import { IconEdit, IconCircleMinus } from "@tabler/icons-react";
import { BorderBeam } from "../magicui/border-beam";
import dateFormatter from "@/utils/dateFormatter";
import MDEditor from "@uiw/react-md-editor";
import ProfileAnswerEditAndDelete from "./ProfileAnswerEditAndDelete";

function ProfileAnswersContainer({ answer, className, question }) {
  return (
    <div
      className={cn(
        className,
        "rounded-xl relative overflow-hidden cursor-pointer transition duration-200 font-bold px-4 pt-4 md:px-8 md:pt-8 pb-4"
      )}
    >
      <BorderBeam duration={10} size={110} />
      <div className="grid gap-4">
        <div className="row-start-1 text-xl lg:text-2xl font-bold text-orange-400">{question?.title}</div>
        <ProfileAnswerEditAndDelete answer = {answer} />
      </div>
    </div>
  );
}

export default ProfileAnswersContainer;
