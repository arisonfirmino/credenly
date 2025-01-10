"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddressProps {
  userId: string;
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  city: string;
  additionalInfo: string;
}

export const addAddress = async ({
  userId,
  zipCode,
  street,
  number,
  neighborhood,
  state,
  city,
  additionalInfo,
}: AddressProps) => {
  if (!userId) throw new Error("ID de usuário não fornecido.");

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      address: true,
    },
  });

  if (!user) throw new Error("Usuário não enontrado.");

  if (!zipCode || !street || !number || !neighborhood || !state || !city)
    throw new Error("Campos não preenchidos.");

  if (user.address.length === 0) {
    await db.address.create({
      data: {
        userId,
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
    await db.address.update({
      where: {
        id: user.address[0].id,
      },
      data: {
        userId,
        zipCode,
        street,
        number,
        neighborhood,
        state,
        city,
        additionalInfo,
      },
    });
  }

  revalidatePath("/");
};

export const deleteAddress = async ({ id }: { id: string }) => {
  if (!id) throw new Error("ID não fornecido.");

  const address = await db.address.findUnique({
    where: {
      id,
    },
  });

  if (!address) throw new Error("Endereço não encontrado.");

  await db.address.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
