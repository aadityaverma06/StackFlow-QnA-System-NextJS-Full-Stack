import { create } from "zustand";

const useUserListStore = create((set) => ({
  usersList: [],
  setUsersList: (usersList) => set({usersList}),
}));

export default useUserListStore;
