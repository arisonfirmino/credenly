import { SquarePenIcon, CopyIcon } from "lucide-react";

const InfoRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group flex items-center justify-between gap-5 rounded-xl border border-solid border-gray-400 p-2.5 text-gray-400">
      <p className="group-hover:text-blue-700">{children}</p>
      <div className="flex items-center gap-2.5">
        <button className="active:text-blue-700">
          <SquarePenIcon size={16} />
        </button>
        <button className="active:text-blue-700">
          <CopyIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default InfoRow;
