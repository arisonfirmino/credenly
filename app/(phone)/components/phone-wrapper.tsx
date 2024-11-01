"use client";

import { useState } from "react";
import ActionButton from "@/app/components/action-button";
import PhoneForm from "@/app/(phone)/components/phone-form";

const PhoneWrapper = () => {
  const [showPhoneForm, setShowPhoneForm] = useState(true);

  return (
    <div className="flex flex-col items-center gap-2.5 p-5 pl-0">
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
          <PhoneForm />
        </div>
      )}
    </div>
  );
};

export default PhoneWrapper;
