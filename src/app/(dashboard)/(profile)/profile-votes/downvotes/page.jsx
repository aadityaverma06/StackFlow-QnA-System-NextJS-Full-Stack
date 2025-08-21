"use client";

import Pagination from "@/components/custom/Pagination";
import ProfileVotesContainer from "@/components/custom/ProfileVotesContainer";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import usePaginationStore from "@/store/Pagination";
import React, { useEffect } from "react";

function profileDownvotes() {
  const {
    downvotesList,
    totalProfileDownvotes,
    setTotalProfileDownvotesFetched,
    totalProfileDownvotesFetched,
  } = useLoggedInUserDetailsStore();
  const { limit } = usePaginationStore();


  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">
          {totalProfileDownvotes === 0
            ? "No Downvotes"
            : totalProfileDownvotes === 1
            ? "1 Vote"
            : `${totalProfileDownvotes} Votes`}
        </h3>
      </div>
      {downvotesList.map((vote, index) => (
        <div
          key={index}
          className="bg-[#141e388e] hover:bg-[#141e38c2] border-2 rounded-xl transition duration-200 cursor-pointer"
        >
          <ProfileVotesContainer vote={vote} />
        </div>
      ))}
      <div className="flex justify-center gap-4 items-center mt-4">
        <Pagination type="profile-downvotes" />
      </div>
    </div>
  );
}

export default profileDownvotes;
