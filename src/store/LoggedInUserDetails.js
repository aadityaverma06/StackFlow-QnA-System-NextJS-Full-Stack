import { Vote } from "lucide-react";
import { create } from "zustand";

const useLoggedInUserDetailsStore = create((set) => ({
  totalProfileQuestions: null,
  setTotalProfileQuestions: (totalProfileQuestions) =>
    set({ totalProfileQuestions }),

  totalProfileAnswers: null,
  setTotalProfileAnswers: (totalProfileAnswers) => set({ totalProfileAnswers }),

  totalProfileVotes: null,
  setTotalProfileVotes: (totalProfileVotes) => set({ totalProfileVotes }),

  totalProfileAnswersFetched: 0,
  setTotalProfileAnswersFetched: (totalProfileAnswersFetched) =>
    set({ totalProfileAnswersFetched }),

  answersList: null,
  setAnswersList: (answersList) => set({ answersList }),

  votesList: null,
  setVotesList: (votesList) => set({ votesList }),

  totalProfileVotesFetched: 0,
  setTotalProfileVotesFetched: (totalProfileVotesFetched) =>
    set({ totalProfileVotesFetched }),

  answerVotesDetails: null,
  setAnswerVotesDetails: (answerVotesDetails) => set({ answerVotesDetails }),

  questionVotesDetails: null,
  setQuestionVotesDetails: (questionVotesDetails) =>
    set({ questionVotesDetails }),

  allVotes: null,
  setAllVotes: (allVotes) => set({ allVotes }),

  upvotesList: null,
  setUpvotesList: (upvotesList) => set({ upvotesList }),

  downvotesList: null,
  setDownvotesList: (downvotesList) => set({ downvotesList }),

  totalProfileUpvotes: null,
  setTotalProfileUpvotes: (totalProfileUpvotes) => set({ totalProfileUpvotes }),

  totalProfileDownvotes: null,
  setTotalProfileDownvotes: (totalProfileDownvotes) =>
    set({ totalProfileDownvotes }),

  totalProfileUpvotesFetched: 0,
  setTotalProfileUpvotesFetched: (totalProfileUpvotesFetched) =>
    set({ totalProfileUpvotesFetched }),

  totalProfileDownvotesFetched: 0,
  setTotalProfileDownvotesFetched: (totalProfileDownvotesFetched) =>
    set({ totalProfileDownvotesFetched }),

  questionAuthorReputation: null,
  setQuestionAuthorReputation: (questionAuthorReputation) =>
    set({ questionAuthorReputation }),

  questionForAnswers: null,
  setQuestionForAnswers: (questionForAnswers) => set({ questionForAnswers }),

  resetProfile: () =>
    set({
      totalProfileAnswersFetched: 0, totalProfileDownvotesFetched: 0, totalProfileUpvotesFetched: 0,
      totalProfileVotesFetched: 0,

    }),
}));

export default useLoggedInUserDetailsStore;
