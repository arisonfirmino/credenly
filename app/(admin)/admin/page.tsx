import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AdminWrapper from "../components/admin-wrapper";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      address: true,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <main className="relative flex min-h-screen w-full justify-center pb-20 pt-40">
      <AdminWrapper user={user} />

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 transform text-xs text-gray-400">
        © 2024 Arison. All Rights Reserved
      </p>
    </main>
  );
};

export default Admin;
