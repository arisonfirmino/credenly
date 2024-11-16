import Image from "next/image";

const Title = () => {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/logo.png"
        alt="Credenly logo"
        height={347}
        width={348}
        className="w-8"
      />
      <h1 className="jetbrains-mono text-2xl font-bold uppercase">Credenly</h1>
    </div>
  );
};

export default Title;
