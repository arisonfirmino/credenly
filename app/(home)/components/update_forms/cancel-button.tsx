"use client";

import { LoaderCircleIcon, XIcon } from "lucide-react";

interface CancelButtonProps {
  closeComponent: () => void;
  isLoading: boolean;
}

const CancelButton = ({ closeComponent, isLoading }: CancelButtonProps) => {
  return (
    <button
      type="button"
      onClick={closeComponent}
      className={`rounded-lg p-2.5 text-white active:bg-gray-400 ${isLoading ? "cursor-not-allowed bg-gray-400" : "bg-red-600"}`}
    >
      {isLoading ? (
        <LoaderCircleIcon size={16} className="animate-spin" />
      ) : (
        <XIcon size={16} />
      )}
    </button>
  );
};

export default CancelButton;
