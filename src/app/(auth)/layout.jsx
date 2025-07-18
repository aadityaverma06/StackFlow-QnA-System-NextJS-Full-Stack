"use client";

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
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
    [session, router]
  );

  if (session) return;

  if (!session) {
    return (
      <div>
        <div>{children}</div>
      </div>
    );
  }
};

export default Layout;
