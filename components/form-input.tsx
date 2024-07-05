import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/outline";
import { InputHTMLAttributes } from "react";

interface FormInputProps {
  name: "email" | "username" | "password";
  errors?: string[];
}

export default function FormInput({
  name,
  errors = [],
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      {errors.length > 0 && <div className="peer size-0"></div>}
      <input
        className="border-2 border-gray-200 rounded-full focus:outline-none focus:ring-4 transition focus:ring-gray-200 focus:ring-offset-2 w-full py-2 pl-12 pr-3 peer-first:border-red-500 peer-first:ring-red-500"
        name={name}
        {...rest}
      />
      {name === "email" && (
        <EnvelopeIcon className="absolute size-6 top-2.5 left-4" />
      )}
      {name === "username" && (
        <UserIcon className="absolute size-6 top-2.5 left-4" />
      )}
      {name === "password" && (
        <KeyIcon className="absolute size-6 top-2.5 left-4" />
      )}
      {errors.map((error, index) => (
        <div key={index} className="text-red-500 my-2 pl-3">
          {error}
        </div>
      ))}
    </div>
  );
}
