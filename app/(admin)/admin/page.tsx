import UserData from "@/app/(admin)/components/user-data";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <UserData user={user} />
    </main>
  );
};

export default Admin;
