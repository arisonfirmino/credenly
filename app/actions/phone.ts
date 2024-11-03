"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { UpdatePhoneNumberProps } from "@/app/types";

export const updatePhoneNumber = async ({
  userId,
  phoneNumber,
}: UpdatePhoneNumberProps) => {
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

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      phone: phoneNumber,
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};
