"use client";

import { useAuthStore } from "@/store/Auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function logout() {
  const { logout, session } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [heading, setHeading] = useState("Processing...");
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    async function logoutUser() {
      try {
        setIsProcessing(true);
        if (!session) {
          setHeading("You are not logged in !");
          return;
        }
        await logout();
        setHeading("Logged out successfully");
      } catch (error) {
        toast.error(error.message);
        setHeading("Error logging out");
      } finally {
        setIsProcessing(false);
      }
    }
    logoutUser();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev < 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      router.push("/home");
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-12">
      <h1 className="text-center border-4 rounded-xl p-8 border-gray-700 ">
        <span className="text-5xl xs:text-6xl bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0] bg-clip-text text-transparent font-bold">
          {isProcessing ? "Processing..." : heading}
        </span>
      </h1>
      <h2 className="text-xl xs:text-2xl">
        You will be redirected to Home in{" "}
        {countdown > 1 ? `${countdown} Seconds` : `${countdown} Second`}
      </h2>
    </div>
  );
}

export default logout;
