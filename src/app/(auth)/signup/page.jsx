"use client";

import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

function signup() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!firstName || !lastName || !email || !password) {
      return { success: false, message: "All fields are required" };
    }

    setIsLoading(true);
    setError("");

    const signupResponse = await createAccount(
      firstName + " " + lastName,
      email.toString(),
      password.toString()
    );

    if (signupResponse.error) {
      return {
        success: false,
        message: signupResponse.error.message,
      };
    }

    const LoginResponse = await login(email.toString(), password.toString());

    if (LoginResponse.error) {
      return {
        success: false,
        message: LoginResponse.error.message,
      };
    }

    setIsLoading(false);
  };
  return (
    <div>
        <form onSubmit={onSignup}>

        </form>
    </div>
  );
}

export default signup;
