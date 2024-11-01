import { AddressDataProps } from "@/app/types";

const AddressData = ({ address }: AddressDataProps) => {
  return (
    <div className="space-y-1.5 px-5 text-gray-600">
      <p className="font-semibold text-black">
        {address.street}, {address.number}
      </p>
      <p>
        {address.neighborhood}, {address.city} - {address.state}
      </p>
      <p>{address.zipCode}</p>
      {address.additionalInfo && (
        <p className="text-sm">Complemento: {address.additionalInfo}</p>
      )}
    </div>
  );
};

export default AddressData;
