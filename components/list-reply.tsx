import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import { ReplyType } from "@/app/tweets/[id]/actions";

interface ListTweetProps {
  reply: ReplyType;
}

export default function ListReply({ reply }: ListTweetProps) {
  return (
    <div className="flex gap-5 hover:bg-neutral-100 px-7 py-5 border-neutral-300 border-[1px] border-t-0">
      <div className="size-10 overflow-hidden rounded-full">
        {reply.user.avatar ? (
          <Image
            src={reply.user.avatar}
            width={40}
            height={40}
            alt={reply.user.username}
          />
        ) : (
          <UserIcon />
        )}
      </div>
      <div>
        <div className="flex gap-2 items-end">
          <span className="font-bold text-neutral-500">
            {reply.user.username}
          </span>
          <span className="text-sm text-neutral-400">{reply.user.email}</span>
        </div>
        <p>{reply.description}</p>
      </div>
    </div>
  );
}
