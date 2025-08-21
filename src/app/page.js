"use client";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useAuthStore } from "@/store/Auth";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)] justify-between gap-8">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center max-w-sm">
        <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center mb-10 pl-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0]">
              Welcome to StackFlow QnA System
            </span>
          </h1>
        </div>

        <ol className="list-outside list-disc text-base/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-8 pl-6 space-y-6">
          <li className="tracking-[-.01em]">
            Get started by logging into your account.
          </li>
          <li className="tracking-[-.01em]">
            Or create a new one if not an existing user.
          </li>
          <li className="tracking-[-.01em]">You can also casually explore.</li>
        </ol>
        {user ? (
          <div className="flex gap-4 items-center flex-col sm:flex-row sm:justify-between w-full">
            <Link href="/home" className="w-max">
              <InteractiveHoverButton className="py-[12px]">
                Explore Now
              </InteractiveHoverButton>
            </Link>
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center text-white bg-gradient-to-r bg-clip-padding from-[#6c17b7] to-[#4a00e0] gap-2 hover:bg-gradient-to-r hover:from-[#8d2de2ba] hover:to-[#4b00e0b2] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-max"
              href="/logout"
            >
              <Image
                className="dark:invert"
                src="/login.svg"
                alt="Login logomark"
                width={20}
                height={20}
              />
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center flex-col sm:flex-row justify-between">
            <Link href="/home" className="w-max">
              <InteractiveHoverButton className="py-[12px]">
                Explore Now
              </InteractiveHoverButton>
            </Link>
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center text-white bg-gradient-to-r bg-clip-padding from-[#6c17b7] to-[#4a00e0] gap-2 hover:bg-gradient-to-r hover:from-[#8d2de2ba] hover:to-[#4b00e0b2] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-max"
              href="/login"
            >
              <Image
                className="dark:invert"
                src="/login.svg"
                alt="Login logomark"
                width={20}
                height={20}
              />
              Login
            </Link>
            <Link
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-max"
              href="/signup"
            >
              <Image
                className="dark:invert mr-1.5"
                src="/signup.svg"
                alt="Signuplogomark"
                width={20}
                height={20}
              />
              Signup
            </Link>
          </div>
        )}
      </main>
      <footer className="pr-4">
        © 2025 StackFlow QnA System. All rights reserved.
      </footer>
    </div>
  );
}
