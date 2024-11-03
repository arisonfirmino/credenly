"use client";

import { useState } from "react";
import ActionButton from "@/app/components/action-button";
import PhoneForm from "@/app/(phone)/components/phone-form";
import { PhoneWrapperProps } from "@/app/types";

const PhoneWrapper = ({ user }: PhoneWrapperProps) => {
  const [showPhoneForm, setShowPhoneForm] = useState(true);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2.5 md:w-auto md:justify-normal md:p-5 md:pl-0">
      <ActionButton
        showComponent={showPhoneForm}
        handleClick={() => setShowPhoneForm(!showPhoneForm)}
      >
        Número de telefone
      </ActionButton>

      {showPhoneForm && (
        <div className="w-full max-w-lg space-y-10 py-10">
          <h3 className="jetbrains-mono text-xl font-semibold uppercase">
            Adicione um número de telefone
          </h3>

          {user.phone && (
            <p className="text-sm text-gray-600">
              Você já possui um número de telefone cadastrado. Caso deseje
              atualizar seu número, basta preencher o formulário abaixo.
            </p>
          )}

          <PhoneForm />
        </div>
      )}
    </div>
  );
};

export default PhoneWrapper;
