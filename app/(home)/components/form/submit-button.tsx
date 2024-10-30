import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const SubmitButton = ({ children, isLoading }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`jetbrains-mono flex w-full items-center justify-between rounded-xl bg-blue-700 px-5 py-2.5 uppercase text-white active:bg-gray-400 ${isLoading ? "cursor-not-allowed" : ""}`}
    >
      {children}
      {isLoading ? (
        <LoaderCircleIcon size={16} className="animate-spin" />
      ) : (
        <MoveRightIcon size={16} />
      )}
    </button>
  );
};

export default SubmitButton;
