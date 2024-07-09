"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import z from "zod";
import { goLogin } from "@/lib/session";

const checkEmail = (email: string) => email.includes("@zod.com");
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    email: z
      .string({
        required_error: "이메일 정보가 필요합니다.",
      })
      .email(),
    // .refine(checkEmail, "@zod.com 메일만 허용됩니다."),
    username: z
      .string({
        required_error: "username 정보가 필요합니다.",
      })
      .min(5, "Username은 최소 5글자 입니다."),
    password: z
      .string({ required_error: "비밀번호가 필요합니다." })
      .min(4, "비밀번호는 최소 4글자 입니다.")
      .regex(/^(?=.*\d).+$/, "숫자가 1개이상 포함돼야 합니다."),
    confirmPassword: z
      .string({ required_error: "비밀번호확인이 필요합니다." })
      .min(4, "비밀번호는 최소 4글자 입니다."),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "중복된 메일은 사용할 수 없습니다.",
        path: ["email"],
        fatal: true,
      });
      z.NEVER;
    }
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "중복된 username은 사용할 수 없습니다.",
        path: ["username"],
        fatal: true,
      });
      z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "비밀번호가 다릅니다.",
    path: ["confirmPassword"],
  });

export const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPW = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPW,
      },
      select: {
        id: true,
      },
    });

    await goLogin(user.id, "/profile");
  }
};
