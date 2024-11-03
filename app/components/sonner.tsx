const Sonner = ({ email }: { email: string | undefined }) => {
  return (
    <div className="fixed left-10 top-10 rounded-xl border border-solid border-gray-200 bg-white p-2.5 text-sm shadow">
      Um códgio de verificação foi enviado para{" "}
      <span className="text-blue-700">{email}</span>
    </div>
  );
};

export default Sonner;
