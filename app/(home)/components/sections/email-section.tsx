"use client";

import { useState } from "react";
import InfoRow from "@/app/(home)/components/info-row";
import UpdateEmailForm from "@/app/(home)/components/update_forms/update-email-form";
import Sonner from "@/app/components/sonner";
import { User } from "@prisma/client";

interface EmailSectionProps {
  user: Pick<User, "email" | "emailVerified">;
}

const EmailSection = ({ user }: EmailSectionProps) => {
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);

  return (
    <>
      {isEmailFormVisible ? (
        <UpdateEmailForm
          closeComponent={() => setIsEmailFormVisible(!isEmailFormVisible)}
          showSonner={setIsEmailUpdated}
        />
      ) : (
        <InfoRow
          setUpdateForm={setIsEmailFormVisible}
          className={!user.emailVerified ? "border-yellow-500" : ""}
        >
          {user.email}
        </InfoRow>
      )}
      {isEmailUpdated && (
        <Sonner>Seu e-mail foi atualizado com sucesso!</Sonner>
      )}
    </>
  );
};

export default EmailSection;
