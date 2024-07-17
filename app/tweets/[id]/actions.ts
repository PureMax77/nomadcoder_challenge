"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";

export async function getTweet(id: number) {
  try {
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
  } catch (e) {
    return null;
  }
}

export const getCachedTweet = unstable_cache(getTweet, ["tweet-detail"]);

export const createReply = async (tweetId: number, description: string) => {
  const session = await getSession();

  const reply = await db.reply.create({
    data: {
      description: description,
      userId: session.id!,
      tweetId: tweetId,
    },
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
          email: true,
        },
      },
    },
  });
  await revalidatePath(`/tweets/${tweetId}`);
  return reply;
};

export type ReplyType = Prisma.PromiseReturnType<typeof createReply>;

export const getReplies = async (tweetId: number) => {
  const replies = await db.reply.findMany({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
          email: true,
        },
      },
    },
  });
  return replies;
};

export const getCachedReplies = unstable_cache(getReplies, ["tweet-replies"]);
