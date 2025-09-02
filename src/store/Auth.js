import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ID } from "appwrite";

import { account } from "@/models/client/config";

export const useAuthStore = create()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = account.getSession("current");
          set({ session });
        } catch (error) {
          console.log(error);
          return { success: false, error };
        }
      },

      async login(email, password) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );

          const [user, { jwt }] = await Promise.all([
            account.get(),
            account.createJWT(),
          ]);

          if (!user.prefs?.reputation) {
            await account.updatePrefs({
              reputation: 0,
            });
          }

          set({ session, jwt, user });
        } catch (error) {
          console.log(error);
          return { success: false, error };
        }
      },

      async createAccount(name, email, password) {
        try {
          await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false, error };
        }
      },

      async updateNameAndEmail(name, email, password) {
        try {
          if (name) await account.updateName(name);
          if (email) await account.updateEmail(email, password);
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false, error };
        }
      },

      async updatePassword(password) {
        try {
          await account.updatePassword(password);
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false, error };
        }
      },
      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.log(error);
          return { success: false, error };
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
