"use client";

import { useAuthStore } from "@/store/Auth";
import React, { useEffect, useState} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

function signup() {
  const { createAccount } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (
      user.firstName.length > 0 &&
      user.lastName.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);


  const handlePasswordVisibilityToggle = () => {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else {
      setIsPasswordVisible(true);
    }
  };

  const onSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return { success: false, message: "All fields are required" };
    }

    try {
      setIsProcessing(true);
      const signupResponse = await createAccount(
        firstName + " " + lastName,
        email.toString(),
        password.toString()
      );
      if (signupResponse?.error) {
        toast.error(signupResponse?.error?.message);
        return;
      }
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-8 ">
      <h1 className="max-w-md text-center">
        <span className="text-5xl bg-gradient-to-r from-[#8E2DE2] to-[#4a00e0] bg-clip-text text-transparent font-bold">
          {isProcessing ? "Processing..." : "Signup"}
        </span>
      </h1>
      <form
        onSubmit={onSignup}
        className="grid grid-cols-[1fr_10%] gap-y-10 gap-x-2 text-xl py-8 pl-8 pr-4 rounded-2xl"
        style={{ boxShadow: "0px 0px 15px rgba(248, 250, 252, 0.4)" }}
      >
        <div className="flex flex-col gap-4 col-start-1 row-start-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            placeholder="First Name"
            id="firstName"
            value={user.firstName}
            name="firstName"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-4 col-start-1 row-start-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-4 col-start-1 row-start-3">
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
        <div className="flex flex-col gap-4 col-start-1 row-start-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="col-start-2 row-start-4 flex items-end">
                  <button
                    onClick={handlePasswordVisibilityToggle}
                    className="cursor-pointer opacity-50 hover:opacity-100"
                    type="button"
                  >
                    {isPasswordVisible ? (
                      <IconEyeOff size={28} />
                    ) : (
                      <IconEye size={28} />
                    )}
                  </button>
                </div>
        
        <div className="col-start-1 row-start-5">
          <Button
            type="submit"
            variant="default"
            disabled={disabled}
            className="bg-[#4a00e0] hover:bg-[#4a00e0]/90"
          >
            Signup
          </Button>
        </div>
        <div className="col-start-1 row-start-6">
          <Button
            type="button"
            variant="default"
            className="bg-[#6e35cb] hover:bg-[#6e35cb]/80"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default signup;
