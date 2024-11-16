"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface ActionButtonProps {
  children: React.ReactNode;
  showComponent: boolean;
  handleClick: () => void;
  className?: string;
}

const ActionButton = ({
  children,
  handleClick,
  showComponent,
  className,
}: ActionButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`jetbrains-mono flex w-full items-center justify-between border-b border-solid p-2.5 text-sm uppercase ${showComponent ? "border-blue-700 text-blue-700" : "border-gray-400 text-gray-400"} ${className}`}
    >
      {children}
      {showComponent ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
    </button>
  );
};

export default ActionButton;
