"use client";

import MagicCardContainerProfile from "@/components/custom/MagicCardContainerProfile";
import React from "react";

function profileSummary() {
  return (
    <div className="flex gap-4 pt-4">
      <MagicCardContainerProfile
        title="Reputation"
        value="2"
      />
      <MagicCardContainerProfile
        title="Questions Asked"
        value="0"
      />
      <MagicCardContainerProfile
        title="Answers Given"
        value="1"
      />
    </div>
  );
}

export default profileSummary;
