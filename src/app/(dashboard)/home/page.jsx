"use client";

import React, { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/floatingDock.jsx";
import { links } from "@/utils/navbarLinks.js";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import images from "@/utils/iconCloudImages.js";
import { IconCloud } from "@/components/magicui/icon-cloud";
import QuestionsContainer from "@/components/custom/QuestionsContainer";
import { AnimatedListItems } from "@/components/custom/AnimatedListItems";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { avatars, databases } from "@/models/client/config";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/collectionNames";
import toast from "react-hot-toast";
import { Query } from "appwrite";
import useUserListStore from "@/store/UserList";

function home() {
  const router = useRouter();
  const { session } = useAuthStore();
  const [latestQuestionsList, setLatestQuestionsList] = useState(null);
  const { usersList } = useUserListStore();
  const [answersForQuestion, setAnswersForQuestion] = useState(null);
  const [votesForQuestion, setVotesForQuestion] = useState(null);

  function handleQuestionClick(e) {
    e.preventDefault();
    router.push(`/question/${e.currentTarget.id}`);
  }

  useEffect(() => {
    async function getLatestQuestions() {
      try {
        const questionsList = await databases.listDocuments(
          db,
          questionCollection,
          [Query.orderDesc("$createdAt"), Query.limit(5)]
        );
        setLatestQuestionsList(questionsList.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getLatestQuestions();
  }, []);

  useEffect(() => {
    if (!latestQuestionsList) return;
    if (latestQuestionsList.length === 0) {
      setAnswersForQuestion([]);
      return;
    }

    async function getQuestionsAnswers() {
      try {
        const getAnswers = await databases.listDocuments(db, answerCollection, [
          Query.equal(
            "questionId",
            latestQuestionsList.map((question) => question.$id)
          ),
        ]);
        setAnswersForQuestion(getAnswers.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getQuestionsAnswers();
  }, [latestQuestionsList]);

  useEffect(() => {
    if (!latestQuestionsList) return;
    if (latestQuestionsList.length === 0) {
      setVotesForQuestion([]);
      return;
    }
    async function getQuestionsVotes() {
      try {
        const getVotes = await databases.listDocuments(db, voteCollection);
        setVotesForQuestion(getVotes.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getQuestionsVotes();
  }, [latestQuestionsList]);

  if (
    !(
      latestQuestionsList?.length >= 0 &&
      answersForQuestion?.length >= 0 &&
      votesForQuestion?.length >= 0
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
    <div className="grid pl-5 pt-8 pb-3 sm:pl-10 sm:pt-16 sm:pb-6 pr-10 p-y-16 gap-x-8 gap-y-16 relative overflow-hidden">
      <ParticlesBackground />
      <div className="flex justify-center w-full fixed md:static left-[43%] bottom-[2%] z-20 col-span-2">
        <FloatingDock items={links} />
      </div>
      <div className="flex flex-col xl:col-start-1 xl:row-start-2 col-span-2 xl:col-span-1 row-start-2 gap-6 justify-center animate-float-in">
        <h1 className="text-5xl xs:text-7xl bg-clip-text bg-gradient-to-b from-yellow-400 via-pink-600 to-purple-600 text-transparent font-bold self-center">
          StackFlow
        </h1>
        <p className="text-xl text-center xs:text-left">
          A place to share your knowledge, ask questions, and connect with
          like-minded individuals to boost up your coding skills, all in one
          place.
        </p>
        {!session && (
          <div className="flex [container-type:inline-size] justify-center gap-4">
            <InteractiveHoverButton onClick={() => router.push("/signup")}>
              Signup Now
            </InteractiveHoverButton>

            <ShimmerButton
              className="shadow-2xl"
              onClick={() => router.push("/login")}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Login
              </span>
            </ShimmerButton>
          </div>
        )}
      </div>
      <div className="relative flex size-full xl:items-center xl:justify-center overflow-hidden xl:row-start-2 xl:col-start-2 xl:col-span-1 col-span-2 row-start-3 justify-center">
        <IconCloud
          images={images}
          distanceBetweenImage={200}
          className="hidden sm:block"
          width={40}
          height={40}
        />
        <IconCloud
          images={images}
          distanceBetweenImage={150}
          className="hidden xs:block sm:hidden"
          width={60}
          height={60}
        />
        <IconCloud
          images={images}
          distanceBetweenImage={100}
          className="block xs:hidden"
          width={70}
          height={70}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-14 sm:gap-8 col-start-1 row-start-4 xl:row-start-3 col-span-2 ">
        <div className="lg:w-[69%] flex flex-col gap-6 col-start-1 order-2 lg:order-1">
          <h2 className="text-3xl font-bold place-self-center xs:place-self-start">
            Latest Questions
          </h2>
          {latestQuestionsList?.map((question, index) => (
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
        <div className="lg:w-max flex flex-col gap-6 col-start-2 items-center xs:items-start sm:items-center order-1 lg:order-2 ">
          <h2 className="text-3xl font-bold">Top Contributors</h2>
          <div>
            <AnimatedListItems
              className="col-start-2 row-start-3"
              items={usersList}
            />
          </div>
        </div>
      </div>
      <div className="col-start-1 row-start-5 xl:row-start-4 col-span-2 flex">
        <BackgroundGradient
          className={
            " bg-zinc-900 rounded-[22px] flex flex-col items-center gap-6 p-4 sm:pt-6 sm:px-10 sm:pb-10"
          }
        >
          <h1 className="bg-clip-text text-transparent font-bold text-3xl sm:text-6xl bg-gradient-to-br from-[#ff2975] from-25% via-purple-400 to-[#1fb0a8]">
            JOIN NOW
          </h1>
          <p className="text-lg sm:text-xl sm:text-center xl:max-w-[50%]">
            "Sign up" to become a part of our dynamic community. Gain access to
            a vast pool of knowledge, connect with experts, and share your
            insights. Whether you're here to ask questions or provide answers,
            joining us will enhance your learning experience and help you stay
            updated with the latest discussions. Join now and start making
            meaningful contributions today!
          </p>
        </BackgroundGradient>
      </div>
      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background row-start-6 xl:row-start-5 col-start-1 col-span-2">
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

export default home;
