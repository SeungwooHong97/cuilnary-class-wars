"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// TODO 회원가입, 로그인 파일이랑 합치기

interface User {
  email: string;
  password: string;
}

export async function login(formData: User) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  });

  if (error) {
    redirect("/error");
  }

  /** NOTE 로그인하고 여기서 바로? */
  return await supabase.auth.getSession();
}
