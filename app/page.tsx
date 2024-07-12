import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitTweets() {
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
    take: 7,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitTweets = Prisma.PromiseReturnType<typeof getInitTweets>;

export default async function Home() {
  const initTweets = await getInitTweets();

  return (
    <div>
      <TweetList initTweets={initTweets} />
    </div>
  );
}
