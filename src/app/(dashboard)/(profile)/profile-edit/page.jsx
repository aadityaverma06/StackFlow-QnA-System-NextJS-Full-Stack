import { Input } from "@/components/ui/inputAceternity";
import { Label } from "@/components/ui/label";
import React from "react";

function profileEdit() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Edit Profile Details</h1>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 w-max">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Enter Updated Name"
            id="name"
            className="text-xl"
          />
        </div>
        <div className="flex flex-col gap-4 w-max">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter Updated Email"
            id="email"
            className="text-xl"
          />
        </div>
        <button className="col-start-2 rounded-lg text-lg bg-amber-600 text-foreground hover:bg-amber-700 font-bold cursor-pointer py-2 w-max px-8">
          Update
        </button>
      </form>
    </div>
  );
}

export default profileEdit;
