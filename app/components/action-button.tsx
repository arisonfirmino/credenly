"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface ActionButtonProps {
  children: React.ReactNode;
  showComponent: boolean;
  handleClick: () => void;
}

const ActionButton = ({
  children,
  showComponent,
  handleClick,
}: ActionButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`jetbrains-mono flex w-full items-center justify-between border-b border-solid p-2.5 uppercase ${showComponent ? "border-blue-700 text-blue-700" : "border-gray-400 text-gray-400"}`}
    >
      {children}
      {showComponent ? (
        <ChevronUpIcon size={16} />
      ) : (
        <ChevronDownIcon size={16} />
      )}
    </button>
  );
};

export default ActionButton;
