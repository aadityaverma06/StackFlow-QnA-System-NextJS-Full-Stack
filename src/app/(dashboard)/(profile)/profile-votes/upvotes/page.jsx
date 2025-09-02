"use client";

import Pagination from "@/components/custom/Pagination";
import ProfileVotesContainer from "@/components/custom/ProfileVotesContainer";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import usePaginationStore from "@/store/Pagination";
import useUserListStore from "@/store/UserList";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function profileUpvotes() {
  const {
    upvotesList,
    totalProfileUpvotes,
    setTotalProfileUpvotesFetched,
    totalProfileUpvotesFetched,
  } = useLoggedInUserDetailsStore();
  const { limit, answersForQuestion } = usePaginationStore();
    const {
      setRefreshList} = useUserListStore();
      const router = useRouter();

  function handleUpvoteClick(e) {
    e.preventDefault();
    setRefreshList((prev) => !prev);
    router.push(`/question/${e.currentTarget.id}`);
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex justify-between">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
          {totalProfileUpvotes === 0
            ? "No Upvotes"
            : totalProfileUpvotes === 1
            ? "1 Upvote"
            : `${totalProfileUpvotes} Upvotes`}
        </h3>
      </div>
      {upvotesList.map((vote, index) => (
        <div
          key={index}
          className="bg-[#141e388e] hover:bg-[#141e38c2] border-2 rounded-xl transition duration-200 cursor-pointer"
          onClick={(e) => handleUpvoteClick(e)}
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
        <Pagination type="profile-upvotes" />
      </div>
    </div>
  );
}

export default profileUpvotes;
