"use client";

import React, { useEffect } from "react";
import QuestionsContainer from "@/components/custom/QuestionsContainer";
import { useAuthStore } from "@/store/Auth";
import usePaginationStore from "@/store/Pagination";
import { avatars } from "@/models/client/config";
import useUserListStore from "@/store/UserList";
import Pagination from "@/components/custom/Pagination";
import { useRouter } from "next/navigation";

function profileQuestions() {
  const { user } = useAuthStore();
  const { usersList, setRefreshList } = useUserListStore();
  const {
    questionsList,
    answersForQuestion,
    votesForQuestion,
    totalQuestions,
    isNextPageAvailable,
    totalQuestionsFetched,
    limit,
    setTotalQuestionsFetched,
  } = usePaginationStore();
  const router = useRouter();

  function handleQuestionClick(e) {
    e.preventDefault();
    setRefreshList((prev) => !prev);
    router.push(`/question/${e.currentTarget.id}`);
  }
  return (
    <div className="flex flex-col md:grid md:grid-cols-[80%_20%] gap-4 pt-4">
      <h3 className="text-lg sm:text-xl md:text-2xl col-start-1 font-bold">
        {totalQuestions === 0
          ? "No Questions"
          : totalQuestions === 1
          ? "1 Question"
          : `${totalQuestions} Questions`}
      </h3>
      {questionsList?.map((question, index) => (
        <div
          key={index}
          id={question.$id}
          onClick={handleQuestionClick}
          className="col-start-1 bg-[#141e388e] hover:bg-[#141e38c2] rounded-xl"
        >
          <QuestionsContainer
            className={"bg-gray-800/30 hover:bg-gray-700/35"}
            title={question.title}
            tags={question.tags}
            CardStyle="BorderBeam"
            authorId={question.authorId}
            createdAt={question.$createdAt}
            id={question.$id}
            author={user.name}
            avatar={avatars.getInitials(user.name, 20, 20)}
            reputation={
              usersList.find((user) => user.$id === question.authorId).prefs
                .reputation
            }
            totalAnswers={
              answersForQuestion?.filter(
                (answer) => answer.questionId === question.$id
              )?.length
            }
            totalVotes={
              votesForQuestion?.filter(
                (vote) =>
                  vote.typeId === question.$id && vote.voteStatus === "upvoted"
              )?.length -
              votesForQuestion?.filter(
                (vote) =>
                  vote.typeId === question.$id && vote.voteStatus === "downvoted"
              )?.length
            }
            type="profile"
            imageId={question.imageId}
          />
        </div>
      ))}
      <Pagination className="my-4 col-start-1" type="profile-questions" />
    </div>
  );
}

export default profileQuestions;
