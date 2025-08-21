"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import useMarkdownEditorValueStore from "@/store/MarkdownEditorValue";

export default function MarkdownEditor() {
  const { value, setValue } = useMarkdownEditorValueStore();
  return (
    <div className="container">
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
}
