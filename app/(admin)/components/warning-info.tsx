import { TriangleAlertIcon } from "lucide-react";

const WarningInfo = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-yellow-400 p-2.5 text-sm text-yellow-900 shadow-sm">
      <TriangleAlertIcon size={16} />
      {children}
    </div>
  );
};

export default WarningInfo;
