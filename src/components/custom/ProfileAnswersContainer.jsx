import React from "react";
import { cn } from "@/utils/cn";
import { IconEdit, IconCircleMinus } from "@tabler/icons-react";
import { BorderBeam } from "../magicui/border-beam";
import dateFormatter from "@/utils/dateFormatter";
import MDEditor from "@uiw/react-md-editor";

function ProfileAnswersContainer({ answer, className, question }) {
  return (
    <div
      className={cn(
        className,
        "rounded-xl relative overflow-hidden cursor-pointer transition duration-200 font-bold px-8 pt-8 pb-4"
      )}
    >
      <BorderBeam duration={6} size={110} />
      <div className="grid gap-4">
        <div className="row-start-1 text-xl font-bold text-orange-400">{question?.title}</div>
        <div className="row-start-2 text-lg font-bold">
          <MDEditor.Markdown
            source={answer.content}
            style={{ backgroundColor: "transparent" }}
          />
        </div>
        <div className="flex justify-end">
          <div className="row-start-3 flex gap-4 text-lg bg-gray-950 w-max p-4 rounded-xl justify-end">
            <button className="cursor-pointer opacity-70 hover:opacity-100 flex gap-2">
              <IconEdit size={30} color="green" />
              <p className="mt-[1.5px]">Edit</p>
            </button>
            <button className="cursor-pointer opacity-70 hover:opacity-100 flex gap-2">
              <IconCircleMinus color="red" size={30} />
              <p className="mt-[1.5px]">Delete</p>
            </button>
            <p className="text-yellow-400 font-bold mt-[1.5px]">
              {dateFormatter(answer.$createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAnswersContainer;
