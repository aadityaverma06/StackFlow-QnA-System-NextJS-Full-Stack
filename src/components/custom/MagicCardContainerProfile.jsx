"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";
function MagicCardContainerProfile(props) {
  const { resolvedTheme } = useTheme();
  return (
    <MagicCard
      gradientColor={resolvedTheme === "dark" ? "#262626" : "#D9D9D955"}
      className="grid grid-cols-1 grid-rows-[auto_1fr] h-max lg:h-full rounded-xl p-2 md:p-4 w-full "
    >
      <h1 className=" text-base sm:text-lg lg:text-2xl row-start-1 text-center text-yellow-600 font-bold">
        {props.title}
      </h1>
      <h2 className=" text-lg sm:text-xl md:text-2xl lg:text-4xl row-start-2 flex justify-center items-center md:py-8 font-bold text-purple-500">
        {props.value}
      </h2>
    </MagicCard>
  );
}

export default MagicCardContainerProfile;
