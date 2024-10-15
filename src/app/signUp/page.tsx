"use client";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signup } from "@/utils/supabase/supabaseApi";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "이메일을 입력해주세요."
    })
    .email({
      message: "이메일 제대로 입력해주세요."
    }),
  password: z.string().min(6, {
    message: "비밀번호는 6자 이상이어야 합니다."
  }),
  name: z.string().min(1, {
    message: "이름을 입력해주세요."
  }),
  nickname: z.string().min(1, {
    message: "닉네임을 입력해주세요."
  })
});

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signUpSchema)
  });

  const router = useRouter();

  const handleSignUp = async (value: FieldValues) => {
    const { error } = await signup(signUpSchema.parse(value));

    /* 
    오류가 발생하면 오류메세지가.. 
    서버 컴포넌트에서 클라이언트 컴포넌트로 전달할 수 있는 것은 
    일반 객체와 몇 가지 내장 객체뿐입니다. 
    클래스나 널 프로토타입은 지원되지 않습니다. 
    */

    if (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } else {
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-lvh gap-3">
      <h2>Culinary War Store</h2>
      <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-5 w-6/12">
        <input placeholder="이메일" {...register("email")} className="border-solid	border-2" />
        {errors.email && <p>{String(errors.email.message)}</p>}

        <input type="password" placeholder="비밀번호" {...register("password")} className="border-solid	border-2" />
        {errors.password && <p>{String(errors.password.message)}</p>}

        <input type="text" placeholder="이름" {...register("name")} className="border-solid	border-2" />
        {errors.name && <p>{String(errors.name.message)}</p>}

        <input type="text" placeholder="닉네임" {...register("nickname")} className="border-solid	border-2" />
        {errors.nickname && <p>{String(errors.nickname.message)}</p>}

        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 계정이 있으신가요? <Link href={"/login"}>로그인</Link>{" "}
      </p>
    </div>
  );
}
