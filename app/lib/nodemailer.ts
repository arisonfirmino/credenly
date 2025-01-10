"use server";

import nodemailer from "nodemailer";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationCode = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await db.user.update({
    where: { id: userId },
    data: {
      verificationCode: code,
      codeExpiry: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Código de Verificação Credenly",
    text: `Seu código de verificação é: ${code}`,
  };

  await transporter.sendMail(mailOptions);

  revalidatePath("/");
};
