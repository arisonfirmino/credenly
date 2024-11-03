import { SquarePenIcon, CopyIcon } from "lucide-react";

interface InfoRowProps {
  children: React.ReactNode;
  isVerified?: boolean;
  showComponent: () => void;
}

const InfoRow = ({ children, isVerified, showComponent }: InfoRowProps) => {
  return (
    <div
      className={`group flex items-center justify-between gap-5 rounded-xl border border-solid p-2.5 text-gray-400 ${isVerified ? "border-green-500" : "border-yellow-400"}`}
    >
      <p className="group-hover:text-blue-700">{children}</p>
      <div className="flex items-center gap-2.5">
        <button onClick={showComponent} className="active:text-blue-700">
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
