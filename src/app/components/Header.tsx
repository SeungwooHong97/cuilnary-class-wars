"use client";

import useAuthStore from "../../../zustand/userStore";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const Header = () => {
  const { isLoggedIn, setClearAuth } = useAuthStore();
  const supabase = createClient();

  // TODO error 처리
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setClearAuth();
  };

  return (
    <header className="bg-[#fffff] shadow-md w-full top-0 fixed z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between">
        <Link href={"/"} className="hover:underline font-bold">
          홈
        </Link>

        <Link href={"/myPage"} className="hover:underline font-bold">
          마이 페이지
        </Link>
        {isLoggedIn ? (
          <>
            <button onClick={handleSignOut}>로그아웃</button>
          </>
        ) : (
          <>
            <Link href={"/login"} className="hover:underline font-bold">
              로그인
            </Link>

            <Link href={"/signUp"} className="hover:underline font-bold">
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
