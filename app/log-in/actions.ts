"use server";

import db from "@/lib/db";
import z from "zod";
import bcrypt from "bcrypt";
import { goLogin } from "@/lib/session";

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string({
      required_error: "이메일이 필요합니다.",
    })
    .email()
    .toLowerCase()
    .refine(checkEmail, "해당 메일로 가입된 사용자가 없습니다."),
  password: z.string({
    required_error: "비밀번호가 필요합니다.",
  }),
});

export const login = async (prevSate: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user!.password);
    if (ok) {
      await goLogin(user!.id, "/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }
  }
};
