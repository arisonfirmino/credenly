"use client";

import { useState } from "react";

import InfoRow from "@/app/(home)/components/info-row";
import EditEmailForm from "@/app/(home)/components/sections/email/edit-email-form";

import { User } from "@prisma/client";

interface EmailSectionProps {
  user: Pick<User, "email" | "emailVerified">;
}

const EmailSection = ({ user }: EmailSectionProps) => {
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);

  return isEmailFormVisible ? (
    <EditEmailForm
      closeComponent={() => setIsEmailFormVisible(false)}
      userEmail={user.email}
    />
  ) : (
    <InfoRow
      openComponent={() => setIsEmailFormVisible(true)}
      type="email"
      className={`${!user.emailVerified && "border-yellow-400"}`}
    >
      {user.email}
    </InfoRow>
  );
};

export default EmailSection;
