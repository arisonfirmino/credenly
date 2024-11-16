"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { LoaderCircle, Trash2Icon } from "lucide-react";
import { deleteReview } from "@/app/actions/review";

const DeleteReviewButton = ({ reviewId }: { reviewId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDeleteClick = async () => {
    if (session) {
      setIsLoading(true);

      await deleteReview({ userId: session.user.id, reviewId: reviewId });

      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDeleteClick}
      className={`jetbrains-mono flex w-full items-center justify-between rounded-lg px-5 py-1.5 text-sm uppercase text-white active:bg-gray-400 ${isLoading ? "cursor-not-allowed bg-gray-400" : "bg-red-600"}`}
    >
      {isLoading ? "Carregando" : "Exluir avaliação"}
      {isLoading ? (
        <LoaderCircle size={14} className="animate-spin" />
      ) : (
        <Trash2Icon size={14} />
      )}
    </button>
  );
};

export default DeleteReviewButton;
