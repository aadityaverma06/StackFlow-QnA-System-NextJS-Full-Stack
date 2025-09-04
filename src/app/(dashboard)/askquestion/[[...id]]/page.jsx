"use client";
import AskQuestionPageContainer from "@/components/custom/AskQuestionPageContainer";
import { FloatingDock } from "@/components/ui/floatingDock.jsx";
import { links } from "@/utils/navbarLinks.js";
import { Input } from "@/components/ui/inputAceternity.jsx";
import MarkdownEditor from "@/components/ui/MarkdownEditor.jsx";
import dynamic from "next/dynamic";
import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useAuthStore } from "@/store/Auth";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { databases, storage } from "@/models/client/config";
import { ID } from "appwrite";
import {
  db,
  questionAttachmentBucket,
  questionCollection,
} from "@/models/collectionNames";
import toast from "react-hot-toast";
import useMarkdownEditorValueStore from "@/store/MarkdownEditorValue";
import { IconCircleMinus } from "@tabler/icons-react";

const AnimatedGridPattern = dynamic(
  () => import("@/components/magicui/animated-grid-pattern.jsx"),
  { ssr: false }
);

function askquestion() {
  const { value, setValue } = useMarkdownEditorValueStore();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const { session, user } = useAuthStore();
  const imgRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [loadQuestion, setLoadQuestion] = useState(null);

  useEffect(() => {
    if (!session) {
      router.push(`/login/?redirectUrl=${encodeURIComponent("askquestion")}`);
    }
  });

  if (!session) return;

  useEffect(() => {
    async function getQuestion() {
      if (!id) return;
      try {
        const question = await databases.getDocument(
          db,
          questionCollection,
          id
        );
        setValue(question.content);
        setTitle(question.title);
        setTags(question.tags);
        setLoadQuestion(question);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getQuestion();
  }, []);

  function handleAddTag() {
    if (tag) {
      setTags([...tags, tag]);
      setTag("");
    }
  }

  async function handlePublish() {
    try {
      if (image) {
        const imageUpload = await storage.createFile(
          questionAttachmentBucket,
          ID.unique(),
          image
        );
        const imageUrl = storage.getFileView(
          questionAttachmentBucket,
          imageUpload.$id
        );
        const question = await databases.createDocument(
          db,
          questionCollection,
          ID.unique(),
          {
            title,
            content: value,
            authorId: user.$id,
            tags,
            Image: imageUrl,
            imageId: imageUpload.$id,
          }
        );
      } else if (!image) {
        const question = await databases.createDocument(
          db,
          questionCollection,
          ID.unique(),
          {
            title,
            content: value,
            authorId: user.$id,
            tags,
          }
        );
      }
      toast.success("Question Published Successfully");
      setTitle("");
      setValue("");
      imgRef.current.value = "";
      setImage("");
      setTags([]);
      setTag("");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleUpdate() {
    try {
      let imageUrl = "";
      let imageUpload = "";
      if (image) {
        imageUpload = await storage.createFile(
          questionAttachmentBucket,
          ID.unique(),
          image
        );
        imageUrl = storage.getFileView(
          questionAttachmentBucket,
          imageUpload.$id
        );
      }
      const updateQuestion = await databases.updateDocument(
        db,
        questionCollection,
        id,
        {
          title,
          content: value,
          tags,
          Image: imageUrl || loadQuestion.Image,
          imageId: imageUpload.$id || loadQuestion.imageId,
        }
      );
      toast.success("Question Updated Successfully");
      setTitle("");
      setValue("");
      imgRef.current.value = "";
      setImage("");
      setTags([]);
      setTag("");
    } catch (error) {
      toast.error(error.message);
    }
  }
  function handleRemoveTag(currentTag) {
    setTags(tags.filter((tag) => tag !== currentTag));
  }
  const BottomGradient = () => {
    return (
      <>
        <span className="absolute inset-x-0 -bottom-px block h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-250 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-250 group-hover/btn:opacity-100" />
      </>
    );
  };

  if (id && !loadQuestion)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-12">
        <h1 className="text-center border-4 rounded-xl p-8 border-gray-700 ">
          <span className="text-6xl bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0] bg-clip-text text-transparent font-bold">
            Loading...
          </span>
        </h1>
      </div>
    );

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
        customField={
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        }
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
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setImage(e?.target?.files[0])}
            ref={imgRef}
          />
        }
      />
      <AskQuestionPageContainer
        className="row-start-4 col-start-1 md:row-start-5 md:col-span-2"
        title="Add Tags"
        description="Add some tags which can relate to your question."
        customField={
          <div className="grid grid-cols-[1fr_100px] grid-rows-1 gap-4">
            <Input
              type="text"
              placeholder="Enter Tags (eg. Js, React etc)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="col-start-1 row-start-1"
            />
            <button
              className="group/btn relative block h-full rounded-lg bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] pl-4 pr-4 cursor-pointer col-start-2 row-start-1 text-md sm:text-lg"
              type="button"
              onClick={handleAddTag}
            >
              Add
              <BottomGradient />
            </button>
            {tags.length > 0 && (
              <div className="col-start-1 row-start-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <button
                    key={index}
                    className="rounded-lg bg-zinc-800 py-1 px-2 text-sm sm:text-md hover:bg-zinc-900 cursor-pointer transition duration-100 flex gap-2 items-center text-green-400 font-bold"
                  >
                    {`#${tag}`}
                    <IconCircleMinus
                      color="red"
                      size={20}
                      onClick={() => handleRemoveTag(tag)}
                      className="mt-[2px] opacity-70 hover:opacity-100 cursor-pointer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        }
      />
      <div className="row-start-5 col-start-1 md:row-start-6 md:col-span-2 mt-4">
        <button
          className="group/btn relative block h-full w-max rounded-lg bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer  textmd sm:text-lg px-6 py-2"
          type="button"
          onClick={loadQuestion ? handleUpdate : handlePublish}
        >
          {loadQuestion ? "Update" : "Publish"}
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
        <p className="text-xs xs:text-sm sm:text-base md:text-lg absolute text-center bottom-[10%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default askquestion;
