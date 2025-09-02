import { useAuthStore } from "@/store/Auth";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import usePaginationStore from "@/store/Pagination";
import dateFormatter from "@/utils/dateFormatter";
import { IconCircleMinus, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function ProfileQuestionEditAndDelete({ id, createdAt, imageId }) {
  const {
    reset,
    answersForQuestion,
    setTotalQuestions,
    totalQuestions,
    votesForQuestion,
    setVotesForQuestion,
    setAnswersForQuestion,
  } = usePaginationStore();
  const { user } = useAuthStore();
  const {
    resetProfile,
    userReputation,
    setUserReputation,
    userAnswersGiven,
    setUserAnswersGiven,
    userQuestionsAsked,
    setUserQuestionsAsked,
    setTotalProfileVotes,
    allVotes,
    setAllVotes,
    setTotalProfileUpvotes,
    setTotalProfileDownvotes,
    answerVotesDetails,
    setAnswerVotesDetails,
    setQuestionVotesDetails,
    questionVotesDetails,
    setTotalProfileAnswers,
    totalProfileAnswers,
  } = useLoggedInUserDetailsStore();
  const router = useRouter();
  async function handleQuestionDelete(e) {
    e.stopPropagation();
    e.preventDefault();

    try {
      const deleteQuestionData = await axios.delete("/api/deleteQuestionData", {
        data: {
          questionId: id,
          answerList: answersForQuestion.filter(
            (answer) => answer.questionId === id
          ),
          userId: user.$id,
          imageId: imageId,
        },
      });
      if (deleteQuestionData.data.error) {
        toast.error(deleteQuestionData.data.error);
        return;
      }

      setAllVotes(
        allVotes.filter(
          (vote) =>
            vote.typeId !== id &&
            !answersForQuestion
              .filter((answer) => answer.questionId === id)
              .map((answer) => answer.$id)
              .includes(vote.typeId)
        )
      );

      setTotalProfileVotes(
        allVotes.filter(
          (vote) =>
            vote.typeId !== id &&
            !answersForQuestion
              .filter((answer) => answer.questionId === id)
              .map((answer) => answer.$id)
              .includes(vote.typeId)
        ).length
      );
      setTotalProfileDownvotes(
        allVotes
          .filter(
            (vote) =>
              vote.typeId !== id &&
              !answersForQuestion
                .filter((answer) => answer.questionId === id)
                .map((answer) => answer.$id)
                .includes(vote.typeId)
          )
          .filter((vote) => vote.voteStatus === "downvoted").length
      );
      setTotalProfileUpvotes(
        allVotes
          .filter(
            (vote) =>
              vote.typeId !== id &&
              !answersForQuestion
                .filter((answer) => answer.questionId === id)
                .map((answer) => answer.$id)
                .includes(vote.typeId)
          )
          .filter((vote) => vote.voteStatus === "upvoted").length
      );
      setVotesForQuestion(
        votesForQuestion.filter(
          (vote) =>
            (vote.type === "question" && vote.typeId !== id) ||
            !answersForQuestion
              .filter((answer) => answer.questionId === id)
              .map((answer) => answer.$id)
              .includes(vote.typeId)
        )
      );
      setAnswerVotesDetails(
        answerVotesDetails.filter(
          (vote) =>
            !answersForQuestion
              .filter((answer) => answer.questionId === id)
              .map((answer) => answer.$id)
              .includes(vote.typeId)
        )
      );
      setQuestionVotesDetails(
        questionVotesDetails.filter((vote) => vote.typeId !== id)
      );
      setTotalProfileAnswers(
        answersForQuestion.filter((answer) => answer.questionId !== id).length
      );
      setAnswersForQuestion(
        answersForQuestion.filter((answer) => answer.questionId !== id)
      );

      setUserQuestionsAsked(userQuestionsAsked - 1);
      setUserAnswersGiven(
        deleteQuestionData.data.answersGiven === -1
          ? userAnswersGiven
          : userAnswersGiven - deleteQuestionData.data.answersGiven
      );
      setUserReputation(
        deleteQuestionData.data.reputation === -1
          ? userReputation
          : deleteQuestionData.data.reputation
      );
      toast.success(deleteQuestionData.data.message);

      reset();
      resetProfile();
      setTotalQuestions(totalQuestions - 1);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleQuestionEdit(e) {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/askquestion/${id}`);
  }
  return (
    <div className="flex gap-2 md:gap-4 bg-gray-950 w-max px-2 py-1 rounded-xl justify-end">
      <button
        className="cursor-pointer opacity-70 hover:opacity-100 flex gap-1 md:gap-2 transition duration-150 text-xs md:text-base"
        onClick={handleQuestionEdit}
      >
        <IconEdit size={28} color="green" className="hidden md:block" />
        <IconEdit size={20} color="green" className="block md:hidden" />
        <p className="mt-[1.5px] ">Edit</p>
      </button>
      <button
        className="cursor-pointer opacity-70 hover:opacity-100 flex gap-1 md:gap-2 transition duration-150 text-xs md:text-base"
        onClick={handleQuestionDelete}
      >
        <IconCircleMinus color="red" size={28} className="hidden md:block" />
        <IconCircleMinus color="red" size={20} className="block md:hidden" />
        <p className="mt-[1.5px]">Delete</p>
      </button>
      <p className="text-xs md:text-base text-yellow-300 mt-[1.5px]">
        {" "}
        {dateFormatter(createdAt)}
      </p>
    </div>
  );
}

export default ProfileQuestionEditAndDelete;
