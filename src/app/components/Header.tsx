import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white-700 shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between">
        <Link href={"/"} className="hover:underline font-bold">
          홈
        </Link>
        <Link href={"/login"} className="hover:underline font-bold">
          로그인
        </Link>

        <Link href={"/signUp"} className="hover:underline font-bold">
          회원가입
        </Link>

        <Link href={"/chefDetail"} className="hover:underline font-bold">
          셰프 상세
        </Link>


        <Link href={"/chefDetail/restaurantDetail"} className="hover:underline font-bold">
            가게 상세
        </Link>

        <Link href={"/myPage"} className="hover:underline font-bold">
            마이 페이지
        </Link>
      </nav>
    </header>
  );
};

export default Header;
