"use client";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { XIcon } from "lucide-react";

interface CancelButtonProps {
  closeComponent: () => void;
  isLoading: boolean;
}

const CancelButton = ({ closeComponent, isLoading }: CancelButtonProps) => {
  return (
    <Button
      type="button"
      size="icon"
      disabled={isLoading}
      onClick={closeComponent}
      className={cn("min-w-10 max-w-10 bg-red-600")}
    >
      <XIcon />
    </Button>
  );
};

export default CancelButton;
