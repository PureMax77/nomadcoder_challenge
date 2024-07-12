import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/landing");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <div className="text-3xl font-bold">Welcome {user.username}!!!</div>
      <div className="text-xl underline">Your email: {user.email}</div>
      <form action={logout}>
        <button className="bg-blue-500 w-[300px] p-2 rounded-xl text-white text-xl hover:bg-blue-600 active:scale-95 transition-transform">
          로그아웃
        </button>
      </form>
    </div>
  );
}
