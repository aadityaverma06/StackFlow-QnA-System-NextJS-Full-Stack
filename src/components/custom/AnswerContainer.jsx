import React from "react";
import { IconCaretUpFilled, IconCaretDownFilled, IconUser } from "@tabler/icons-react";

function AnswerContainer() {
  return (
    <div className="grid grid-cols-[4%_1fr] grid-rows-[max-content_max-content_max-content_max-content] gap-4 pb-2 pt-4 border-t-2 border-zinc-700">
      <div className="col-start-1 row-span-3 flex flex-col items-center gap-4">
        <button className="rounded-full hover:bg-gray-800 transition duration-200 border-2 border-gray-500 w-max cursor-pointer p-1">
          <IconCaretUpFilled size={30} />
        </button>
        <p className="text-lg">1</p>
        <button className="rounded-full hover:bg-gray-800  transition duration-200 border-2 border-gray-500 w-max cursor-pointer p-1">
          <IconCaretDownFilled size={30} />
        </button>
      </div>
      <div className="row-start-1 col-start-2 bg-color bg-[#080d1a] z-20 p-4 rounded-xl">
        <h2 className="text-3xl border-b-2 pb-3 border-zinc-800">
          Yes, python is a great language
        </h2>
      </div>
      <div className="col-start-2 row-start-2 grid grid-cols-[max-content_max-content] grid-rows-[max-content_max-content] justify-end">
        <div className="col-start-1 row-span-2">
          <IconUser className="w-full h-full border border-white/30" />
        </div>
        <p className="text-md col-start-2 row-start-1">Deepesh Gupta</p>
        <p className="text-md col-start-2 row-start-2">13</p>
      </div>
      <div className="col-start-2 row-start-3 grid grid-cols-[85%_1fr] gap-2 border-b-2 border-t-2 border-zinc-700 pb-2 pt-2">
        <textarea
          className="p-2 rounded-lg bg-[#080d1a] z-20 border border-zinc-700"
          placeholder="Add a comment..."
          rows="1"
        ></textarea>
        <button className="col-start-2 rounded-lg text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer max-h-max p-2">
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default AnswerContainer;
