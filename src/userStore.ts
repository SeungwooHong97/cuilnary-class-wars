import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  userId: string;
  userName: string;
  nickname: string;
  isLoggedIn: boolean;
  setAccessToken: (token: string) => void;
  setUserId: (userId: string) => void;
  setUserName: (userName: string) => void;
  setNickname: (nickname: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setClearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      return {
        accessToken: "",
        userId: "",
        userName: "",
        nickname: "",
        isLoggedIn: false,
        setAccessToken: (token: string) => set({ accessToken: token }),
        setUserId: (userId: string) => set({ userId }),
        setUserName: (userName: string) => set({ userName }),
        setNickname: (nickname: string) => set({ nickname }),
        setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
        setClearAuth: () =>
          set({
            accessToken: "",
            userId: "",
            userName: "",
            nickname: "",
            isLoggedIn: false
          })
      };
    },
    { name: "userInfo" }
  )
);

export default useAuthStore;
