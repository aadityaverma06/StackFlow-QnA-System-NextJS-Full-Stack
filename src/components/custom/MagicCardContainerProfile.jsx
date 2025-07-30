"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";
function MagicCardContainerProfile(props) {
  const { resolvedTheme } = useTheme();
  return (
    <MagicCard
      gradientColor={resolvedTheme === "dark" ? "#262626" : "#D9D9D955"}
      className="grid grid-cols-1 grid-rows-[auto_1fr] h-full rounded-xl p-4 w-full "
    >
      <h1 className="text-2xl row-start-1">{props.title}</h1>
      <h2 className="text-4xl row-start-2 flex justify-center items-center pt-8 pb-16">{props.value}</h2>
    </MagicCard>
  );
}

export default MagicCardContainerProfile;
