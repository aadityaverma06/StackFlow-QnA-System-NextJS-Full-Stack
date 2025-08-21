"use client";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { FloatingDock } from "@/components/ui/floatingDock";
import { links } from "@/utils/navbarLinks";
import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/inputAceternity";
import QuestionsContainer from "@/components/custom/QuestionsContainer";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useEffect } from "react";
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
    switchPageForQuestions
  } = usePaginationStore();
  const { usersList } = useUserListStore();

  useEffect(() => {
    async function getQuestions() {
      try {
        const totalQuestions = await databases.listDocuments(
          db,
          questionCollection,
          [Query.limit(1)]
        );
        setTotalQuestions(totalQuestions.total);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getQuestions();
  }, []);

  useEffect(() => {
    if (totalQuestions === null) return;
    async function getPaginatedQuestions() {
      try {
        const questionsList = await getPaginatedData(
          page,
          limit,
          questionCollection
        );
        setQuestionsList(questionsList.response.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedQuestions();
  }, [totalQuestions, switchPageForQuestions]);

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

  if (!(questionsList && answersForQuestion && votesForQuestion))
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
    <div className="grid grid-cols-[1fr_20%] gap-4 pt-16 pb-2 px-25 min-h-screen relative overflow-hidden">
      <ParticlesBackground quantity="500" />
      <div className="flex justify-center w-full fixed md:static left-[42%] bottom-[2%] z-20 col-span-2 row-start-1">
        <FloatingDock items={links} />
      </div>
      <div className="row-start-2 col-start-1">
        <h1 className="text-3xl font-bold">All Questions</h1>
      </div>
      <div className="row-start-2 col-start-2 flex justify-end">
        <ShimmerButton
          className="shadow-2xl"
          onClick={() => router.push("/askquestion")}
        >
          <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg ">
            Ask a Question
          </span>
        </ShimmerButton>
      </div>
      <div className="row-start-3 col-start-1 grid grid-cols-[85%_1fr] gap-4">
        <Input type="text" placeholder="Search Questions" />
        <button className="col-start-2 rounded-lg text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer p-2">
          Search
        </button>
      </div>
      <div className="col-start-1 row-start-4 flex flex-col gap-4">
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
                votesForQuestion.filter((vote) => vote.typeId === question.$id)
                  .length
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
        <p className="text-lg absolute translate-y-[380%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default questions;
