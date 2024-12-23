"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateAddressProps {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  city: string;
  additionalInfo?: string;
  userId: string;
}

export const updateAddress = async ({
  zipCode,
  street,
  number,
  neighborhood,
  state,
  city,
  additionalInfo,
  userId,
}: UpdateAddressProps) => {
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

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        update_at: new Date(),
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

  revalidatePath("/");
};

export const deleteAddress = async ({
  userId,
  addressId,
}: {
  userId: string;
  addressId: string;
}) => {
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

  if (!addressId) {
    throw new Error("Endereço não encontrado.");
  }

  await db.address.delete({
    where: {
      id: addressId,
    },
  });

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};
