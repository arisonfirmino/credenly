import { MoveRightIcon } from "lucide-react";

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      className="jetbrains-mono flex w-full items-center justify-between rounded-xl bg-blue-700 px-5 py-2.5 uppercase text-white active:bg-gray-400"
    >
      {children}
      <MoveRightIcon size={16} />
    </button>
  );
};

export default SubmitButton;
