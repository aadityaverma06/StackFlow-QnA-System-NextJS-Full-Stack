import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import usePaginationStore from "@/store/Pagination";
import { cn } from "@/utils/cn";
import { set } from "date-fns";

import React, { useEffect, useState } from "react";

function Pagination({ className, type = "questions" }) {
  const {
    page,
    setPage,
    limit,
    totalQuestions,
    setTotalQuestionsFetched,
    totalQuestionsFetched,
    setIsNextPageAvailable,
    setIsPreviousPageAvailable,
    isNextPageAvailable,
    isPreviousPageAvailable,
    switchPageForQuestions,
    setSwitchPageForQuestions,
    switchPageForProfileQuestions,
    setSwitchPageForProfileQuestions,
    switchPageForProfileAnswers,
    setSwitchPageForProfileAnswers,
    setSwitchPageForProfileVotes,
    switchPageForProfileVotes,
    switchPageForProfileUpvotes,
    setSwitchPageForProfileUpvotes,
    switchPageForProfileDownvotes,
    setSwitchPageForProfileDownvotes,
  } = usePaginationStore();

  const [tempPage, setTempPage] = useState(1);

  const {
    totalProfileAnswersFetched,
    setTotalProfileAnswersFetched,
    totalProfileVotesFetched,
    setTotalProfileVotesFetched,
    totalProfileAnswers,
    totalProfileVotes,
    totalProfileUpvotesFetched,
    totalProfileUpvotes,
    totalProfileDownvotesFetched,
    totalProfileDownvotes,
    setTotalProfileUpvotesFetched,
    setTotalProfileDownvotesFetched,
  } = useLoggedInUserDetailsStore();

  useEffect(() => {
    const delayRender = setTimeout(() => {
      console.log("initial render");

      if (type === "questions" && totalQuestions === 0) {
        setIsNextPageAvailable(false);
        setTempPage(0);
      }
      if (type === "questions" && totalQuestions > 0)
        setTotalQuestionsFetched(totalQuestionsFetched + limit);
      if (type === "profile-questions" && totalQuestions === 0) {
        setIsNextPageAvailable(false);
        setTempPage(0);
      }
      if (type === "profile-questions" && totalQuestions > 0)
        setTotalQuestionsFetched(totalQuestionsFetched + limit);

      if (type === "profile-answers" && totalProfileAnswers === 0) {
        setIsNextPageAvailable(false);
        setTempPage(0);
      }

      if (type === "profile-answers" && totalProfileAnswers > 0) {
        console.log("hi");

        setTotalProfileAnswersFetched(totalProfileAnswersFetched + limit);
      }

      if (type === "profile-votes" && totalProfileVotes === 0) {
        setIsNextPageAvailable(false);
        setTempPage(0);
      }

      if (type === "profile-votes" && totalProfileVotes > 0)
        setTotalProfileVotesFetched(totalProfileVotesFetched + limit);

      if (type === "profile-upvotes" && totalProfileUpvotes === 0) {
        setIsNextPageAvailable(false);
        setTempPage(0);
      }

      if (type === "profile-upvotes" && totalProfileUpvotes > 0)
        setTotalProfileUpvotesFetched(totalProfileUpvotesFetched + limit);

      if (type === "profile-downvotes" && totalProfileDownvotes === 0) {
        setIsNextPageAvailable(false);
        setTempPage(0);
      }

      if (type === "profile-downvotes" && totalProfileDownvotes > 0)
        setTotalProfileDownvotesFetched(totalProfileDownvotesFetched + limit);
    }, 1);

    return () => clearTimeout(delayRender);
  }, []);

  async function handleNextPage() {
    if (
      type === "questions"
        ? totalQuestionsFetched >= totalQuestions
        : type === "profile-questions"
        ? totalQuestionsFetched >= totalQuestions
        : type === "profile-answers"
        ? totalProfileAnswersFetched >= totalProfileAnswers
        : type === "profile-votes"
        ? totalProfileVotesFetched >= totalProfileVotes
        : type === "profile-upvotes"
        ? totalProfileUpvotesFetched >= totalProfileUpvotes
        : totalProfileDownvotesFetched >= totalProfileDownvotes
    )
      setIsNextPageAvailable(false);
    else {
      setPage(page + 1);
      setIsPreviousPageAvailable(true);
      type === "questions"
        ? (setTotalQuestionsFetched(totalQuestionsFetched + limit),
          setSwitchPageForQuestions((prev) => !prev))
        : type === "profile-questions"
        ? (setTotalQuestionsFetched(totalQuestionsFetched + limit),
          setSwitchPageForProfileQuestions((prev) => !prev))
        : type === "profile-answers"
        ? (setTotalProfileAnswersFetched(totalProfileAnswersFetched + limit),
          setSwitchPageForProfileAnswers((prev) => !prev))
        : type === "profile-votes"
        ? setTotalProfileVotesFetched(
            totalProfileVotesFetched + limit,
            setSwitchPageForProfileVotes((prev) => !prev)
          )
        : type === "profile-upvotes"
        ? setTotalProfileUpvotesFetched(
            totalProfileUpvotesFetched + limit,
            setSwitchPageForProfileUpvotes((prev) => !prev)
          )
        : (setTotalProfileDownvotesFetched(
            totalProfileDownvotesFetched + limit
          ),
          setSwitchPageForProfileDownvotes((prev) => !prev));
    }
  }

  async function handlePreviousPage() {
    if (page === 1) setIsPreviousPageAvailable(false);
    else {
      setPage(page - 1);
      setIsNextPageAvailable(true);
      type === "questions"
        ? setTotalQuestionsFetched(
            totalQuestionsFetched - limit,
            setSwitchPageForQuestions((prev) => !prev)
          )
        : type === "profile-questions"
        ? setTotalQuestionsFetched(
            totalQuestionsFetched - limit,
            setSwitchPageForProfileQuestions((prev) => !prev)
          )
        : type === "profile-answers"
        ? setTotalProfileAnswersFetched(
            totalProfileAnswersFetched - limit,
            setSwitchPageForProfileAnswers((prev) => !prev)
          )
        : type === "profile-votes"
        ? setTotalProfileVotesFetched(
            totalProfileVotesFetched - limit,
            setSwitchPageForProfileVotes((prev) => !prev)
          )
        : type === "profile-upvotes"
        ? setTotalProfileUpvotesFetched(
            totalProfileUpvotesFetched - limit,
            setSwitchPageForProfileUpvotes((prev) => !prev)
          )
        : (setTotalProfileDownvotesFetched(
            totalProfileDownvotesFetched - limit
          ),
          setSwitchPageForProfileDownvotes((prev) => !prev));
    }
  }

  return (
    <div className={cn(className, "flex justify-center gap-4 items-center")}>
      <button
        className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100"
        onClick={isPreviousPageAvailable ? handlePreviousPage : null}
      >
        Previous
      </button>
      <h4 className="text-md">
        {tempPage === 0
          ? `Page 0 of 0`
          : `Page ${page} of 
        ${Math.ceil(
          (type === "questions"
            ? totalQuestions
            : type === "profile-questions"
            ? totalQuestions
            : type === "profile-answers"
            ? totalProfileAnswers
            : type === "profile-votes"
            ? totalProfileVotes
            : type === "profile-upvotes"
            ? totalProfileUpvotes
            : totalProfileDownvotes) / limit
        )}`}
      </h4>
      <button
        className="rounded-lg bg-zinc-800 pl-2 pr-2 pt-1 pb-1 text-md hover:bg-zinc-900 cursor-pointer transition duration-100"
        onClick={isNextPageAvailable ? handleNextPage : null}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
