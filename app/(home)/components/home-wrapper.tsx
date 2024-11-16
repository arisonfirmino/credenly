"use client";

import { useState } from "react";
import InfoRow from "@/app/(home)/components/info-row";
import ActionButton from "@/app/(home)/components/action-button";
import SignOutButton from "@/app/(home)/components/signout-button";
import { Prisma } from "@prisma/client";
import EmailVerificationForm from "@/app/(email-verification)/components/email-verification-form";
import { formatDate } from "@/app/helpers/formatDate";
import AddressForm from "@/app/(address)/components/address-form";
import AddressData from "@/app/(home)/components/address-data";
import { formatPhoneNumber } from "@/app/helpers/formatPhoneNumber";
import ReviewForm from "@/app/(home)/components/review/review-form";
import DeleteReviewButton from "./review/delete-review-button";

interface HomeWrapperProps {
  user: Prisma.UserGetPayload<{
    include: {
      address: true;
      review: true;
    };
  }>;
}

const HomeWrapper = ({ user }: HomeWrapperProps) => {
  const [showAddress, setShowAddress] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="w-full space-y-5 py-5 md:w-[448px] md:px-0 md:pt-40">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>entrou em {formatDate(user.created_at)}</span>
        <span>atualizado em {formatDate(user.update_at)}</span>
      </div>

      <InfoRow className="font-medium capitalize !text-black">
        {user.firstName} {user.lastName}
      </InfoRow>

      <InfoRow className={!user.emailVerified ? "border-yellow-500" : ""}>
        {user.email}
      </InfoRow>

      <InfoRow
        className={!user.phone ? "border-yellow-500" : ""}
        showInteractionButton={!user.phone ? false : true}
      >
        {user.phone
          ? `${formatPhoneNumber(user.phone)}`
          : "nenhum número de telefone cadastrado"}
      </InfoRow>

      <ActionButton
        showComponent={showAddress}
        handleClick={() => setShowAddress(!showAddress)}
        className={
          user.address.length === 0 ? "border-yellow-500 text-yellow-500" : ""
        }
      >
        Endereço
      </ActionButton>

      {showAddress &&
        (user.address.length === 0 ? (
          <AddressForm />
        ) : (
          <AddressData address={user.address[0]} />
        ))}

      <ActionButton
        showComponent={showEmailVerification}
        handleClick={() => setShowEmailVerification(!showEmailVerification)}
        className={
          !user.emailVerified ? "border-yellow-500 text-yellow-500" : ""
        }
      >
        Verifique seu e-mail
      </ActionButton>

      {showEmailVerification &&
        (user.emailVerified ? (
          <p className="text-center text-green-600">
            Já verificamos seu e-mail.
          </p>
        ) : (
          <EmailVerificationForm hasCode={user.verificationCode || ""} />
        ))}

      <ActionButton
        showComponent={showReview}
        handleClick={() => setShowReview(!showReview)}
      >
        Deixe uma avaliação
      </ActionButton>

      {showReview && (
        <>
          {user.review.length === 0 ? (
            ""
          ) : (
            <>
              <p className="text-sm text-yellow-500">
                Você já deixou uma avaliação! Se quiser atualizar, basta
                preencher o formulário abaixo.
              </p>
              <DeleteReviewButton reviewId={user.review[0].id} />
            </>
          )}
          <ReviewForm setShowReview={setShowReview} />
        </>
      )}
      <SignOutButton />
    </div>
  );
};

export default HomeWrapper;
