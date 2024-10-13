"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData) {
  console.log("formData :>> ", formData);
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
    // email: formData.get("email") as string,
    // password: formData.get("password") as string,
    options: {
      data: {
        user_name: formData.name,
        profile_img: "test url",
        nickname: formData.nickname,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  console.log("error :>> ", error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// export async function login(formData: FormData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signInWithPassword(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }
