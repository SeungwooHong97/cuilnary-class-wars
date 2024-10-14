"use client";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signup } from "./actions";

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

  const handleSignUp = async (data: FieldValues) => {
    const response = await signup(signUpSchema.parse(data));
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
