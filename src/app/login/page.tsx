"use client";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { User } from "../../types/info";
import { login } from "./actions";
import useAuthStore from "../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { getSession } from "@/utils/supabase/supabaseApi";

const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export default function LoginPage() {
  const { nickname, setAccessToken, setUserId, setUserName, setNickname, setIsLoggedIn } = useAuthStore();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();

  /** 로그인 */
  const handleLogin = async (value: FieldValues) => {
    const { error } = await login(loginSchema.parse(value));

    if (error) {
      alert("오류가 발생했습니다.");
    } else {
      const { data } = await getSession();

      setAccessToken(data.session?.access_token ?? "");
      setUserId(data.session?.user.id ?? "");
      setIsLoggedIn(true);

      // db에서 사용자 정보 가져와서 setUserNake,setNickName(바뀌는 정보)
      if (data.session !== null) {
        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("user_name, nickname")
          .eq("id", data.session?.user.id)
          .single<User>();

        if (userData) {
          setUserName(userData.user_name ?? "");
          setNickname(userData.nickname ?? "");
        } else {
          console.log(userError);
        }
      }

      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-lvh gap-3">
      <h2>Culinary War Store</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5 w-6/12">
        <input placeholder="이메일" {...register("email")} className="border-solid	border-2" />
        <input type="password" placeholder="비밀번호" {...register("password")} className="border-solid	border-2" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
