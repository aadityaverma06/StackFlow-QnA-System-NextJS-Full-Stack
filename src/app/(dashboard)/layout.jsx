"use client";

import useUserListStore from "@/store/UserList";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

function layout({ children }) {
  const { usersList, setUsersList } = useUserListStore();

  useEffect(() => {
    async function fetchUsers() {
      try {
        let userList = await axios.get("/api/users");
        if (userList.data.error) {
          toast.error(userList.data.error);
          return;
        }
        userList = userList.data.users;
        setUsersList(userList);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchUsers();
  }, []);
  if (usersList.length === 0) return;
  return <>{children}</>;
}

export default layout;
