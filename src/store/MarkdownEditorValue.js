import { create } from "zustand";

const useMarkdownEditorValueStore = create((set) => ({
  value: "",
  setValue: (value) => set({value}),
}));

export default useMarkdownEditorValueStore;
