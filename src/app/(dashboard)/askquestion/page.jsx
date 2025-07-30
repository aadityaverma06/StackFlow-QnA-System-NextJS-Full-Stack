"use client";
import AskQuestionPageContainer from "@/components/custom/AskQuestionPageContainer";
import { FloatingDock } from "@/components/ui/floatingDock.jsx";
import { links } from "@/utils/navbarLinks.js";
import { Input } from "@/components/ui/inputAceternity.jsx";
import MarkdownEditor from "@/components/ui/MarkdownEditor.jsx";
import dynamic from "next/dynamic";
import ParticlesBackground  from "@/components/custom/ParticlesBackground";
const AnimatedGridPattern = dynamic(
  () => import("@/components/magicui/animated-grid-pattern.jsx"),
  { ssr: false }
)

function askquestion() {
  const BottomGradient = () => {
    return (
      <>
        <span className="absolute inset-x-0 -bottom-px block h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-250 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-250 group-hover/btn:opacity-100" />
      </>
    );
  };
  return (
    <div className="grid grid-rows-[max-content_max-content_max-content_max-content_max-content_max-content] md:grid-rows-[80px_max-content_max-content_max-content_max-content_max-content] pl-10 pt-14 pb-6 pr-10 gap-4 grid-cols-[1fr_5px] relative overflow-hidden">
      <ParticlesBackground />
      <div className="flex justify-center w-full md:col-span-2 col-start-2 md:col-start-1 row-span-6 md:row-span-1 md:items-center md:row-start-1 row-start-1 fixed md:static left-[42%] bottom-[2%] z-20">
        <FloatingDock items={links} />
      </div>
      <AskQuestionPageContainer
        className="row-start-1 col-start-1 md:row-start-2 md:col-span-2"
        title="Ask a question"
        description="Be specfic about your question."
        customField={<Input type="text" placeholder="Title" />}
      />
      <AskQuestionPageContainer
        className="row-start-2 col-start-1 md:row-start-3 md:col-span-2"
        title="What are the details of your problem?"
        description="Introduce your question and expand on what you have mentioned in the title. Keep character count under 500."
        customField={<MarkdownEditor />}
      />
      <AskQuestionPageContainer
        className="row-start-3 col-start-1 md:row-start-4 md:col-span-2"
        title="Add Image"
        description="Optionally attach an image to explain your question more clearly."
        customField={
          <Input
            type="file"
            className="file:text-gray-400 file:cursor-pointer cursor-pointer"
          />
        }
      />
      <AskQuestionPageContainer
        className="row-start-4 col-start-1 md:row-start-5 md:col-span-2"
        title="Add Tags"
        description="Add some tags which can relate to your question."
        customField={
          <div className="grid grid-cols-[1fr_100px] grid-rows-1 gap-4">
            <Input type="text" placeholder="Enter Tags (eg. Js, React etc)" />
            <button
              className="group/btn relative block h-full rounded-lg bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] pl-4 pr-4 cursor-pointer"
              type="button"
            >
              Add
              <BottomGradient />
            </button>
          </div>
        }
      />
      <div className="row-start-5 col-start-1 md:row-start-6 p-4 md:col-span-2">
        <button
          className="group/btn relative block h-full rounded-lg w-[200px] bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer p-4"
          type="button"
        >
          Publish
          <BottomGradient />
        </button>
      </div>
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background row-start-6 col-start-1 md:row-start-7 md:col-span-2">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={1.5}
          repeatDelay={1}
          className="mask-radial-[800px_circle_at_center,white,transparent] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
        <p className="text-lg absolute translate-y-[380%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default askquestion;
