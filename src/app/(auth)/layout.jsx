"use client";

import { useAuthStore } from "@/store/Auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { session } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const redirectUrl = useSearchParams()?.get("redirectUrl");
  const question = useSearchParams()?.get("question");
  useEffect(() => {
    if (pathname != "/logout") {
      if (session) {
        if (redirectUrl && question) {
          router.push(`/question/${decodeURIComponent(redirectUrl)}`);
        } else if (redirectUrl && !question) {
          router.push(decodeURIComponent(`/${redirectUrl}`));
        } else {
          router.push("/home");
        }
      }
    }
  }, [session, router]);

  if (pathname != "/logout") {
    if (session) {
      return;
    }
  }

  if (!session || pathname == "/logout") {
    return (
      <div>
        <div>{children}</div>
      </div>
    );
  }
};

export default Layout;
