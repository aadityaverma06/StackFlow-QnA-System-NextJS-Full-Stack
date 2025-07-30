import {
  IconHome,
  IconLogout,
  IconMessageQuestion,
  IconUser,
} from "@tabler/icons-react";

export const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/home",
  },

  {
    title: "Questions",
    icon: (
      <IconMessageQuestion className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/questions",
  },
  {
    title: "Profile",
    icon: (
      <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/profile-summary",
  },
  {
    title: "Logout",
    icon: (
      <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
];
