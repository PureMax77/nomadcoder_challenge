"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
          email: true,
          avatar: true,
        },
      },
    },
    skip: page * 7,
    take: 7,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

const tweetSchema = z.object({
  description: z.string().min(1, "내용을 입력하세요."),
});

export async function createTweet(prevState: any, formData: FormData) {
  const data = { description: formData.get("description") as string };

  const result = await tweetSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          description: data.description,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });
    }
  }
}
