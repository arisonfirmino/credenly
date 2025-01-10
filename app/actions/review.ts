"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const addReview = async ({
  userId,
  text,
  rating,
}: {
  userId: string;
  text: string;
  rating: number;
}) => {
  if (!userId) throw new Error("ID de usuário não fornecido.");

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não localizado.");

  if (!text || !rating) throw new Error("Campos não preenchidos.");

  await db.review.create({
    data: {
      userId,
      text,
      rating,
    },
  });

  revalidatePath("/");
};

export const deleteReview = async ({ id }: { id: string }) => {
  if (!id) throw new Error("ID da avaliação não fornecido.");

  const review = await db.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) throw new Error("Avaliação não encontrada.");

  await db.review.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
