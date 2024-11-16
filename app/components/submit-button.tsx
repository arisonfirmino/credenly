const SubmitButton = ({
  children,
  className,
  disable,
}: {
  children: React.ReactNode;
  className?: string;
  disable: boolean;
}) => {
  return (
    <button
      disabled={disable}
      className={`jetbrains-mono flex items-center gap-5 rounded-xl px-5 py-2.5 uppercase text-white active:bg-gray-400 ${disable ? "cursor-not-allowed bg-gray-400" : "bg-blue-700"} ${className}`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
