"use client";

import Pagination from "@/components/custom/Pagination";
import ProfileVotesContainer from "@/components/custom/ProfileVotesContainer";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import usePaginationStore from "@/store/Pagination";
import useUserListStore from "@/store/UserList";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function profileVotes() {
  const {
    votesList,
    totalProfileVotes,
    setTotalProfileVotesFetched,
    totalProfileVotesFetched,
  } = useLoggedInUserDetailsStore();
  const { limit, answersForQuestion } = usePaginationStore();
  const { setRefreshList } = useUserListStore();
  const router = useRouter();

  function handleVoteClick(e) {
    e.preventDefault();
    setRefreshList((prev) => !prev);
    router.push(`/question/${e.currentTarget.id}`);
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex justify-between">
        <h3 className="text-lg sm:text-xl md:text-2xl  font-bold">
          {totalProfileVotes === 0
            ? "No Votes"
            : totalProfileVotes === 1
            ? "1 Vote"
            : `${totalProfileVotes} Votes`}
        </h3>
      </div>
      {votesList.map((vote, index) => (
        <div
          key={index}
          className="bg-[#141e388e] hover:bg-[#141e38c2] border-2 rounded-xl transition duration-200 cursor-pointer"
          onClick={(e) => handleVoteClick(e)}
          id={
            vote.type === "question"
              ? vote.typeId
              : answersForQuestion.filter(
                  (answer) => answer.$id === vote.typeId
                )[0].questionId
          }
        >
          <ProfileVotesContainer vote={vote} />
        </div>
      ))}
      <div className="flex justify-center gap-4 items-center my-4">
        <Pagination type="profile-votes" />
      </div>
    </div>
  );
}

export default profileVotes;
