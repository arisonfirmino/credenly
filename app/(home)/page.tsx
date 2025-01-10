import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/prisma";

import { cn } from "@/app//lib/utils";

import { Badge } from "@/app/components/ui/badge";

import NameSection from "@/app/(home)/components/sections/name/name-section";
import EmailSection from "@/app/(home)/components/sections/email/email-section";
import PhoneSection from "@/app/(home)/components/sections/phone/phone-section";

import AddressSection from "@/app/(home)/components/sections/address/address-section";
import EmailVerificationSession from "@/app/(home)/components/sections/email-verification/email-verification-session";
import ReviewSection from "@/app/(home)/components/sections/review/review-section";

import ReviewList from "@/app/(home)/components/review/review-list";
import SignOutButton from "@/app/(home)/components/signout-button";

import { formatDate } from "@/app/helpers/formatDate";
import { TriangleAlertIcon } from "lucide-react";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      address: true,
      review: true,
    },
  });

  if (!user) return null;

  const reviews = await db.review.findMany({
    include: {
      user: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (!reviews) return null;

  return (
    <>
      {!user.emailVerified && (
        <Badge
          className={cn("right-5 top-5 bg-yellow-400 text-yellow-800 lg:fixed")}
        >
          <TriangleAlertIcon size={16} />
          Seu e-mail ainda não foi verificado!
        </Badge>
      )}

      <small className="text-end lowercase text-muted-foreground">
        Entrou em {formatDate(user.created_at)}
      </small>

      <NameSection user={user} />
      <EmailSection user={user} />
      <PhoneSection user={user} />

      <AddressSection address={user.address[0]} />
      <EmailVerificationSession user={user} />
      <ReviewSection user={user} />

      <p className="font-semibold uppercase text-primary">Avaliações</p>

      {reviews.length === 0 ? (
        <p className="text-center text-sm font-medium uppercase text-primary">
          Seja o primeiro(a) a deixar uma avaliação
        </p>
      ) : (
        <ReviewList reviews={reviews} />
      )}

      <SignOutButton />
    </>
  );
};

export default Home;
