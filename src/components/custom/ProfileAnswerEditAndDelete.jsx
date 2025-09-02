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
import dateFormatter from "@/utils/dateFormatter";
import usePaginationStore from "@/store/Pagination";

function ProfileAnswerEditAndDelete({ answer }) {
  const { user } = useAuthStore();
  const [isAnswerEditable, setIsAnswerEditable] = useState(false);
  const { setAnswerSubmit } = useAnswerDataStore();
  const {
    answersForQuestion,
    votesForQuestion,
    setVotesForQuestion,
    setAnswersForQuestion,
    reset,
  } = usePaginationStore();
  const { value, setValue } = useMarkdownEditorValueStore();
  const {
    setUserReputation,
    setTotalProfileAnswers,
    resetProfile,
    setUserAnswersGiven,
    userReputation,
    userAnswersGiven,
    totalProfileAnswers,
    setTotalProfileVotes,
    allVotes,
    setAllVotes,
    setTotalProfileUpvotes,
    setTotalProfileDownvotes,
    answerVotesDetails,
    setAnswerVotesDetails,
    setAnswerEdit,
  } = useLoggedInUserDetailsStore();

  async function handleAnswerDelete(e) {
    e.stopPropagation();
    e.preventDefault();
    try {
      const deleteAnswerData = await axios.delete("/api/deleteAnswerData", {
        data: {
          answerId: answer.$id,
          authorId: user.$id,
        },
      });
      if (deleteAnswerData.data.error) {
        toast.error(deleteAnswerData.data.error);
        return;
      }

      setValue("");
      setTotalProfileVotes(
        allVotes.filter((vote) => vote.typeId !== answer.$id).length
      );
      setTotalProfileDownvotes(
        allVotes
          .filter((vote) => vote.typeId !== answer.$id)
          .filter((vote) => vote.voteStatus === "downvote").length
      );
      setTotalProfileUpvotes(
        allVotes
          .filter((vote) => vote.typeId !== answer.$id)
          .filter((vote) => vote.voteStatus === "upvote").length
      );
      setAllVotes(allVotes.filter((vote) => vote.typeId !== answer.$id));
      setVotesForQuestion(
        votesForQuestion.filter(
          (vote) =>
            vote.type === "question" ||
            (vote.type === "answer" && vote.typeId !== answer.$id)
        )
      );
      setAnswersForQuestion(
        answersForQuestion.filter((answers) => answers.$id !== answer.$id)
      );

      setAnswerVotesDetails(
        answerVotesDetails.filter((vote) => vote.typeId !== answer.$id)
      );
      setUserReputation(userReputation - 1);
      setUserAnswersGiven(userAnswersGiven - 1);
      setTotalProfileAnswers(totalProfileAnswers - 1);
      reset();
      resetProfile();
      toast.error("Answer Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleAnswerEdit(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!value) {
      toast.error("Updated Answer cannot be empty");
      return;
    }
    try {
      const updateAnswer = await databases.updateDocument(
        db,
        answerCollection,
        answer.$id,
        {
          content: value,
        }
      );
      toast.success("Answer Updated Successfully");
      setValue("");
      reset();
      resetProfile();
      setAnswerEdit((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAnswerEditable(false);
    }
  }

  return (
    <>
      <div
        className="row-start-2 text-lg font-bold"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {isAnswerEditable ? (
          <MarkdownEditor />
        ) : (
          <div>
            <MDEditor.Markdown
              source={answer.content}
              style={{ fontSize: "16px", backgroundColor: "transparent" }}
              className="hidden md:block"
            />
            <MDEditor.Markdown
              source={answer.content}
              style={{ fontSize: "12px", backgroundColor: "transparent" }}
              className="block md:hidden"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <div className="row-start-3 flex gap-2 md:gap-4 text-md bg-gray-950 w-max px-2 py-1 rounded-xl justify-end">
          <button
            className="cursor-pointer opacity-70 hover:opacity-100 flex gap-1 md:gap-2 transition duration-150 text-xs md:text-base"
            onClick={
              isAnswerEditable
                ? handleAnswerEdit
                : (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setValue(answer.content);
                    setIsAnswerEditable((prev) => !prev);
                  }
            }
          >
            {isAnswerEditable ? (
              <div className="flex gap-2">
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
              <div className="flex gap-2">
                {" "}
                <IconEdit size={28} color="green" className="hidden md:block" />
                <IconEdit size={20} color="green" className="block md:hidden" />
                <p className="mt-[1.5px]">Edit</p>
              </div>
            )}
          </button>
          <button
            className="cursor-pointer opacity-70 hover:opacity-100 flex gap-1 md:gap-2 transition duration-150 text-xs md:text-base"
            onClick={handleAnswerDelete}
          >
            <IconCircleMinus
              color="red"
              size={28}
              className="hidden md:block"
            />
            <IconCircleMinus
              color="red"
              size={20}
              className="block md:hidden"
            />
            <p className="mt-[1.5px]">Delete</p>
          </button>
          <p className="text-yellow-400 text-xs md:text-base font-bold mt-[1.5px]">
            {dateFormatter(answer.$createdAt)}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileAnswerEditAndDelete;
