import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const SignInLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <>{children}</>;
};

export default SignInLayout;
