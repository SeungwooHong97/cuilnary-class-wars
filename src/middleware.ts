import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  await updateSession(request);

  const serverClient = createClient();

  /** auth 모듈이 회원가입과 동시에 자동으로 로그인 세션을 생성하고있어서 문제임 */
  const {
    data: { user }
  } = await serverClient.auth.getUser();

  console.log("middleware user :>> ", user);

  const isLogin = !!user;

  if (isLogin && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signUp"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLogin && request.nextUrl.pathname.startsWith("/myPage")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

/** 어떤 페이지에서 이 미들웨어를 실행할거니 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
