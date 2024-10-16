"use client";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { User } from "../../types/info";
import useAuthStore from "../../../zustand/userStore";
import { supabase } from "@/lib/supabaseClient";
import { getSession, login } from "@/utils/supabase/supabaseApi";

const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export default function LoginPage() {
  const { setAccessToken, setUserId, setUserName, setNickname, setIsLoggedIn, setProfile_img } = useAuthStore();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();

  /** 로그인 */
  const handleLogin = async (value: FieldValues) => {
    try {
      const response = await login(loginSchema.parse(value));

      if (response.error) {
        throw new Error(response.error);
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
            setProfile_img(
              userData.profile_img ??
                "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/sign/user_profile/default_img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VyX3Byb2ZpbGUvZGVmYXVsdF9pbWcucG5nIiwiaWF0IjoxNzI4OTMzOTg3LCJleHAiOjE3NjA0Njk5ODd9.zkJMRvGI8vpWKsR1c5nskb88fibWo_uM_lzQJzfZVbk&t=2024-10-14T19%3A26%3A28.430Z"
            );
          } else {
            console.log(userError);
          }
        }

        router.push("/");
      }
    } catch (error) {
      console.log("로그인 오류 발생 : ", error);
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-lvh gap-6">
      <h2 className="font-extrabold	text-3xl text-gray-500">환영합니다!</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5 w-96">
        <input placeholder="이메일" {...register("email")} className="border-solid	border-2 h-12 pl-2  rounded-lg" />
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
          className="border-solid	border-2 h-12 pl-2  rounded-lg"
        />
        <button type="submit" className="border-solid	border-2 h-12 pl-2 text-white	bg-black font-bold rounded-lg	">
          로그인
        </button>
      </form>
    </div>
  );
}
