import Image from "next/image";

const Title = () => {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/logo.png"
        alt="Credenly Logo"
        height={347}
        width={348}
        className="w-6"
      />
      <h1 className="jetbrains-mono text-xl font-medium uppercase">Credenly</h1>
    </div>
  );
};

export default Title;
