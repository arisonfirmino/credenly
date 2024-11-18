"use client";

import { useSession } from "next-auth/react";
import { sendVerificationCode } from "@/app/helpers/emailService";

const SendCodeButton = ({
  hasCode,
  email,
}: {
  hasCode: string;
  email: string;
}) => {
  const { data: session } = useSession();

  const handleSendCodeClick = async () => {
    if (session) {
      await sendVerificationCode({ userId: session.user.id, email: email });
    }
  };

  return (
    <button
      type="button"
      disabled={hasCode.trim().length > 0}
      onClick={handleSendCodeClick}
      className={`jetbrains-mono text-nowrap rounded-xl px-5 py-2.5 uppercase text-white active:bg-gray-400 ${hasCode.trim().length > 0 ? "cursor-not-allowed bg-gray-400" : "bg-blue-700"}`}
    >
      Enviar código
    </button>
  );
};

export default SendCodeButton;
