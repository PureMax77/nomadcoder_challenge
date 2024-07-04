"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });

  const password: any = formData.get("password");

  if (password === "12345") {
    return {
      code: "success",
    };
  } else {
    return {
      code: "fail",
    };
  }
};
