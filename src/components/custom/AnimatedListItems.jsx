"use client";

import { cn } from "@/utils/cn";
import { AnimatedList } from "@/components/magicui/animated-list";
import dateFormatter from "@/utils/dateFormatter";
import { IconUserFilled } from "@tabler/icons-react";

let notificationContainerHeight = "595px";
const Notification = ({ Name, Reputation, lastUpdated, color, icon }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden xs:hidden lg:flex lg:flex-col xl:hidden lg:overflow-hidden">
          <div className="flex flex-col items-start">
            <div className="order-1 whitespace-pre text-lg font-medium dark:text-white">
              <span className="text-sm sm:text-lg">{Name}</span>
            </div>
            <div className="order-3 whitespace-pre text-lg font-medium dark:text-white">
              <span className="text-xs text-yellow-400">{`Updated ${lastUpdated}`}</span>
            </div>
            <div className="order-2">
              <p className="text-sm dark:text-white/60">
                Reputation:{" "}
                <span className="text-purple-500 font-bold">{Reputation}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden xs:flex xs:flex-col xs:overflow lg:hidden xl:flex xl:flex-col xl:overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{Name}</span>
            <span className="mx-1">·</span>
            <span className="text-sm text-yellow-400">{`Updated ${lastUpdated}`}</span>
          </figcaption>
          <p className="text-sm dark:text-white/60">
            Reputation:{" "}
            <span className="text-purple-500 font-bold">{Reputation}</span>
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListItems({ className, items }) {
  const colors = [
    "#C71585",
    "#4B2E83",
    "#c79000",
    "#0a82c7",
    "#169132",
    "#CC4629",
  ];
  const notifications = items
    .sort((a, b) => a.prefs.reputation - b.prefs.reputation)
    .slice(0, 6)
    .map((user, index) => {
      const formattedDate = dateFormatter(user.$updatedAt);
      return {
        Name: user.name,
        Reputation: user.prefs.reputation,
        lastUpdated: formattedDate.replace("about", "").trim(),
        icon: <IconUserFilled size={25} />,
        color: colors[index],
      };
    });
  return (
    <div
      className={cn(
        "relative flex h-[var(--notification-height)] w-max flex-col overflow-hidden p-2 border rounded-lg bg-gray-800/30",
        className
      )}
      style={{
        "--notification-height": notificationContainerHeight,
      }}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
