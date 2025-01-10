"use client";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/app/components/ui/tooltip";

import { CopyIcon } from "lucide-react";

import { toast } from "sonner";

const CopyButton = ({ content }: { content: React.ReactNode }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(String(content));
    toast(`'${content}' copiado para a área de transferência.`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={handleCopy} className="active:text-primary">
            <CopyIcon size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>copiar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
