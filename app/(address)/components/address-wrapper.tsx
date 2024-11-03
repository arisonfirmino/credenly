"use client";

import { useState } from "react";
import ActionButton from "@/app/components/action-button";
import AddressForm from "./address-form";

const AddressWrapper = () => {
  const [showAddressForm, setShowAddressForm] = useState(true);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2.5 md:w-auto md:justify-normal md:p-5 md:pl-0">
      <ActionButton
        showComponent={showAddressForm}
        handleClick={() => setShowAddressForm(!showAddressForm)}
      >
        Endereço
      </ActionButton>

      {showAddressForm && (
        <div className="w-full max-w-lg space-y-10 py-10">
          <h3 className="jetbrains-mono text-xl font-semibold uppercase">
            Dados de Endereço
          </h3>
          <AddressForm />
        </div>
      )}
    </div>
  );
};

export default AddressWrapper;
