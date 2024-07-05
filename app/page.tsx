"use client";

import FormInput from "@/components/form-input";
import LoginButton from "@/components/login-button";
import { FireIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  const isSuccess = state === undefined;

  return (
    <form
      action={action}
      className="flex flex-col items-center min-h-screen p-6 pt-32"
    >
      <FireIcon className="size-16 mb-10" stroke="tomato" fill="tomato" />
      <div className="flex flex-col gap-4 w-full">
        <FormInput
          required
          name="email"
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          required
          name="username"
          type="text"
          placeholder="Username"
          // minLength={5}
          errors={state?.fieldErrors.username}
        />
        <FormInput
          required
          name="password"
          type="password"
          placeholder="Password"
          // minLength={10}
          errors={state?.fieldErrors.password}
        />
      </div>
      <LoginButton />
      {isSuccess && (
        <div className="bg-green-500 flex items-center w-full p-4 rounded-xl mt-4 gap-4 text-lg font-semibold">
          <CheckCircleIcon className="size-8" />
          <span>Welcome back!</span>
        </div>
      )}
    </form>
  );
}
