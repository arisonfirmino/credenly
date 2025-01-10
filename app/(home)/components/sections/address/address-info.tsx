import { Button } from "@/app/components/ui/button";
import DeleteAddressButton from "@/app/(home)/components/sections/address/delete-address-button";

import { Address } from "@prisma/client";

interface AddressInfoProps {
  address: Address;
  onEdit: () => void;
}

const AddressInfo = ({ address, onEdit }: AddressInfoProps) => {
  return (
    <div className="space-y-1.5 text-sm">
      <p className="text-base font-medium">
        {address.street}, {address.number}
      </p>

      <p>{address.neighborhood}</p>

      {address.additionalInfo && (
        <p className="text-gray-600">{address.additionalInfo}</p>
      )}

      <p>
        {address.city} - {address.state}
      </p>

      <p>{address.zipCode}</p>

      <div className="flex items-center justify-end gap-5">
        <DeleteAddressButton id={address.id} />
        <Button onClick={onEdit}>Atualizar</Button>
      </div>
    </div>
  );
};

export default AddressInfo;
