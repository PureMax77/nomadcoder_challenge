import { getUser } from "@/app/profile/actions";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCachedReplies, getCachedTweet, getIsLiked } from "./actions";
import TweetReply from "@/components/tweet-reply";

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }

  const { user, description, _count } = tweet;
  const me = await getUser();
  const replies = await getCachedReplies(id);
  const isLiked = await getIsLiked(id, me.id);

  return (
    <div>
      <div className="mt-10 p-7 flex flex-col gap-5 border-[1px] border-neutral-300 border-b-0">
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
      <TweetReply me={me} tweet={tweet!} replies={replies} isLiked={isLiked} />
    </div>
  );
}
