"use client";

import { avatars, databases } from "@/models/client/config";
import { commentCollection, db } from "@/models/collectionNames";
import useAnswerDataStore from "@/store/AnswerData";
import { useAuthStore } from "@/store/Auth";
import useQuestionCommentDataStore from "@/store/QuestionCommentData";
import useUserListStore from "@/store/UserList";
import dateFormatter from "@/utils/dateFormatter";
import { IconCheck, IconCircleMinus, IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CommentEditAndDelete({ comment, type }) {
  const { user } = useAuthStore();
  const [isCommentEditable, setIsCommentEditable] = useState(false);
  const { usersList } = useUserListStore();
  const [commentEditValue, setCommentEditValue] = useState(comment.content);
  const { setQuestionCommentSubmit } = useQuestionCommentDataStore();
  const { setAnswerCommentSubmit } = useAnswerDataStore();

  async function handleCommentDelete(e) {
    try {
      const deleteComment = await databases.deleteDocument(
        db,
        commentCollection,
        e.currentTarget.id
      );
      toast.error(
        `${
          type === "question" ? "Question" : "Answer"
        } Comment Deleted Successfully`
      );
      type === "question"
        ? setQuestionCommentSubmit((prev) => !prev)
        : setAnswerCommentSubmit((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleCommentEdit(e) {
    if (!commentEditValue) {
      toast.error("Updated Comment cannot be empty");
      return;
    }
    try {
      const updateQuestionComment = await databases.updateDocument(
        db,
        commentCollection,
        e.currentTarget.id,
        {
          content: commentEditValue,
        }
      );
      toast.success(
        `${
          type === "question" ? "Question" : "Answer"
        } Comment Updated Successfully`
      );
      type === "question"
        ? setQuestionCommentSubmit((prev) => !prev)
        : setAnswerCommentSubmit((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCommentEditable(false);
    }
  }

  return (
    <div className="flex justify-between items-center flex-wrap gap-2 md:gap-0 w-full">
      {isCommentEditable ? (
        <div className="w-full md:w-[62%]">
          <textarea
            className="p-2 rounded-lg bg-[#080d1a] z-20 border border-zinc-700 w-full text-xs sm:text-base"
            value={commentEditValue}
            onChange={(e) => setCommentEditValue(e.target.value)}
            type="text"
            rows={1}
            placeholder="Update Your Comment..."
          ></textarea>
        </div>
      ) : (
        <div>
          <p className="p-2 text-sm md:text-lg">{comment.content}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-4 md:gap-2 items-center">
        {comment.authorId === user?.$id && (
          <div className="flex gap-2 md:gap-4 text-xs md:text-base w-max justify-end mr-4 bg-gray-900 rounded-sm xs:rounded-lg sm:rounded-xl py-[2px] px-1 md:py-1 md:px-2 order-3 xs:order-1 ml-2 xs:ml-0">
            <button
              className="cursor-pointer opacity-70 hover:opacity-100 flex gap-1 md:gap-2 transition duration-150"
              onClick={
                isCommentEditable
                  ? handleCommentEdit
                  : (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setIsCommentEditable((prev) => !prev);
                    }
              }
              id={comment.$id}
            >
              {isCommentEditable ? (
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
              onClick={handleCommentDelete}
              id={comment.$id}
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
        <div className="flex gap-2 items-center order-1 xs:order-2 ml-2 xs:ml-0">
          <img
            src={avatars.getInitials(
              usersList.find((user) => user.$id === comment.authorId).name,
              23,
              23
            )}
            alt="Avatar"
            className="rounded-sm h-max w-max"
          />
          <p className="text-xs md:text-base col-start-2 row-start-1 text-orange-400">
            {usersList.find((user) => user.$id === comment.authorId).name}
          </p>
        </div>
        <p className="text-xs md:text-base col-start-2 row-start-2 order-2 xs:order-3 ">
          <span className="text-yellow-300">
            {dateFormatter(comment.$createdAt)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CommentEditAndDelete;
