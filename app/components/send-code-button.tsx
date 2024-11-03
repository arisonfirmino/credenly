"use client";

import { useSession } from "next-auth/react";
import { sendVerificationCode } from "@/app/helpers/emailService";
import { useState } from "react";
import Sonner from "@/app/components/sonner";

const SendCodeButton = () => {
  const [showSonner, setShowSonner] = useState(false);
  const { data: session } = useSession();

  const handleSendCodeClick = async () => {
    if (session) {
      await sendVerificationCode(session.user.id, session.user.email).then(
        () => {
          setShowSonner(true);
          setTimeout(() => {
            setShowSonner(false);
          }, 5000);
        },
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSendCodeClick}
        className="jetbrains-mono text-nowrap rounded-xl bg-blue-700 px-5 py-2.5 uppercase text-white active:bg-gray-400"
      >
        Enviar código
      </button>

      {showSonner && <Sonner email={session?.user.email} />}
    </>
  );
};

export default SendCodeButton;
