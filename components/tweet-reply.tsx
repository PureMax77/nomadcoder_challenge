"use client";

import Image from "next/image";
import {
  UserIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { useOptimistic, useRef, useState } from "react";
import { UserType } from "@/app/profile/actions";
import {
  createLike,
  createReply,
  deleteLike,
  ReplyType,
  TweetType,
} from "@/app/tweets/[id]/actions";
import ListReply from "./list-reply";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Button from "./button";

export default function TweetReply({
  me,
  tweet,
  replies,
  isLiked,
}: {
  me: UserType;
  tweet: NonNullable<TweetType>;
  replies: ReplyType[];
  isLiked: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [replyList, reducer] = useOptimistic(
    replies,
    (prev, payload: ReplyType) => {
      return [...prev, payload];
    }
  );
  const [isViewReply, setIsViewReply] = useState(false);
  const [likeStatus, likeReducer] = useOptimistic(
    {
      isLiked,
      likeCount: tweet._count.likes,
    },
    (prev, payload) => {
      if (prev.isLiked) {
        return {
          isLiked: false,
          likeCount: prev.likeCount - 1,
        };
      } else {
        return {
          isLiked: true,
          likeCount: prev.likeCount + 1,
        };
      }
    }
  );

  const onAction = async (formData: FormData) => {
    const description = formData.get("description") as string;
    const newReply: any = {
      description,
      user: me,
    };

    reducer(newReply);

    const result = await createReply(tweet.id, description);

    //@ts-ignore
    if (textareaRef.current && result.id) {
      textareaRef.current.value = "";
    }
  };

  const onLike = async () => {
    likeReducer(undefined);
    if (isLiked) {
      await deleteLike(tweet.id, me.id);
    } else {
      await createLike(tweet.id, me.id);
    }
  };

  return (
    <div>
      <div className="px-7 border-l-[1px] border-r-[1px] border-neutral-300 flex flex-col gap-3">
        <div className="border-b-[1px] border-neutral-300 w-full" />
        <div className="flex items-center gap-5 text-neutral-400 *:flex *:gap-1 *:cursor-pointer">
          <div className="group" onClick={() => setIsViewReply((a) => !a)}>
            <ChatBubbleBottomCenterIcon className="size-6 group-hover:text-neutral-600" />
            {tweet._count.replies}
          </div>
          <div className="group" onClick={onLike}>
            {likeStatus.isLiked ? (
              <HeartIconSolid className="size-6 group-hover:text-neutral-600 text-red-600" />
            ) : (
              <HeartIcon className="size-6 group-hover:text-neutral-600" />
            )}
            {likeStatus.likeCount}
          </div>
        </div>
        <div className="border-b-[1px] border-neutral-300 w-full" />
      </div>
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
        {isViewReply ? (
          <div className="flex-1 flex flex-col">
            <textarea
              ref={textareaRef}
              required
              placeholder="Post your reply"
              className="mb-[-10px] outline-none resize-none placeholder:text-lg"
              name="description"
              rows={3}
            ></textarea>
            <div className="flex justify-end">
              <div className="w-24">
                <Button text="Reply" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 justify-between">
            <textarea
              onClick={() => setIsViewReply(true)}
              className="placeholder:text-lg outline-none resize-none "
              placeholder="Post your reply"
            />
            <button
              className="rounded-full bg-gray-200 py-3 text-lg font-semibold hover:bg-gray-300 active:scale-95 transition-transform disabled:cursor-not-allowed disabled:text-gray-400 w-24"
              disabled
            >
              Reply
            </button>
          </div>
        )}
      </form>
      {isViewReply && (
        <div>
          {replyList.map((reply, index) => (
            <ListReply key={index} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
