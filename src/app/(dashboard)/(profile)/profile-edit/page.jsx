"use client";

import { Input } from "@/components/ui/inputAceternity";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import useUserListStore from "@/store/UserList";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function profileEdit() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { updateNameAndEmail } = useAuthStore();
  const { setRefreshList } = useUserListStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  async function handleUpdatedDetails(e) {
    e.preventDefault();
    try {
      const updateResponse = await updateNameAndEmail(
        name.toString(),
        email.toString(),
        password.toString()
      );

      if (updateResponse?.error) {
        toast.error(updateResponse?.error?.message);
        return;
      }

      toast.success("Details Updated Successfully");
      setRefreshList((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  function handlePasswordVisibilityToggle() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else {
      setIsPasswordVisible(true);
    }
  }
  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">
        Edit Profile Details
      </h1>
      <form
        className="flex flex-col gap-4 sm:gap-8"
        onSubmit={(e) => {
          handleUpdatedDetails(e);
        }}
      >
        <div className="flex flex-col gap-4 w-max">
          <Label
            htmlFor="name"
            className="text-base sm:text-lg md:text-xl font-bold text-amber-600"
          >
            Name
          </Label>
          <Input
            type="text"
            placeholder="Enter Updated Name"
            id="name"
            className="text-base sm:text-lg md:text-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {" "}
            <div className="flex flex-col gap-4 sm:gap-4 w-max">
              <Label
                htmlFor="email"
                className="text-base sm:text-lg md:text-xl font-bold text-amber-600"
              >
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter Updated Email"
                id="email"
                className="text-base sm:text-lg md:text-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-4 w-max">
              <Label
                htmlFor="password"
                className="text-base sm:text-lg md:text-xl font-bold text-amber-600"
              >
                Password
              </Label>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Current Password"
                id="password"
                className="text-base sm:text-lg md:text-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex flex-col self-end pb-2">
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
        </div>
        <button
          type="submit"
          className="col-start-2 rounded-md md:rounded-lg text-sm md:text-base lg:text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer py-1 px-4 w-max md:py-2 md:px-8"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default profileEdit;
