import Container from "@/app/components/container";
import EmailVerificationWrapper from "@/app/(email-verification)/components/email-verification-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

const EmailVerification = async () => {
  const session = await getServerSession(authOptions);

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <Container>
      <EmailVerificationWrapper user={user} />
    </Container>
  );
};

export default EmailVerification;
