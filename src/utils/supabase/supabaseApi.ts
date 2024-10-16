"use server";

import { createClient } from "@/utils/supabase/server";

interface User {
  email: string;
  password: string;
  name: string;
  nickname: string;
}
export async function signup(formData: User) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        user_name: formData.name,
        profile_img:
          "https://mjhcmaqftsbfevquhyqc.supabase.co/storage/v1/object/sign/user_profile/default_img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VyX3Byb2ZpbGUvZGVmYXVsdF9pbWcucG5nIiwiaWF0IjoxNzI4OTMzOTg3LCJleHAiOjE3NjA0Njk5ODd9.zkJMRvGI8vpWKsR1c5nskb88fibWo_uM_lzQJzfZVbk&t=2024-10-14T19%3A26%3A28.430Z",
        nickname: formData.nickname
      }
    }
  });

  if (error) {
    return { error: error.message };
  }
  // 회원가입 후 세션을 종료하여 자동 로그인 방지
  await supabase.auth.signOut();

  return { data };
}

interface LoginUser {
  email: string;
  password: string;
}

export async function login(formData: LoginUser) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getSession() {
  const supabase = createClient();
  return await supabase.auth.getSession();
}

export async function logout() {
  const supabase = createClient();
  return await supabase.auth.signOut();
}
