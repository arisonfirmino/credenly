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
import EmailCodeForm from "@/app/(email-verification)/components/email-code-form";
import VerifiedData from "@/app/components/verified-data";
import PhoneForm from "@/app/(phone)/components/phone-form";

const AdminWrapper = ({ user }: AdminWrapperProps) => {
  const [showAddress, setShowAddres] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [showEmailCodeForm, setShowEmailCodeForm] = useState(false);
  const [showPhoneCodeForm, setShowPhoneCodeForm] = useState(false);

  const [changeEmail, setChangeEmail] = useState(false);
  const [changePhoneNumber, setChangePhoneNumber] = useState(false);

  const handleSignOutClick = () => signOut();

  return (
    <section className="w-full max-w-lg space-y-5 px-5 md:px-0">
      <Warnings user={user} />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">
          {user.firstName} {user.lastName}
        </h2>

        <div className="flex flex-col items-end gap-1.5 text-xs text-gray-400">
          <span>Entrou em: {formatCreatedAt(user.created_at)}</span>
          <span>Atualizado {formatUpdateAt(user.update_at)}</span>
        </div>
      </div>

      <InfoRow
        isVerified={user.emailVerified}
        showComponent={() => setChangeEmail(!changeEmail)}
      >
        {user.email}
      </InfoRow>

      <InfoRow
        isVerified={user.phoneVerified}
        showComponent={() => setChangePhoneNumber(!changePhoneNumber)}
      >
        {user.phone
          ? `${formatPhoneNumber(user.phone)}`
          : "nenhum número adicionado"}
      </InfoRow>

      {changePhoneNumber && (
        <>
          {user.phone ? (
            <p className="text-sm text-gray-600">
              Você já possui um número de telefone cadastrado. Caso deseje
              atualizar seu número, basta preencher o formulário abaixo.
            </p>
          ) : (
            ""
          )}
          <PhoneForm closeComponent={() => setChangePhoneNumber(false)} />
        </>
      )}

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
        handleClick={() => setShowEmailCodeForm(!showEmailCodeForm)}
        showComponent={showEmailCodeForm}
      >
        Verifique seu e-mail
      </ActionButton>

      {showEmailCodeForm &&
        (user.emailVerified ? (
          <VerifiedData>e-mail</VerifiedData>
        ) : (
          <EmailCodeForm />
        ))}

      <ActionButton
        handleClick={() => setShowPhoneCodeForm(!showPhoneCodeForm)}
        showComponent={showPhoneCodeForm}
      >
        Verifique seu número de telefone
      </ActionButton>

      {showPhoneCodeForm && <p>formulário para o código de telefone</p>}

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
