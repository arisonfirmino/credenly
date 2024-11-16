import HomeWrapper from "@/app/(home)/components/home-wrapper";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      address: true,
      review: true,
    },
  });

  if (!user) {
    redirect("/signin");
  }

  return (
    <>
      <HomeWrapper user={user} />
    </>
  );
};

export default Home;
