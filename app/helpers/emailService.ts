"use server";

import nodemailer from "nodemailer";
import { db } from "@/app/lib/prisma";

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
};
