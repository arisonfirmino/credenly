import Link from "next/link";

const RedirectLink = ({ href }: { href: string }) => {
  return (
    <div className="flex justify-end">
      <Link
        href={href}
        className="jetbrains-mono rounded-xl bg-blue-700 p-2.5 uppercase text-white active:bg-gray-400"
      >
        Ver dados
      </Link>
    </div>
  );
};

export default RedirectLink;
