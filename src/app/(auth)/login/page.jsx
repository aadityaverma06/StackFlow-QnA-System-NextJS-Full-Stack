"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/Auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

function login() {
  const { login } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("All fields are required");
      return { success: false, message: "All fields are required" };
    }

    try {
      setIsProcessing(true);
      const loginResponse = await login(email.toString(), password.toString());
      if (loginResponse.error) {
        toast.error(loginResponse.error.message);
        return;
      }
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-8 ">
      <h1 className="max-w-md text-center">
        <span className="text-5xl bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0] bg-clip-text text-transparent font-bold">
          {isProcessing ? "Processing..." : "Login"}
        </span>
      </h1>
      <form
        onSubmit={onLogin}
        className="flex flex-col gap-10 text-xl p-8 rounded-2xl"
        style={{ boxShadow: "0px 0px 15px rgba(248, 250, 252, 0.4)" }}
      >
        <div className="authformiputs">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email Id"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="authformiputs">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          disabled={disabled}
          className="bg-[#4a00e0] hover:bg-[#4a00e0]/90"
        >
          Login
        </Button>
        <Button
          type="button"
          variant="default"
          className="bg-[#6e35cb] hover:bg-[#6e35cb]/80"
          onClick={() => router.push("/signup")}
        >
          Signup
        </Button>
      </form>
    </div>
  );
}

export default login;
