"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function MarkdownEditor() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
}
