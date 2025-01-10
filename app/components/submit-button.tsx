import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const SubmitButton = ({ children, isLoading }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn("w-full justify-between")}
    >
      {isLoading ? "Carregando" : children}
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <MoveRightIcon />
      )}
    </Button>
  );
};

export default SubmitButton;
