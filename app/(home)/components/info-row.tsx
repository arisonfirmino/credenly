import { CopyIcon, SquarePenIcon } from "lucide-react";
import { handleCopy } from "@/app/helpers/handleCopy";

interface InfoRowProps {
  children: React.ReactNode;
  className?: string;
  showInteractionButton?: boolean;
  setUpdateForm: (value: boolean) => void;
}

const InfoRow = ({
  children,
  className,
  showInteractionButton = true,
  setUpdateForm,
}: InfoRowProps) => {
  return (
    <div
      className={`flex justify-between rounded border border-solid border-gray-400 p-2.5 text-gray-400 hover:text-blue-700 ${className}`}
    >
      {children}
      <div className="flex items-center gap-2.5 text-gray-400">
        <button
          onClick={() => setUpdateForm(true)}
          className="active:text-blue-700"
        >
          <SquarePenIcon size={14} />
        </button>
        {showInteractionButton && (
          <button
            onClick={() => handleCopy({ content: children })}
            className="active:text-blue-700"
          >
            <CopyIcon size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoRow;
