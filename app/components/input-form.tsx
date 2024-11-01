import { InputFormProps } from "@/app/types";

const InputForm = ({
  label,
  placeholder,
  type = "text",
  register,
  error,
  value,
  showError = true,
}: InputFormProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="uppercase text-gray-400">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`truncate rounded-xl border border-solid bg-transparent p-2.5 outline-none ${
          error
            ? "border-red-600 focus:border-red-600"
            : value
              ? "border-green-600 focus:border-green-600"
              : "border-gray-400 focus:border-blue-700"
        }`}
      />
      {showError && error && (
        <small className="text-red-600">{error.message}</small>
      )}
    </div>
  );
};

export default InputForm;
