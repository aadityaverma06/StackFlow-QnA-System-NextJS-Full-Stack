import { create } from "zustand";

const useUserListStore = create((set) => ({
  usersList: [],
  setUsersList: (usersList) => set({ usersList }),

  refreshList: false,
  setRefreshList: (refreshList) => set({ refreshList }),
}));

export default useUserListStore;
