"use client";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface ActionButtonProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ActionButton = ({ children, isOpen, setIsOpen }: ActionButtonProps) => {
  return (
    <Button
      variant="action"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(isOpen && "border-primary text-primary")}
    >
      {children}
      {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </Button>
  );
};

export default ActionButton;
