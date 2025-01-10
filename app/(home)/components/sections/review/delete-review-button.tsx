"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { deleteReview } from "@/app/actions/review";

import { toast } from "sonner";

const DeleteReviewButton = ({ id }: { id: string }) => {
  const [isLoading, setIsloading] = useState(false);

  const handleDelete = async () => {
    setIsloading(true);

    await deleteReview({ id });

    setIsloading(false);
    toast("Avaliação excluida.");
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

export default DeleteReviewButton;
