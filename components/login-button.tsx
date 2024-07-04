"use client";

import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-6 w-full rounded-full bg-gray-200 py-3 text-lg font-semibold hover:bg-gray-300 active:scale-95 transition-transform disabled:cursor-not-allowed disabled:text-gray-400"
      disabled={pending}
    >
      {pending ? "Loading..." : "Log in"}
    </button>
  );
}
