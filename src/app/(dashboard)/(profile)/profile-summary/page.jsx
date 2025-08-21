"use client";

import MagicCardContainerProfile from "@/components/custom/MagicCardContainerProfile";
import { useAuthStore } from "@/store/Auth";

import useLoggedInUserDetailsStore from "@/store/LoggedInUserDetails";
import usePaginationStore from "@/store/Pagination";
import useUserListStore from "@/store/UserList";
import React from "react";

function profileSummary() {
  const { user } = useAuthStore();
  const { totalProfileQuestions, totalProfileAnswers} = useLoggedInUserDetailsStore();
  const { usersList } = useUserListStore();
  const currentUser = usersList.find(
    (currentUser) => currentUser.$id === user.$id
  );

  return (
    <div className="flex gap-4 pt-4">
      <MagicCardContainerProfile
        title="Reputation"
        value={currentUser.prefs.reputation}
      />
      <MagicCardContainerProfile
        title="Questions Asked"
        value={totalProfileQuestions}
      />
      <MagicCardContainerProfile title="Answers Given" value={totalProfileAnswers} />
    </div>
  );
}

export default profileSummary;
