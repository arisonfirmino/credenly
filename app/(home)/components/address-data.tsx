"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Address } from "@prisma/client";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { deleteAddress } from "@/app/actions/address";

interface AddressDataProps {
  address: Address;
  showSonner: (value: boolean) => void;
}

const AddressData = ({ address, showSonner }: AddressDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDeleteAddress = async () => {
    if (session) {
      setIsLoading(true);

      await deleteAddress({ userId: session.user.id, addressId: address.id });

      setIsLoading(false);
      showSonner(true);
      setTimeout(() => {
        showSonner(false);
      }, 3500);
    }
  };

  return (
    <>
      <div className="space-y-1.5 px-5 text-sm text-gray-600">
        <p className="font-semibold text-black">
          {address.street}, {address.number}
        </p>
        <p>
          {address.neighborhood}, {address.city} - {address.state}
        </p>
        <p>{address.zipCode}</p>
        {address.additionalInfo && <p>{address.additionalInfo}</p>}
      </div>

      <div className="flex justify-end gap-5">
        <Link
          href="/address"
          prefetch
          className="jetbrains-mono rounded-xl bg-blue-700 px-2.5 py-1.5 text-sm uppercase text-white active:bg-gray-400"
        >
          Atualizar
        </Link>
        <button
          disabled={isLoading}
          onClick={handleDeleteAddress}
          className={`rounded-lg px-2.5 py-1.5 text-white active:bg-gray-400 ${isLoading ? "cursor-not-allowed bg-gray-400" : "bg-red-600"}`}
        >
          {isLoading ? (
            <LoaderCircleIcon size={14} className="animate-spin" />
          ) : (
            <Trash2Icon size={14} />
          )}
        </button>
      </div>
    </>
  );
};

export default AddressData;
