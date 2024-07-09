import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "challenge-karrot",
    password: process.env.COOKIE_PASSWORD!, /// 쿠키암호화 secret
  });
}

export async function goLogin(
  userId: string | number,
  redirectPath: string = ""
) {
  // 쿠키가 있으면 내용을 업데이트 없으면 새로 만듬
  const session = await getSession();
  session.id = Number(userId);
  await session.save();

  if (redirectPath) {
    redirect(redirectPath);
  }
}
