"use client";

import FormInput from "@/components/form-input";
import Button from "@/components/button";
import { FireIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function CreateAccount() {
  const [state, action] = useFormState(handleForm, null);

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
        <FormInput
          required
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          // minLength={10}
          errors={state?.fieldErrors.confirmPassword}
        />
      </div>
      <Button text={"계정 생성"} />
    </form>
  );
}
