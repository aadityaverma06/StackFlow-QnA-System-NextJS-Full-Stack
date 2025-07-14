"use client";

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { session } = useAuthStore();
  const router = useRouter();
  useEffect(
    () => {
      if (session) {
        router.push("/");
      }
    },
    [session],
    [router]
  );

  if (session) return;

  if (!session) {
    return (
      <div className="">
        <div className="">{children}</div>
      </div>
    );
  }
};

export default Layout;
