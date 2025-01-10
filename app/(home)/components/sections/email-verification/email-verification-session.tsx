"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import ActionButton from "@/app/(home)/components/action-button";
import EmailVerificationForm from "@/app/(home)/components/sections/email-verification/email-verification-form";

import { sendVerificationCode } from "@/app/lib/nodemailer";

import { User } from "@prisma/client";

interface EmailVerificationSessionProps {
  user: Pick<
    User,
    "id" | "email" | "emailVerified" | "verificationCode" | "codeExpiry"
  >;
}

const EmailVerificationSession = ({ user }: EmailVerificationSessionProps) => {
  const [isEmailVerificationVisible, setIsEmailVerificationVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendVerificationCode = async () => {
    setIsLoading(true);

    await sendVerificationCode({ userId: user.id, email: user.email });

    setIsLoading(false);
  };

  return (
    <>
      <ActionButton
        isOpen={isEmailVerificationVisible}
        setIsOpen={setIsEmailVerificationVisible}
      >
        Verifique seu e-mail
      </ActionButton>

      {isEmailVerificationVisible &&
        (!user.emailVerified ? (
          <>
            {user.verificationCode &&
            new Date(user.codeExpiry ?? "") > new Date() ? (
              <EmailVerificationForm verificationCode={user.verificationCode} />
            ) : (
              <Button onClick={handleSendVerificationCode}>
                {isLoading ? "Enviando" : "Enviar código"}
              </Button>
            )}
          </>
        ) : (
          <p className="text-center text-sm uppercase text-green-500">
            Seu e-mail já foi verificado.
          </p>
        ))}
    </>
  );
};

export default EmailVerificationSession;
