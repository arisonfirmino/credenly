"use server";

import { db } from "@/app/lib/prisma";

export const checkEmailExists = async ({ email }: { email: string }) => {
  if (!email) return false;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};

export const comparePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) return false;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return false;

  if (password === user.password) {
    return true;
  } else {
    return false;
  }
};
