import db from "@/lib/db";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          avatar: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const { user, description } = tweet;

  return (
    <div className="p-10 flex flex-col gap-5">
      <div className="flex gap-3 items-center">
        <div className="size-10 overflow-hidden rounded-full flex">
          {user.avatar ? (
            <Image
              src={user.avatar}
              width={40}
              height={40}
              alt={user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <span className="font-bold text-neutral-500">{user.username}</span>
          <span className="text-sm text-neutral-400">{user.email}</span>
        </div>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
}
