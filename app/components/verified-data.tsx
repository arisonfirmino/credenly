import { CircleCheckIcon } from "lucide-react";

const VerifiedData = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-solid border-green-500 p-2.5 text-green-500">
      <p>Seu {children} já está verificado</p>
      <CircleCheckIcon size={20} />
    </div>
  );
};

export default VerifiedData;
