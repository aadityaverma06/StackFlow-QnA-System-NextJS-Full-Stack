"use client";

import { useTheme } from "next-themes";

import { Particles } from "@/components/magicui/particles";
import { cn } from "@/utils/cn";

function ParticlesBackground({ quantity = 1000, answersLength, className }) {
  const { resolvedTheme } = useTheme();
  cn;

  const color = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <Particles
      className={cn(className, "absolute inset-0 z-0")}
      quantity={quantity}
      ease={80}
      color={color}
      answersLength={answersLength}
    />
  );
}

export default ParticlesBackground;
