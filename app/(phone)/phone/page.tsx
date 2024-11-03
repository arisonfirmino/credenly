import Container from "@/app/components/container";
import PhoneWrapper from "@/app/(phone)/components/phone-wrapper";
import { notFound } from "next/navigation";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const PhonePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <Container>
      <PhoneWrapper user={user} />
    </Container>
  );
};

export default PhonePage;
