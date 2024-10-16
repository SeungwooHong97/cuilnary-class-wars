"use client";

import useAuthStore from "../../../zustand/userStore";
import Link from "next/link";
import { logout } from "@/utils/supabase/supabaseApi";

const Header = () => {
  const { isLoggedIn, setClearAuth } = useAuthStore();

  const handleSignOut = async () => {
    logout();
    setClearAuth();
  };

  return (
    <header className="shadow-md w-full top-0 fixed z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between">
        <Link href={"/"} className="hover:underline font-bold">
          홈
        </Link>

        {isLoggedIn ? (
          <>
            <Link href={"/myPage"} className="hover:underline font-bold">
              마이 페이지
            </Link>
            <button onClick={handleSignOut}>로그아웃</button>
          </>
        ) : (
          <div className="flex gap-10">
            <Link href={"/login"} className="hover:underline font-bold">
              로그인
            </Link>

            <Link href={"/signUp"} className="hover:underline font-bold">
              회원가입
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
