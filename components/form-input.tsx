import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/outline";

interface FormInputProps {
  name: "email" | "username" | "password";
  type: string;
  placeholder: string;
  required: boolean;
  error?: string;
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  error,
}: FormInputProps) {
  return (
    <div className="relative">
      {error && <div className="peer size-0"></div>}
      <input
        className="border-2 border-gray-200 rounded-full focus:outline-none focus:ring-4 transition focus:ring-gray-200 focus:ring-offset-2 w-full py-2 pl-12 pr-3 peer-first:border-red-500 peer-first:ring-red-500"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
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
      {error && <div className="text-red-500 my-3">{error}</div>}
    </div>
  );
}
