"use server";

import nodemailer from "nodemailer";
import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationCode = async (userId: string, email: string) => {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  await db.user.update({
    where: { id: userId },
    data: {
      verificationCode,
      codeExpiry: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Seu Código de Verificação Credenly",
    text: `Seu código de verificação é: ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);

  revalidatePath("/");
};

export const verifyCode = async (userId: string, code: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (
    !user ||
    user.verificationCode !== code ||
    !user.codeExpiry ||
    user.codeExpiry < new Date()
  ) {
    return false;
  }
  return true;
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
