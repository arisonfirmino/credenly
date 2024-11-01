import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  showIcon?: boolean;
  className?: string;
}

const SubmitButton = ({
  children,
  isLoading,
  showIcon = true,
  className,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`jetbrains-mono flex items-center justify-between rounded-xl px-5 py-2.5 uppercase text-white active:bg-gray-400 ${isLoading ? "cursor-not-allowed bg-gray-400" : "bg-blue-700"} ${className ? "" : "w-full"}`}
    >
      {children}
      {showIcon &&
        (isLoading ? (
          <LoaderCircleIcon size={16} className="animate-spin" />
        ) : (
          <MoveRightIcon size={16} />
        ))}
    </button>
  );
};

export default SubmitButton;
