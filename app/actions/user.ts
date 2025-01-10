"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const createNewUser = async ({
  name,
  lastName,
  email,
  password,
}: {
  name: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  if (!name || !lastName || !email || !password)
    throw new Error("Campos não preenchidos.");

  const isUserExists = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExists)
    throw new Error("Este email já está em uso, por favor tente outro.");

  await db.user.create({
    data: {
      name,
      lastName,
      email,
      password,
    },
  });

  revalidatePath("/");
};

export const updateUserName = async ({
  userId,
  name,
  lastName,
}: {
  userId: string;
  name: string;
  lastName: string;
}) => {
  if (!userId) throw new Error("ID de usuário não fornecido.");

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      lastName,
    },
  });

  revalidatePath("/");
};

export const updateUserEmail = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  if (!userId) throw new Error("ID de usuário não fornecido.");

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  if (!email) throw new Error("Campos não preenchidos.");

  const isUserExists = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExists)
    throw new Error("Este email já está em uso, por favor tente outro.");

  if (email === user.email)
    throw new Error("Este e-mail já está cadastrado no seus dados.");

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      emailVerified: false,
    },
  });

  revalidatePath("/");
};

export const updateUserPhone = async ({
  userId,
  phone,
}: {
  userId: string;
  phone: string;
}) => {
  if (!userId) throw new Error("ID de usuário não fornecido.");

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw Error("Usuário não encontrado.");

  if (!phone) throw new Error("Campos não preenchidos.");

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      phone,
    },
  });

  revalidatePath("/");
};

export const verifyCode = async ({
  userId,
  code,
}: {
  userId: string;
  code: string;
}) => {
  if (!userId) throw new Error("ID de usuário não fornecido.");

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  if (!user.verificationCode)
    throw new Error("O usuário não tem um código de verificação.");

  if (!user.codeExpiry)
    throw new Error(
      "O código de verificação desse usuário não existe ou expirou.",
    );

  if (new Date() > user.codeExpiry) {
    throw new Error("O código expirou. Solicite um novo código.");
  }

  if (user.verificationCode !== code)
    throw new Error("Código de verificação inválido.");

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: true,
      verificationCode: null,
      codeExpiry: null,
    },
  });

  revalidatePath("/");
};
