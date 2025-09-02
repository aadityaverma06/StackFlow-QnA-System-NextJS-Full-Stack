"use client";

import React, { useEffect } from "react";
import QuestionsContainer from "@/components/custom/QuestionsContainer";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import ProfileAnswersContainer from "@/components/custom/ProfileAnswersContainer";
import Pagination from "@/components/custom/Pagination";
import usePaginationStore from "@/store/Pagination";
import { useRouter } from "next/navigation";
import { set } from "date-fns";
import useUserListStore from "@/store/UserList";

function profileQuestions() {
  const { answersList, totalProfileAnswers, questionForAnswers } =
    useLoggedInUserDetailsStore();
  const router = useRouter();
  const { setRefreshList } = useUserListStore();
  function handleAnswerClick(e) {
    e.preventDefault();
    setRefreshList((prev) => !prev);
    router.push(`/question/${e.currentTarget.id}`);
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
        {totalProfileAnswers === 0
          ? "No Answers"
          : totalProfileAnswers === 1
          ? "1 Answer"
          : `${totalProfileAnswers} Answers`}
      </h3>
      {answersList?.map((answer, index) => (
        <div
          key={index}
          className="bg-[#141e388e] hover:bg-[#141e38c2] rounded-xl transition duration-200 cursor-pointer"
          id={
            questionForAnswers.filter(
              (question) => question.$id === answer.questionId
            )[0].$id
          }
          onClick={(e) => handleAnswerClick(e)}
        >
          <ProfileAnswersContainer
            answer={answer}
            question={
              questionForAnswers.filter(
                (question) => question.$id === answer.questionId
              )[0]
            }
          />
        </div>
      ))}
      <div className="flex justify-center gap-4 items-center my-4">
        <Pagination type="profile-answers" />
      </div>
    </div>
  );
}

export default profileQuestions;
