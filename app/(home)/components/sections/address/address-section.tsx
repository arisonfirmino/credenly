"use client";

import { useState } from "react";

import ActionButton from "@/app/(home)/components/action-button";
import AddressForm from "@/app/(home)/components/sections/address/address-form";
import AddressInfo from "@/app/(home)/components/sections/address/address-info";

import { Address } from "@prisma/client";

interface AddressSectionProps {
  address: Address;
}

const AddressSection = ({ address }: AddressSectionProps) => {
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  return (
    <>
      <ActionButton
        isOpen={isAddressFormVisible}
        setIsOpen={setIsAddressFormVisible}
      >
        Endereço
      </ActionButton>

      {isAddressFormVisible &&
        (!address || isEditingAddress ? (
          <AddressForm
            isEditing={isEditingAddress}
            setIsEditing={() => setIsEditingAddress(false)}
          />
        ) : (
          <AddressInfo
            address={address}
            onEdit={() => setIsEditingAddress(true)}
          />
        ))}
    </>
  );
};

export default AddressSection;
