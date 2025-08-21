import { create } from "zustand";

const useAnswerDataStore = create((set) => ({
  answerAuthorReputation: null,
  setAnswerAuthorReputation: (answerAuthorReputation) =>
    set({ answerAuthorReputation }),

  answerCommentSubmit: false,
  setAnswerCommentSubmit: (answerCommentSubmit) => set({ answerCommentSubmit }),

  answerSubmit: false,
  setAnswerSubmit: (answerSubmit) => set({ answerSubmit }),
}));

export default useAnswerDataStore;