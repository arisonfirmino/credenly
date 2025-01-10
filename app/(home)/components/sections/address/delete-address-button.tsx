"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { deleteAddress } from "@/app/actions/address";

import { toast } from "sonner";

const DeleteAddressButton = ({ id }: { id: string }) => {
  const [isLoading, setIsloading] = useState(false);

  const handleDelete = async () => {
    setIsloading(true);

    await deleteAddress({ id });

    setIsloading(false);
    toast("Endereço excluido.");
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleDelete}
      className={cn("bg-red-600")}
    >
      {isLoading ? "Excluindo" : "Excluir"}
    </Button>
  );
};

export default DeleteAddressButton;
