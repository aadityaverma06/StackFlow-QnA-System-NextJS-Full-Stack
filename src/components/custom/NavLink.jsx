"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export function NavLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        className,
        isActive &&
          "w-max bg-[#141e38] text-foreground rounded-lg px-4 py-2 hover:bg-[#141e38ad]"
      )}
    >
      {children}
    </Link>
  );
}
