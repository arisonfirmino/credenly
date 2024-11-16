"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LoaderCircleIcon, LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOutClick = () => {
    setIsLoading(true);

    signOut();

    setIsLoading(false);
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleSignOutClick}
      className={`jetbrains-mono flex w-full items-center justify-between rounded px-5 py-2.5 text-sm uppercase active:bg-gray-400 ${isLoading ? "cursor-not-allowed bg-gray-400 text-gray-600" : "bg-red-600 text-white"}`}
    >
      {isLoading ? "Saindo" : "Sair"}
      {isLoading ? (
        <LoaderCircleIcon size={14} className="animate-spin" />
      ) : (
        <LogOutIcon size={14} />
      )}
    </button>
  );
};

export default SignOutButton;
