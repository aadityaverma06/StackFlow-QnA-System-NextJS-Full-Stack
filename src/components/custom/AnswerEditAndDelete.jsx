"use client";

import { databases } from "@/models/client/config";
import { answerCollection, db } from "@/models/collectionNames";
import useAnswerDataStore from "@/store/AnswerData";
import { useAuthStore } from "@/store/Auth";
import { IconCheck, IconCircleMinus, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import MarkdownEditor from "../ui/MarkdownEditor";
import MDEditor from "@uiw/react-md-editor";
import useMarkdownEditorValueStore from "@/store/MarkdownEditorValue";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";

function AnswerEditAndDelete({ content, id, authorId, questionAuthorId }) {
  const { user } = useAuthStore();
  const [isAnswerEditable, setIsAnswerEditable] = useState(false);
  const { setAnswerSubmit, setAnswerAuthorReputation } = useAnswerDataStore();
  const { value, setValue } = useMarkdownEditorValueStore();
  const { setQuestionAuthorReputation } = useLoggedInUserDetailsStore();

  async function handleAnswerDelete(e) {
    try {
      const deleteAnswerData = await axios.delete("/api/deleteAnswerData", {
        data: {
          answerId: e.currentTarget.id,
          authorId: user.$id,
        },
      });
      if (deleteAnswerData.data.error) {
        toast.error(deleteAnswerData.data.error);
        return;
      }
      setValue("");
      toast.error("Answer Deleted Successfully");
      setAnswerAuthorReputation(
        Number(deleteAnswerData.data.prefs.reputation) - 1
      );
      if (questionAuthorId === user.$id) {
        setQuestionAuthorReputation(
          Number(deleteAnswerData.data.prefs.reputation) - 1
        );
      }
      setAnswerSubmit((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleAnswerEdit(e) {
    if (!value) {
      toast.error("Updated Answer cannot be empty");
      return;
    }
    try {
      const updateAnswer = await databases.updateDocument(
        db,
        answerCollection,
        e.currentTarget.id,
        {
          content: value,
        }
      );
      toast.success("Answer Updated Successfully");
      setValue("");
      setAnswerSubmit((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAnswerEditable(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {isAnswerEditable ? (
        <div>
          <MarkdownEditor className="hidden md:block" />
          <MarkdownEditor className="hidden sm:block md:hidden markdownmd" />
          <MarkdownEditor className="block sm:hidden markdownsm" />
        </div>
      ) : (
        <div className="row-start-1 col-start-2 bg-color bg-[#080d1a] z-20 p-4 rounded-xl">
          <h2 className="border-b-2 pb-3 border-zinc-800">
            <MDEditor.Markdown
              source={content}
              style={{ fontSize: "16px" }}
              className="hidden md:block"
            />
            <MDEditor.Markdown
              source={content}
              style={{ fontSize: "12px" }}
              className="block md:hidden"
            />
          </h2>
        </div>
      )}
      <div className="flex gap-1 md:gap-2 items-center">
        {authorId === user?.$id && (
          <div className="flex gap-2 md:gap-4 text-xs md:text-base w-max justify-end mr-4 bg-gray-900 rounded-xl py-1 px-2">
            <button
              className="cursor-pointer opacity-70 hover:opacity-100 flex gap-1 md:gap-2 transition duration-150"
              onClick={
                isAnswerEditable
                  ? handleAnswerEdit
                  : (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setValue(content);
                      setIsAnswerEditable((prev) => !prev);
                    }
              }
              id={id}
            >
              {isAnswerEditable ? (
                <div className="flex gap-1 md:gap-2">
                  {" "}
                  <IconCheck
                    size={28}
                    color="green"
                    className="hidden md:block"
                  />
                  <IconCheck
                    size={20}
                    color="green"
                    className="block md:hidden"
                  />
                  <p className="mt-[1.5px]">Update</p>
                </div>
              ) : (
                <div className="flex gap-1 md:gap-2">
                  {" "}
                  <IconEdit
                    size={28}
                    color="green"
                    className="hidden md:block"
                  />
                  <IconEdit
                    size={20}
                    color="green"
                    className="block md:hidden"
                  />
                  <p className="mt-[1.5px]">Edit</p>
                </div>
              )}
            </button>
            <button
              className="cursor-pointer opacity-70 hover:opacity-100 flex gap-1 md:gap-2 transition duration-150"
              onClick={handleAnswerDelete}
              id={id}
            >
              <IconCircleMinus
                size={28}
                color="red"
                className="hidden md:block"
              />
              <IconCircleMinus
                size={20}
                color="red"
                className="block md:hidden"
              />
              <p className="mt-[1.5px]">Delete</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnswerEditAndDelete;
