"use client";

import { InitTweets } from "@/app/page";
import { useState } from "react";
import ListTweet from "./list-tweet";
import { getMoreTweets } from "@/app/actions";

interface TweetListProps {
  initTweets: InitTweets;
}

export default function TweetList({ initTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initTweets);
  const [page, setPage] = useState(0);

  const onMoreTweets = async (isNext: boolean) => {
    if (isNext) {
      const newTweets = await getMoreTweets(page + 1);
      if (newTweets.length !== 0) {
        setTweets(newTweets);
        setPage((prev) => prev + 1);
      } else {
        alert("마지막 페이지입니다.");
      }
    } else {
      if (page === 0) {
        alert("첫 페이지입니다.");
      } else {
        const newTweets = await getMoreTweets(page - 1);
        setTweets(newTweets);
        setPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="p-5 flex flex-col gap-3">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      <div className="flex justify-between mt-5">
        <button
          className="border border-neutral-300 size-10 flex justify-center items-center rounded-full hover:bg-neutral-100 text-2xl"
          onClick={() => onMoreTweets(false)}
        >
          {"<"}
        </button>
        <button
          className="border border-neutral-300 size-10 flex justify-center items-center rounded-full hover:bg-neutral-100 text-2xl"
          onClick={() => onMoreTweets(true)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
