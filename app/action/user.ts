"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

interface CreateNewUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const createNewUser = async ({
  firstName,
  lastName,
  email,
  password,
}: CreateNewUserProps) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Campos não preenchidos.");
  }

  const existingEmail = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingEmail) {
    throw new Error("Este email já está em uso, tente outro.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  revalidatePath("/");
};
