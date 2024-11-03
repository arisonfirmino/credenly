"use client";

import { useState } from "react";

import ActionButton from "@/app/components/action-button";
import VerifiedData from "@/app/components/verified-data";
import EmailCodeForm from "@/app/(email-verification)/components/email-code-form";

import RedirectLink from "@/app/components/redirect-button";

import { EmailVerificationWrapperProps } from "@/app/types";

const EmailVerificationWrapper = ({ user }: EmailVerificationWrapperProps) => {
  const [showEmailCodeForm, setShowEmailCodeForm] = useState(true);

  return (
    <div className="flex flex-col items-center gap-2.5 p-5 pl-0">
      <ActionButton
        showComponent={showEmailCodeForm}
        handleClick={() => setShowEmailCodeForm(!showEmailCodeForm)}
      >
        Confirmação de email
      </ActionButton>

      {showEmailCodeForm && (
        <div className="w-full max-w-lg space-y-10 py-10">
          <h3 className="jetbrains-mono text-xl font-semibold uppercase">
            Confirme seu endereço de e-mail
          </h3>

          {user?.emailVerified ? (
            <div className="space-y-5">
              <VerifiedData>e-mail</VerifiedData>
              <RedirectLink href="/phone" />
            </div>
          ) : (
            <EmailCodeForm />
          )}
        </div>
      )}
    </div>
  );
};

export default EmailVerificationWrapper;
