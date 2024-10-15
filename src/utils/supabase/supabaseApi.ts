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
        profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s",
        nickname: formData.nickname
      }
    }
  });

  if (error) {
    return { error: error.message };
  }

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
