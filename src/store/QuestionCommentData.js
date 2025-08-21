import { create } from "zustand";

const useQuestionCommentDataStore = create((set) => ({
  questionCommentSubmit: false,
  setQuestionCommentSubmit: (questionCommentSubmit) =>
    set({ questionCommentSubmit }),
}));

export default useQuestionCommentDataStore;
