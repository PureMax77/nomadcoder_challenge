"use client";

import { UserType } from "@/app/page";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import Button from "./button";
import { useFormState } from "react-dom";
import { createTweet } from "@/app/actions";
import { useEffect, useState } from "react";

let isFirst = true;

export default function AddTweet({ user }: { user: UserType }) {
  const [state, action] = useFormState(createTweet, null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (isFirst) {
      isFirst = false;
      return;
    }

    // action 성공시 초기화
    // 성공시 state가 undefined됨
    if (state !== null) {
      // setDescription("");
      window.location.reload();
    }
  }, [state]);

  return (
    <div className="px-5 mt-5">
      <form
        action={action}
        className="flex gap-5 p-5 border-neutral-300 border border-spacing-0.5"
      >
        <div>
          <div className="size-10 overflow-hidden rounded-full">
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
        </div>
        <div className="flex-1 flex flex-col">
          <textarea
            required
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-[-10px] outline-none resize-none"
            name="description"
            rows={3}
          ></textarea>
          <div className="flex justify-end">
            <div className="w-28">
              <Button text="Post" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
