"use client";

import CopyButton from "@/app/(home)/components/copy-button";

import { EditIcon } from "lucide-react";

interface InfoRowProps {
  children: React.ReactNode;
  type: "name" | "email" | "phone";
  openComponent: () => void;
  className?: string;
}

const InfoRow = ({
  children,
  type,
  openComponent,
  className,
}: InfoRowProps) => {
  return (
    <div
      className={`group flex h-10 items-center justify-between rounded-md border px-3 py-2 ring-ring hover:ring-2 hover:ring-offset-2 ${className} ${type === "name" ? "font-medium capitalize" : "text-muted-foreground hover:text-foreground"}`}
    >
      {children}

      <div className="flex items-center gap-5 text-muted-foreground group-hover:text-foreground">
        <CopyButton content={children} />
        <button onClick={openComponent}>
          <EditIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default InfoRow;
