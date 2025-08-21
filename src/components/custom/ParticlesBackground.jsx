"use client";

import { useTheme } from "next-themes";

import { Particles } from "@/components/magicui/particles";

function ParticlesBackground({ quantity = 1000 }) {
  const { resolvedTheme } = useTheme();

  const color = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <Particles
      className="absolute inset-0 z-0"
      quantity = {quantity}
      ease={80}
      color={color}
    />
  );
}

export default ParticlesBackground;
