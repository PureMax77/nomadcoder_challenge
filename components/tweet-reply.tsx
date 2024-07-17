"use client";

import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import Button from "./button";
import { useFormState } from "react-dom";
import { useEffect, useOptimistic } from "react";
import { UserType } from "@/app/profile/actions";
import { createReply, ReplyType } from "@/app/tweets/[id]/actions";
import ListReply from "./list-reply";

export default function TweetReply({
  me,
  tweetId,
  replies,
}: {
  me: UserType;
  tweetId: number;
  replies: ReplyType[];
}) {
  const [replyList, reducer] = useOptimistic(
    replies,
    (prev, payload: ReplyType) => {
      return [...prev, payload];
    }
  );

  const onAction = async (formData: FormData) => {
    const description = formData.get("description") as string;
    const newReply: any = {
      description,
      user: me,
    };

    reducer(newReply);

    await createReply(tweetId, description);
  };

  return (
    <div>
      <form
        action={onAction}
        className="flex gap-5 p-7 border-[1px] border-neutral-300 border-t-0"
      >
        <div>
          <div className="size-10 overflow-hidden rounded-full">
            {me.avatar ? (
              <Image src={me.avatar} width={40} height={40} alt={me.username} />
            ) : (
              <UserIcon />
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <textarea
            required
            placeholder="Post your reply"
            className="mb-[-10px] outline-none resize-none placeholder:text-lg"
            name="description"
            rows={3}
          ></textarea>
          <div className="flex justify-end">
            <button className="mt-6 w-28 rounded-full bg-gray-200 py-3 text-lg font-semibold hover:bg-gray-300 active:scale-95 transition-transform disabled:cursor-not-allowed disabled:text-gray-400">
              Reply
            </button>
          </div>
        </div>
      </form>
      <div>
        {replyList.map((reply, index) => (
          <ListReply key={index} reply={reply} />
        ))}
      </div>
    </div>
  );
}
