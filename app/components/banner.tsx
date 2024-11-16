"use client";

import { usePathname } from "next/navigation";

const Banner = () => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed left-0 top-0 h-full w-full bg-blue-700 xl:max-w-md ${pathname === "/" ? "hidden" : "hidden xl:flex"}`}
    ></div>
  );
};

export default Banner;
