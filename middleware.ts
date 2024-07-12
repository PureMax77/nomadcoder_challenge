import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

// 세션없을 때 접근 가능한 페이지
const noSessionPages: Routes = {
  "/landing": true,
  "/log-in": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const noNeedLogin = noSessionPages[request.nextUrl.pathname];

  if (session.id) {
    if (noNeedLogin) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else {
    if (!noNeedLogin) {
      return NextResponse.redirect(new URL("/landing", request.url));
    }
  }
}

export const config = {
  // page 요청 뿐만 아니라 api, static 등등 모든 요청을 통과하므로 아래 것들을 제외하라는 정규식
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
