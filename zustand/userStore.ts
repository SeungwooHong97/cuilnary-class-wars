import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  userId: string;
  userName: string;
  nickname: string;
  isLoggedIn: boolean;
  profile_img: string;
  setAccessToken: (token: string) => void;
  setUserId: (userId: string) => void;
  setUserName: (userName: string) => void;
  setNickname: (nickname: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setProfile_img: (profile_img: string) => void;
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
        profile_img: "",
        isLoggedIn: false,
        setAccessToken: (token: string) => set({ accessToken: token }),
        setUserId: (userId: string) => set({ userId }),
        setUserName: (userName: string) => set({ userName }),
        setNickname: (nickname: string) => set({ nickname }),
        setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
        setProfile_img: (profile_img: string) => set({ profile_img }),
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
