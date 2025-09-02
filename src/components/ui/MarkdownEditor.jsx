"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import useMarkdownEditorValueStore from "@/store/MarkdownEditorValue";
import { cn } from "@/utils/cn";

export default function MarkdownEditor({ className }) {
  const { value, setValue } = useMarkdownEditorValueStore();
  return (
    <div className={cn("container", className)}>
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
}
