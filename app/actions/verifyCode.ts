"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { UpdateEmailVerifiedProps } from "@/app/types";

export const verifyCode = async (userId: string, code: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (
    !user ||
    user.verificationCode !== code ||
    !user.codeExpiry ||
    user.codeExpiry < new Date()
  ) {
    return false;
  }
  return true;
};

export const updateEmailVerified = async ({
  userId,
  code,
}: UpdateEmailVerifiedProps) => {
  if (!userId) {
    throw new Error("Usuário não encontrado.");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (
    user.verificationCode === code &&
    user.codeExpiry &&
    user.codeExpiry > new Date()
  ) {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
        verificationCode: null,
        codeExpiry: null,
        update_at: new Date(),
      },
    });
  }

  revalidatePath("/");
};
