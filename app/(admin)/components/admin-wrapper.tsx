"use client";

import { useState } from "react";
import ActionButton from "@/app/components/action-button";
import { formatCreatedAt, formatUpdateAt } from "@/app/helpers/formatDate";
import { AdminWrapperProps } from "@/app/types";
import InfoRow from "@/app/(admin)/components/info-row";
import Warnings from "@/app/(admin)/components/warnings";
import AddressData from "@/app/(admin)/components/address-data";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { formatPhoneNumber } from "@/app/helpers/formatPhoneNumber";

const AdminWrapper = ({ user }: AdminWrapperProps) => {
  const [showAddress, setShowAddres] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleSignOutClick = () => signOut();

  return (
    <section className="w-full max-w-lg space-y-5 px-5 md:px-0">
      <Warnings user={user} />

      <div className="flex items-center justify-between">
        <InfoRow>
          <span className="text-xl font-bold text-black">
            {user.firstName} {user.lastName}
          </span>
        </InfoRow>
        <div className="flex flex-col items-end gap-1.5 text-xs text-gray-400">
          <span>Entrou em: {formatCreatedAt(user.created_at)}</span>
          <span>Atualizado {formatUpdateAt(user.update_at)}</span>
        </div>
      </div>

      <InfoRow>{user.email}</InfoRow>

      <InfoRow>
        {user.phone
          ? `${formatPhoneNumber(user.phone)}`
          : "nenhum número adicionado"}
      </InfoRow>

      <ActionButton
        handleClick={() => setShowAddres(!showAddress)}
        showComponent={showAddress}
      >
        Endereço
      </ActionButton>
      {showAddress && (
        <div className="space-y-5">
          {user.address[0] ? (
            <AddressData address={user.address[0]} />
          ) : (
            <div className="text-center">
              <p className="text-sm text-red-600">sem endereço cadastrado</p>
            </div>
          )}
          <div className="flex w-full justify-end">
            <Link
              href="/address"
              prefetch
              className="rounded-xl bg-blue-700 px-5 py-1.5 text-white active:bg-gray-400"
            >
              Atualizar
            </Link>
          </div>
        </div>
      )}

      <ActionButton
        handleClick={() => setShowReview(!showReview)}
        showComponent={showReview}
      >
        Avaliação
      </ActionButton>

      {showReview && <p>deixe uma avaliação</p>}

      <button
        onClick={handleSignOutClick}
        className="flex w-full items-center justify-between rounded-xl bg-red-600 px-5 py-2.5 text-white active:bg-gray-400"
      >
        Sair
        <LogOutIcon size={16} />
      </button>
    </section>
  );
};

export default AdminWrapper;
