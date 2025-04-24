"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/Auth";

function login() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { success: false, message: "All fields are required" };
    }

    setIsLoading(true);

    const loginResponse = await login(email.toString(), password.toString());

    if (loginResponse.error) {
      return {
        success: false,
        message: loginResponse.error.message,
      };
    }

    setIsLoading(false);
  };
  return <div>login</div>;
}

export default login;
