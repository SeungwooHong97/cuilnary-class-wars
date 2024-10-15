import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./utils/supabase/supabaseApi";

export async function middleware(request: NextRequest) {
  const response = await getSession();

  if (response.data.session) {
    console.log("로그인 상태! 접근 불가능");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

/** 어떤 페이지에서 이 미들웨어를 실행할거니 */
export const config = {
  matcher: ["/login", "/signUp"]
};
