"use client";

import { usePathname } from "next/navigation";

const PageIndicator = () => {
  const pathname = usePathname();

  const indicatorItems = [
    { page: "SignIn", href: "/signin" },
    { page: "Email Verification", href: "/email-verification" },
    { page: "Phone", href: "/phone" },
    { page: "Address", href: "/address" },
  ];

  return (
    <div
      className={`absolute top-5 w-full px-5 md:px-20 ${pathname === "/" ? "hidden" : ""}`}
    >
      <div className="relative flex items-center justify-between">
        {indicatorItems.map((item) => (
          <div
            key={item.page}
            className="z-10 flex h-10 w-10 items-center justify-center bg-gray-100"
          >
            <div
              className={`h-3 w-3 rounded-full ${pathname === item.href ? "bg-blue-700" : "bg-gray-400"}`}
            ></div>
          </div>
        ))}
        <hr className="absolute w-full border-gray-400" />
      </div>
    </div>
  );
};

export default PageIndicator;
