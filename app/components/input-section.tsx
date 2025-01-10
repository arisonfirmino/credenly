import { cn } from "@/app/lib/utils";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputSectionProps {
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

const InputSection = ({
  label,
  placeholder,
  type = "text",
  register,
  error,
}: InputSectionProps) => {
  return (
    <div className="w-full space-y-1.5">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        {...register}
        className={cn(error && "border-red-600 focus-visible:ring-red-600")}
      />
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default InputSection;
