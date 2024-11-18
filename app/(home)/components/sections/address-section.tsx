"use client";

import { useState } from "react";
import ActionButton from "@/app/(home)/components/action-button";
import AddressForm from "@/app/(address)/components/address-form";
import Sonner from "@/app/components/sonner";
import AddressData from "@/app/(home)/components/address-data";
import { Prisma } from "@prisma/client";

interface AddressSectionProps {
  user: Pick<
    Prisma.UserGetPayload<{
      include: { address: true };
    }>,
    "address"
  >;
}

const AddressSection = ({ user }: AddressSectionProps) => {
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isAddressUpdated, setIsAddressUpdated] = useState(false);
  const [isAddressDeleted, setIsAddressDeleted] = useState(false);

  return (
    <>
      <ActionButton
        showComponent={isAddressVisible}
        handleClick={() => setIsAddressVisible(!isAddressVisible)}
        className={
          user.address.length === 0 ? "border-yellow-500 text-yellow-500" : ""
        }
      >
        Endereço
      </ActionButton>

      {isAddressVisible &&
        (user.address.length === 0 ? (
          <AddressForm showSonner={setIsAddressUpdated} />
        ) : isAddressFormVisible ? (
          <AddressForm closeComponent={() => setIsAddressFormVisible(false)} />
        ) : (
          <AddressData
            address={user.address[0]}
            setIsAddressFormVisible={setIsAddressFormVisible}
            showSonner={setIsAddressDeleted}
          />
        ))}
      {isAddressUpdated && <Sonner>Endereço atualizado com sucesso!</Sonner>}
      {isAddressDeleted && <Sonner>Endereço deletado com sucesso!</Sonner>}
    </>
  );
};

export default AddressSection;
