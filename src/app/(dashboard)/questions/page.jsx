"use client";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { FloatingDock } from "@/components/ui/floatingDock";
import { links } from "@/utils/navbarLinks";
import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/inputAceternity";
import QuestionsContainer from "@/components/custom/QuestionsContainer";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useEffect, useState } from "react";
import { avatars, databases } from "@/models/client/config";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/collectionNames";
import toast from "react-hot-toast";
import useUserListStore from "@/store/UserList";
import Pagination from "@/components/custom/Pagination";

import { Query } from "appwrite";
import getPaginatedData from "@/utils/getPaginatedData";
import usePaginationStore from "@/store/Pagination";

function questions() {
  const router = useRouter();
  const {
    page,
    limit,
    totalQuestions,
    setQuestionsList,
    questionsList,
    setTotalQuestions,
    answersForQuestion,
    setAnswersForQuestion,
    votesForQuestion,
    setVotesForQuestion,
    switchPageForQuestions,
    reset,
    triggerSearch,
    setTriggerSearch,
  } = usePaginationStore();
  const { usersList } = useUserListStore();
  const [searchParams, setSearchParams] = useState("");
  const [searchParameters, setSearchParameters] = useState("");
  function handleQuestionSearch() {
    reset();
    setTotalQuestions(null);
    setQuestionsList(null);
    setSearchParameters(searchParams);
    setTriggerSearch((prev) => !prev);
    router.push(`questions/?search=${searchParams}`);
  }
  useEffect(() => {
    async function getQuestions() {
      try {
        const queries = searchParameters
          ? [Query.search("title", searchParameters), Query.limit(1)]
          : [Query.limit(1)];
        const totalQuestions = await databases.listDocuments(
          db,
          questionCollection,
          queries
        );
        setTotalQuestions(totalQuestions.total);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getQuestions();
  }, [triggerSearch]);

  useEffect(() => {
    if (totalQuestions === null) return;
    async function getPaginatedQuestions() {
      try {
        const questionsList = await getPaginatedData(
          page,
          limit,
          questionCollection,
          null,
          null,
          searchParameters
        );
        setQuestionsList(questionsList.response.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedQuestions();
  }, [triggerSearch, totalQuestions, switchPageForQuestions]);

  useEffect(() => {
    if (!questionsList) return;
    async function getPaginatedQuestionsAnswers() {
      try {
        const getAnswers = await databases.listDocuments(db, answerCollection);
        setAnswersForQuestion(getAnswers.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedQuestionsAnswers();
  }, [questionsList]);

  useEffect(() => {
    if (!questionsList) return;
    async function getPaginatedQuestionsVotes() {
      try {
        const getVotes = await databases.listDocuments(db, voteCollection);
        setVotesForQuestion(getVotes.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedQuestionsVotes();
  }, [questionsList]);

  function handleQuestionClick(e) {
    e.preventDefault();
    router.push(`/question/${e.currentTarget.id}`);
  }

  if (
    !(
      totalQuestions !== null &&
      questionsList &&
      answersForQuestion &&
      votesForQuestion
    )
  )
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-12">
        <h1 className="text-center border-4 rounded-xl p-8 border-gray-700 ">
          <span className="text-5xl xs:text-6xl bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0] bg-clip-text text-transparent font-bold">
            Loading...
          </span>
        </h1>
      </div>
    );

  return (
    <div className="grid grid-cols-[1fr_20%] gap-y-4 gap-x-0 lg:gap-x-4 lg:gap-y-4 pt-16 pb-2 px-5 lg:px-25 min-h-screen relative overflow-hidden ">
      <ParticlesBackground quantity="500" />
      <div className="flex justify-center w-full fixed md:static left-[43%] bottom-[2%] z-20 col-span-2 row-start-1">
        <FloatingDock items={links} />
      </div>
      <div className="row-start-2 col-start-1 col-span-2 lg:col-span-1">
        <h1 className="text-3xl font-bold">All Questions</h1>
      </div>
      <div className="hidden xs:row-start-2 xs:col-start-1 lg:col-start-2 xs:col-span-2 lg:col-span-1 xs:flex xs:justify-end h-[44px]">
        <ShimmerButton
          className="shadow-2xl"
          onClick={() => router.push("/askquestion")}
        >
          <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base ">
            Ask a Question
          </span>
        </ShimmerButton>
      </div>
      <div className="row-start-3 col-start-1 md:grid md:grid-cols-[85%_1fr] flex flex-col gap-4 col-span-2 lg:col-span-1">
        <Input
          type="text"
          placeholder="Search Questions"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
        />
        <button
          className="hidden xs:block col-start-2 rounded-md md:rounded-lg text-sm md:text-base lg:text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer p-2 transition duration-200 w-max md:w-full lg:w-auto h-[44px]"
          onClick={handleQuestionSearch}
        >
          Search
        </button>
        <div className="flex xs:hidden justify-between items-center">
          <button
            className="col-start-2 rounded-md md:rounded-lg text-sm md:text-base lg:text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer p-2 transition duration-200 w-max md:w-full lg:w-auto h-max xs:h-auto"
            onClick={handleQuestionSearch}
          >
            Search
          </button>
          <div className="flex h-[44px]">
            <ShimmerButton
              className="shadow-2xl"
              onClick={() => router.push("/askquestion")}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base ">
                Ask a Question
              </span>
            </ShimmerButton>
          </div>
        </div>
      </div>
      <div className="col-start-1 row-start-4  flex flex-col gap-4 col-span-2 lg:col-span-1">
        <h2 className="text-2xl my-4 font-bold">
          {totalQuestions === 0
            ? "No Questions"
            : totalQuestions === 1
            ? `1 Question`
            : `${totalQuestions} Questions`}
        </h2>

        {questionsList?.map((question, index) => (
          <div key={index} id={question.$id} onClick={handleQuestionClick}>
            <QuestionsContainer
              className={"bg-gray-800/30 hover:bg-gray-700/35"}
              title={question.title}
              tags={question.tags}
              authorId={question.authorId}
              createdAt={question.$createdAt}
              author={
                usersList.find((user) => user.$id === question.authorId).name
              }
              avatar={avatars.getInitials(
                usersList.find((user) => user.$id === question.authorId).name,
                20,
                20
              )}
              reputation={
                usersList.find((user) => user.$id === question.authorId).prefs
                  .reputation
              }
              totalAnswers={
                answersForQuestion.filter(
                  (answer) => answer.questionId === question.$id
                ).length
              }
              totalVotes={
                votesForQuestion.filter(
                  (vote) =>
                    vote.typeId === question.$id &&
                    vote.voteStatus === "upvoted"
                ).length -
                votesForQuestion.filter(
                  (vote) =>
                    vote.typeId === question.$id &&
                    vote.voteStatus === "downvoted"
                ).length
              }
            />
          </div>
        ))}
      </div>
      <div className="row-start-5 col-span-2 mt-4">
        <Pagination type="questions" />
      </div>
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background row-start-6 col-span-2 mt-4">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={1.5}
          repeatDelay={1}
          className="mask-radial-[800px_circle_at_center,white,transparent] inset-x-0 inset-y-[-70%] h-[200%] skew-y-12"
        />
        <p className="text-xs xs:text-sm sm:text-base md:text-lg absolute text-center bottom-[10%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default questions;
