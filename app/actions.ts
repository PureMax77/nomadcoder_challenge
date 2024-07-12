"use server";

import db from "@/lib/db";

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
