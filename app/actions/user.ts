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
    throw new Error("Este email já está em uso, por favor tente outro.");
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

export const updatePhoneNumber = async ({
  userId,
  phone,
}: {
  userId: string;
  phone: string;
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

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      phone: phone,
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};

export const updateEmailVerified = async ({
  userId,
  code,
}: {
  userId: string;
  code: string;
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

export const updateUserName = async ({
  userId,
  firstName,
  lastName,
}: {
  userId: string;
  firstName: string;
  lastName: string;
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

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};
