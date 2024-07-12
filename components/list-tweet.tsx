import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";

interface ListTweetProps {
  id: number;
  description: string;
  photo: string | null;
  created_at: Date;
  updated_at: Date;
  userId: number;
  user: {
    username: string;
    email: string;
    avatar: string | null;
  };
}

export default function ListTweet({
  id,
  description,
  photo,
  created_at,
  updated_at,
  userId,
  user,
}: ListTweetProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="flex gap-5 hover:bg-neutral-100 p-5 border-neutral-300 border border-spacing-0.5"
    >
      <div className="size-10 overflow-hidden rounded-full">
        {user.avatar ? (
          <Image src={user.avatar} width={40} height={40} alt={user.username} />
        ) : (
          <UserIcon />
        )}
      </div>
      <div>
        <div className="flex gap-2 items-end">
          <span className="font-bold text-neutral-500">{user.username}</span>
          <span className="text-sm text-neutral-400">{user.email}</span>
        </div>
        <p>{description}</p>
      </div>
    </Link>
  );
}
