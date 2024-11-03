"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateAddressProps } from "@/app/types";

export const createNewAddress = async ({
  zipCode,
  street,
  number,
  neighborhood,
  state,
  city,
  additionalInfo,
  userId,
}: CreateAddressProps) => {
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

  if (!zipCode || !street || !number || !neighborhood || !state || !city) {
    throw new Error("Campos não preenchidos.");
  }

  const existingAddress = await db.address.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (existingAddress) {
    await db.address.update({
      where: {
        id: existingAddress.id,
      },
      data: {
        zipCode,
        street,
        number,
        neighborhood,
        state,
        city,
        additionalInfo,
      },
    });
  } else {
    await db.address.create({
      data: {
        zipCode,
        street,
        number,
        neighborhood,
        state,
        city,
        additionalInfo,
        userId,
      },
    });
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};
