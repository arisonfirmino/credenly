"use client";

import { useState } from "react";
import ActionButton from "@/app/(home)/components/action-button";
import EmailVerificationForm from "@/app/(email-verification)/components/email-verification-form";
import Sonner from "@/app/components/sonner";
import { User } from "@prisma/client";

interface EmailVerificationSectionProps {
  user: Pick<User, "email" | "emailVerified" | "verificationCode">;
}

const EmailVerificationSection = ({ user }: EmailVerificationSectionProps) => {
  const [isEmailVerificationVisible, setIsEmailVerificationVisible] =
    useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <>
      <ActionButton
        showComponent={isEmailVerificationVisible}
        handleClick={() =>
          setIsEmailVerificationVisible(!isEmailVerificationVisible)
        }
        className={
          !user.emailVerified ? "border-yellow-500 text-yellow-500" : ""
        }
      >
        Verifique seu e-mail
      </ActionButton>

      {isEmailVerificationVisible &&
        (user.emailVerified ? (
          <p className="text-center text-green-600">
            Já verificamos seu e-mail.
          </p>
        ) : (
          <EmailVerificationForm
            hasCode={user.verificationCode || ""}
            email={user.email}
            showSonner={setIsEmailVerified}
          />
        ))}

      {isEmailVerified && (
        <Sonner>Seu e-mail foi verificado com sucesso!</Sonner>
      )}
    </>
  );
};

export default EmailVerificationSection;
