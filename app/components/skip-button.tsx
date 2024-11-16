import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

const SkipButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      prefetch
      className="jetbrains-mono flex items-center gap-5 rounded-xl border border-solid border-gray-400 px-5 py-2.5 uppercase text-gray-400 active:border-blue-700 active:text-blue-700"
    >
      Pular
      <MoveRightIcon size={16} />
    </Link>
  );
};

export default SkipButton;
