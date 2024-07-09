import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FireIcon className="size-16 mb-10" stroke="tomato" fill="tomato" />
      <Link
        className="w-full bg-red-500 text-center p-3 rounded-xl text-white font-semibold text-lg hover:bg-red-400 active:scale-95 transition-transform mb-6"
        href={"/create-account"}
      >
        시작하기
      </Link>
      <div>
        이미 회원이신가요?{" "}
        <Link className="text-blue-600" href={"/log-in"}>
          로그인
        </Link>
      </div>
    </div>
  );
}
