interface InputFormProps {
  label: string;
  placeholder: string;
  type?: string;
}

const InputForm = ({ label, placeholder, type = "text" }: InputFormProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="uppercase text-gray-400">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="truncate rounded-xl border border-solid border-gray-400 bg-transparent p-2.5 outline-none focus:border-blue-700"
      />
    </div>
  );
};

export default InputForm;
