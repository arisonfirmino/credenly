"use client";

import { User } from "@prisma/client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserDataProps {
  user: User;
}

const UserData = ({ user }: UserDataProps) => {
  const handleSignOutClick = () => signOut();

  return (
    <div className="space-y-1.5 rounded-xl border border-solid border-gray-200 bg-white p-2.5 shadow">
      <h2 className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </h2>
      <p>{user.email}</p>
      <button
        onClick={handleSignOutClick}
        className="flex w-full items-center justify-between rounded-xl bg-red-600 px-2.5 py-1.5 text-white active:bg-gray-400"
      >
        Sair
        <LogOutIcon size={16} />
      </button>
    </div>
  );
};

export default UserData;
