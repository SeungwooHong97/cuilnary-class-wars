"use client";

import useAuthStore from "../../../zustand/userStore";
import Link from "next/link";
import { logout } from "@/utils/supabase/supabaseApi";
import ChefLogo from "../../../public/icons/chef-hat-svgrepo-com.svg";

const Header = () => {
  const { isLoggedIn, setClearAuth } = useAuthStore();

  const handleSignOut = async () => {
    await logout(); // 로그아웃 처리
    setClearAuth(); // 상태 초기화
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <ChefLogo className="w-10 h-10 cursor-pointer"></ChefLogo>
        </Link>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link href="/myPage" className="text-black text-lg hover:text-gray-700">
                마이 페이지
              </Link>
              <button onClick={handleSignOut} className="text-black text-lg hover:text-gray-700">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-black text-lg hover:text-gray-700">
                로그인
              </Link>
              <Link href="/signUp" className="text-black text-lg hover:text-gray-700">
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
