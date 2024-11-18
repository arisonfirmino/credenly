import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFormProps {
  label?: string;
  placeholder: string;
  type?: string;
  className?: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

const InputForm = ({
  label,
  placeholder,
  type = "text",
  className,
  error,
  register,
}: InputFormProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && <label className="uppercase text-gray-400">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl border border-solid bg-transparent p-2.5 outline-none focus:ring-1 ${className} ${error ? "border-red-600 focus:border-red-600 focus:ring-red-600" : "border-gray-400 focus:border-blue-700 focus:ring-blue-700"}`}
      />
      {error && <small className="text-red-600">{error.message}</small>}
    </div>
  );
};

export default InputForm;
