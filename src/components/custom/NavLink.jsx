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
          "w-max bg-[#0f182e] md:bg-[#141e38] text-foreground rounded-sm md:rounded-lg px-2 py-1 md:px-4 md:py-2 hover:bg-[#141e38ad]"
      )}
    >
      {children}
    </Link>
  );
}
