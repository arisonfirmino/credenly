import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { formatDate } from "@/app/helpers/formatDate";

import NameSection from "@/app/(home)/components/sections/name-section";
import EmailSection from "@/app/(home)/components/sections/email-section";
import PhoneSection from "@/app/(home)/components/sections/phone-section";
import AddressSection from "@/app/(home)/components/sections/address-section";
import EmailVerificationSection from "@/app/(home)/components/sections/email-verification-section";
import ReviewSection from "@/app/(home)/components/sections/review-section";
import SignOutButton from "@/app/(home)/components/signout-button";

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
    <main className="w-full space-y-5 py-5 md:w-[448px] md:px-0 md:pt-40">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>entrou em {formatDate(user.created_at)}</span>
        <span>atualizado em {formatDate(user.update_at)}</span>
      </div>

      <NameSection user={user} />
      <EmailSection user={user} />
      <PhoneSection user={user} />
      <AddressSection user={user} />
      <EmailVerificationSection user={user} />
      <ReviewSection user={user} />
      <SignOutButton />
    </main>
  );
};

export default Home;
