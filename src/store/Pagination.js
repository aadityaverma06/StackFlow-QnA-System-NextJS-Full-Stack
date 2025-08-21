import { create } from "zustand";

const usePaginationStore = create((set) => ({
  questionsList: null,
  setQuestionsList: (questionsList) => set({ questionsList }),

  totalQuestions: null,
  setTotalQuestions: (totalQuestions) => set({ totalQuestions }),

  totalQuestionsFetched: 0,
  setTotalQuestionsFetched: (totalQuestionsFetched) =>
    set({ totalQuestionsFetched }),

  page: 1,
  setPage: (page) => set({ page }),

  isPreviousPageAvailable: true,
  setIsPreviousPageAvailable: (isPreviousPageAvailable) =>
    set({ isPreviousPageAvailable }),

  isNextPageAvailable: true,
  setIsNextPageAvailable: (isNextPageAvailable) => set({ isNextPageAvailable }),

  answersForQuestion: null,
  setAnswersForQuestion: (answersForQuestion) => set({ answersForQuestion }),

  votesForQuestion: null,
  setVotesForQuestion: (votesForQuestion) => set({ votesForQuestion }),

  limit: 1,
  switchPageForQuestions: false,
  setSwitchPageForQuestions: (switchPageForQuestions) =>
    set({ switchPageForQuestions }),

  switchPageForProfileQuestions: false,
  setSwitchPageForProfileQuestions: (switchPageForProfileQuestions) =>
    set({ switchPageForProfileQuestions }),

  switchPageForProfileAnswers: false,
  setSwitchPageForProfileAnswers: (switchPageForProfileAnswers) =>
    set({ switchPageForProfileAnswers }),

  switchPageForProfileVotes: false,
  setSwitchPageForProfileVotes: (switchPageForProfileVotes) =>
    set({ switchPageForProfileVotes }),
  switchPageForProfileUpvotes: false,
  setSwitchPageForProfileUpvotes: (switchPageForProfileUpvotes) =>
    set({ switchPageForProfileUpvotes }),

  switchPageForProfileDownvotes: false,
  setSwitchPageForProfileDownvotes: (switchPageForProfileDownvotes) =>
    set({ switchPageForProfileDownvotes }),
  reset: () =>
    set({
      page: 1,
      isPreviousPageAvailable: true,
      isNextPageAvailable: true,
      totalQuestionsFetched: 0,
    }),
}));

export default usePaginationStore;
