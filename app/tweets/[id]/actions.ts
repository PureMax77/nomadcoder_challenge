"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import { z } from "zod";

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
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

export type TweetType = Prisma.PromiseReturnType<typeof getTweet>;

export const getCachedTweet = unstable_cache(getTweet, ["tweet-detail"]);

const replySchema = z.object({
  description: z.string().min(1, "내용을 입력하세요."),
});

export const createReply = async (tweetId: number, description: string) => {
  const result = replySchema.safeParse({ description });
  if (!result.success) {
    return result.error.flatten();
  }

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

export const getIsLiked = async (tweetId: number, userId: number) => {
  const like = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  return !!like;
};

export const createLike = async (tweetId: number, userId: number) => {
  try {
    await db.like.create({
      data: {
        tweetId,
        userId,
      },
    });
    revalidatePath(`/tweets/${tweetId}`);
  } catch (e) {}
};

export const deleteLike = async (tweetId: number, userId: number) => {
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId,
        },
      },
    });
    revalidatePath(`/tweets/${tweetId}`);
  } catch (e) {}
};
