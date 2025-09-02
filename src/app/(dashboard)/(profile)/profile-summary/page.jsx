"use client";

import MagicCardContainerProfile from "@/components/custom/MagicCardContainerProfile";
import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import React from "react";

function profileSummary() {
  const { userReputation, userAnswersGiven, userQuestionsAsked } =
    useLoggedInUserDetailsStore();

  return (
    <div className="pl-2 md:pl-0 flex flex-col lg:justify-center lg:items-center w-full h-full md:flex-row gap-4 pt-2 md:pt-4 text-xs sm:text-sm md:text-base lg:text-lg">
      <MagicCardContainerProfile title="Reputation" value={userReputation} />
      <MagicCardContainerProfile
        title="Questions Asked"
        value={userQuestionsAsked}
      />
      <MagicCardContainerProfile
        title="Answers Given"
        value={userAnswersGiven}
      />
    </div>
  );
}

export default profileSummary;
