"use client";

import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { FloatingDock } from "@/components/ui/floatingDock";
import { links } from "@/utils/navbarLinks";
import { IconUserFilled, IconClockFilled } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { NavLink } from "@/components/custom/NavLink";
import ParticlesBackground from "@/components/custom/ParticlesBackground";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/collectionNames";
import { Query } from "appwrite";
import toast from "react-hot-toast";
import { avatars, databases } from "@/models/client/config";
import dateFormatter from "@/utils/dateFormatter";
import usePaginationStore from "@/store/Pagination";
import getPaginatedData from "@/utils/getPaginatedData";
import useUserListStore from "@/store/UserList";
import { set } from "date-fns";
function layout({ children }) {
  const { usersList } = useUserListStore();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const { session } = useAuthStore();
  const {
    setTotalProfileQuestions,
    setTotalProfileAnswers,
    totalProfileAnswers,
    totalProfileQuestions,
    answersList,
    setAnswersList,
    votesList,
    setVotesList,
    totalProfileVotes,
    setTotalProfileVotes,
    answerVotesDetails,
    setAnswerVotesDetails,
    questionVotesDetails,
    setQuestionVotesDetails,
    allVotes,
    setAllVotes,
    upvotesList,
    setUpvotesList,
    downvotesList,
    setDownvotesList,
    totalProfileUpvotes,
    setTotalProfileUpvotes,
    totalProfileDownvotes,
    setTotalProfileDownvotes,
    resetProfile,
    questionForAnswers,
    setQuestionForAnswers,
  } = useLoggedInUserDetailsStore();
  const {
    page,
    limit,
    totalQuestions,
    setQuestionsList,
    setTotalQuestions,
    questionsList,
    answersForQuestion,
    setAnswersForQuestion,
    votesForQuestion,
    setVotesForQuestion,
    reset,
    switchPageForProfileAnswers,
    switchPageForProfileDownvotes,
    switchPageForProfileUpvotes,
    switchPageForProfileQuestions,
    switchPageForProfileVotes,

  } = usePaginationStore();

  useEffect(() => {
    if (!session) {
      router.push(
        `/login/?redirectUrl=${encodeURIComponent("profile-summary")}`
      );
    }
  }, []);
  if (!session) return;

  useEffect(() => {
    reset();
    resetProfile();
  }, [pathname]);

  useEffect(() => {
    async function getTotalQuestionsAsked() {
      try {
        const total = await databases.listDocuments(db, questionCollection, [
          Query.equal("authorId", user.$id),
          Query.limit(1),
        ]);
        setTotalQuestions(total.total);
        setTotalProfileQuestions(total.total);
      } catch (error) {
        toast.error(error.message);
      }
    }
    async function getTotalAnswersGiven() {
      try {
        const total = await databases.listDocuments(db, answerCollection, [
          Query.equal("authorId", user.$id),
          Query.limit(1),
        ]);
        setTotalProfileAnswers(total.total);
      } catch (error) {
        toast.error(error.message);
      }
    }

    async function getTotalVotesGiven() {
      try {
        const total = await databases.listDocuments(db, voteCollection, [
          Query.equal("votedById", user.$id),
          Query.limit(1),
        ]);
        setTotalProfileVotes(total.total);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getTotalQuestionsAsked();
    getTotalAnswersGiven();
    getTotalVotesGiven();
  }, []);

  useEffect(() => {
    if (totalQuestions === null) return;
    async function getPaginatedQuestions() {
      try {
        const questionsList = await getPaginatedData(
          page,
          limit,
          questionCollection,
          user.$id
        );
        setQuestionsList(questionsList.response.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedQuestions();
  }, [totalQuestions, switchPageForProfileQuestions]);

  useEffect(() => {
    if (totalProfileAnswers === null) return;
    async function getPaginatedAnswers() {
      try {
        const answersList = await getPaginatedData(
          page,
          limit,
          answerCollection,
          user.$id
        );
        const questionsForAnswers = await databases.listDocuments(
          db,
          questionCollection,
          [
            Query.equal("$id", answersList.response.documents.map((answer) => answer.questionId)),
          ]
        )
        setQuestionForAnswers(questionsForAnswers.documents);
        setAnswersList(answersList.response.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedAnswers();
  }, [totalProfileAnswers, switchPageForProfileAnswers]);

  useEffect(() => {
    async function getPaginatedVotes() {
      try {
        const votesList = await getPaginatedData(
          page,
          limit,
          voteCollection,
          user.$id
        );
        setVotesList(votesList.response.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedVotes();
  }, [totalProfileVotes, switchPageForProfileVotes]);

  useEffect(() => {
    async function getAllVotes() {
      try {
        const allVotes = await databases.listDocuments(db, voteCollection, [
          Query.equal("votedById", user.$id),
        ]);
        setAllVotes(allVotes.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getAllVotes();
  }, []);

  useEffect(() => {
    if (allVotes === null) return;

    setTotalProfileUpvotes(
      allVotes?.filter((vote) => vote.voteStatus === "upvoted").length
    );
    setTotalProfileDownvotes(
      allVotes?.filter((vote) => vote.voteStatus === "downvoted").length
    );
  }, [allVotes]);

  useEffect(() => {
    async function getPaginatedUpvotes() {
      try {
        const upvotesList = await getPaginatedData(
          page,
          limit,
          voteCollection,
          user.$id,
          "upvotes"
        );
        setUpvotesList(upvotesList.response.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedUpvotes();
  }, [totalProfileUpvotes, switchPageForProfileUpvotes]);

  useEffect(() => {
    async function getPaginatedDownvotes() {
      try {
        const downvotesList = await getPaginatedData(
          page,
          limit,
          voteCollection,
          user.$id,
          "downvotes"
        );
        setDownvotesList(downvotesList.response.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPaginatedDownvotes();
  }, [totalProfileDownvotes, switchPageForProfileDownvotes]);

  useEffect(() => {
    if (!allVotes) return;
    if (allVotes.length === 0) {
      setQuestionVotesDetails([]);
      setAnswerVotesDetails([]);
      return;
    }
    const questionParameters = allVotes
      ?.filter((votes) => votes.type === "question")
      ?.map((votes) => votes.typeId);
    const questionQuery = [];

    const answerParameters = allVotes
      ?.filter((votes) => votes.type === "answer")
      ?.map((votes) => votes.typeId);
    const answerQuery = [];

    if (questionParameters.length > 0) {
      questionQuery.push(Query.equal("$id", questionParameters));
    }

    if (answerParameters.length > 0) {
      answerQuery.push(Query.equal("$id", answerParameters));
    }

    async function getVotesDetails() {
      try {
        const getAnswerVotes = await databases.listDocuments(
          db,
          answerCollection,
          answerQuery
        );
        const getQuestionVotes = await databases.listDocuments(
          db,
          questionCollection,
          questionQuery
        );

        setAnswerVotesDetails(getAnswerVotes.documents);
        setQuestionVotesDetails(getQuestionVotes.documents);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getVotesDetails();
  }, [allVotes]);

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

  if (
    !(
      totalProfileAnswers !== null &&
      totalProfileQuestions !== null &&
      questionsList?.length >= 0 &&
      answersForQuestion?.length >= 0 &&
      votesForQuestion !== null &&
      answersList?.length >= 0 &&
      votesList?.length >= 0 &&
      answerVotesDetails?.length >= 0 &&
      questionVotesDetails?.length >= 0 &&
      allVotes?.length >= 0 &&
      upvotesList?.length >= 0 &&
      downvotesList?.length >= 0 &&
      questionForAnswers?.length >= 0
    )
  )
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-12">
        <h1 className="text-center border-4 rounded-xl p-8 border-gray-700 ">
          <span className="text-6xl bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0] bg-clip-text text-transparent font-bold">
            Loading...
          </span>
        </h1>
      </div>
    );

  const BottomGradient = () => {
    return (
      <>
        <span className="absolute inset-x-0 -bottom-px block h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-250 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-250 group-hover/btn:opacity-100" />
      </>
    );
  };

  return (
    <div className="grid grid-cols-[14%_1fr_1fr_1fr] gap-4 pl-10 pt-16 pb-2 pr-10 min-h-screen relative overflow-hidden">
      <ParticlesBackground quantity="500" />
      <div className="flex justify-center fixed md:static left-[42%] bottom-[2%] z-20 col-span-4 row-start-1">
        <FloatingDock items={links} />
      </div>
      <div className="col-start-1 row-start-2">
        <img
          src={avatars.getInitials(user.name)}
          alt="Avatar"
          className="rounded-sm mb-1 w-full h-full"
        />
      </div>
      <div className="col-start-1 row-start-3 flex flex-col gap-4 group text-white/60 pt-2 font-bold">
        <NavLink
          href="/profile-summary"
          className="text-lg hover:text-foreground px-4 py-2"
        >
          Summary
        </NavLink>
        <NavLink
          href="/profile-questions"
          className="text-lg hover:text-foreground px-4 py-2"
        >
          Questions
        </NavLink>
        <NavLink
          href="/profile-answers"
          className="text-lg hover:text-foreground px-4 py-2"
        >
          Answers
        </NavLink>
        <NavLink
          href="/profile-votes/all"
          className={`text-lg hover:text-foreground px-4 py-2 ${
            (pathname === "/profile-votes/upvotes" &&
              "w-max bg-[#141e38] text-foreground rounded-lg px-4 py-2 hover:bg-[#141e38ad]") ||
            (pathname === "/profile-votes/downvotes" &&
              "w-max bg-[#141e38] text-foreground rounded-lg px-4 py-2 hover:bg-[#141e38ad]")
          }`}
        >
          Votes
        </NavLink>
      </div>
      <div className="col-start-2 row-start-2 flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-orange-500">{user.name}</h1>
        <h2 className="text-xl font-bold text-orange-500">{user.email}</h2>
        <ul className="list-none font-bold">
          <li className="flex gap-2 py-2">
            <IconUserFilled size={20} />
            <p>
              Member since{" "}
              <span className="text-green-400">
                {dateFormatter(user.$createdAt)
                  .replace("about", "")
                  .replace("ago", "")
                  .trim()}
              </span>
            </p>
          </li>
          <li className="flex gap-2">
            <IconClockFilled size={20} />
            <p>
              Last Activity{" "}
              <span className="text-green-400">
                {dateFormatter(usersList.filter((users) => users.$id === user.$id)[0].$updatedAt).replace("about", "").trim()}
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div className="col-start-2 col-span-3 row-start-3 border-t-2 border-gray-600 pt-4">
        {children}
      </div>
      <div className="col-start-4 pt-4 row-start-2 flex justify-end">
        <button
          className="group/btn relative block h-max rounded-lg bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer px-4 py-2"
          type="button"
          onClick={() => router.push("/profile-edit")}
        >
          Edit Profile
          <BottomGradient />
        </button>
      </div>
      <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background row-start-5 col-start-1 col-span-4">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={1.5}
          repeatDelay={1}
          className="mask-radial-[800px_circle_at_center,white,transparent] inset-x-0 inset-y-[-70%] h-[200%] skew-y-12"
        />
        <p className="text-lg absolute translate-y-[240%] bg-black">
          © 2025 StackFlow QnA System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default layout;
