"use server";

import z from "zod";

const checkEmail = (email: string) => email.includes("@zod.com");

const formSchema = z.object({
  email: z
    .string({
      required_error: "이메일 정보가 필요합니다.",
    })
    .email()
    .refine(checkEmail, "@zod.com 메일만 허용됩니다."),
  username: z
    .string({
      required_error: "username 정보가 필요합니다.",
    })
    .min(5, "Username은 최소 5글자 입니다."),
  password: z
    .string({ required_error: "비밀번호가 필요합니다." })
    .min(10, "비밀번호는 최소 10글자 입니다.")
    .regex(/^(?=.*\d).+$/, "숫자가 1개이상 포함돼야 합니다."),
});

export const handleForm = async (prevState: any, formData: FormData) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
};
