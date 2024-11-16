"use client";

import { usePathname } from "next/navigation";

const Container = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <main
      className={`relative flex min-h-screen justify-center bg-gray-100 ${pathname === "/" ? "w-full" : "items-center pb-5 pt-20 xl:ml-[448px] xl:w-custom"}`}
    >
      {children}
    </main>
  );
};

export default Container;
