"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNewreview = async ({
  userId,
  comment,
  rating,
}: {
  userId: string;
  comment: string;
  rating: string;
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

  if (!comment || !rating) {
    throw new Error("Campos não preenchidos.");
  }

  const existingReview = await db.review.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (existingReview) {
    await db.review.update({
      where: {
        id: existingReview.id,
      },
      data: {
        userId: user.id,
        comment,
        rating,
        update_at: new Date(),
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
    await db.review.create({
      data: {
        userId: user.id,
        comment,
        rating,
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
  }

  revalidatePath("/");
};

export const deleteReview = async ({
  userId,
  reviewId,
}: {
  userId: string;
  reviewId: string;
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

  if (!reviewId) {
    throw new Error("Review não encontrado.");
  }

  await db.review.delete({
    where: {
      id: reviewId,
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
