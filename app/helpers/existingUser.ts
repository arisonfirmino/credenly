"use server";

import { db } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export const checkEmailAvailability = async ({ email }: { email: string }) => {
  if (!email) {
    return false;
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  return !existingUser;
};

export const checkEmailExists = async ({ email }: { email: string }) => {
  if (!email) {
    return false;
  }

  const emailExists = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (emailExists) {
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
  if (!email || !password) {
    return false;
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return true;
  } else {
    return false;
  }
};
