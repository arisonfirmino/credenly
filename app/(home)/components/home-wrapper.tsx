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
import UpdatePhoneForm from "@/app/(home)/components/update_forms/update-phone-form";
import UpdateNameForm from "@/app/(home)/components/update_forms/update-name-form";
import Sonner from "@/app/components/sonner";
import UpdateEmailForm from "@/app/(home)/components/update_forms/update-email-form";

interface HomeWrapperProps {
  user: Prisma.UserGetPayload<{
    include: {
      address: true;
      review: true;
    };
  }>;
}

const HomeWrapper = ({ user }: HomeWrapperProps) => {
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isEmailVerificationVisible, setIsEmailVerificationVisible] =
    useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const [isNameFormVisible, setIsNameFormVisible] = useState(false);
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);
  const [isPhoneFormVisible, setIsPhoneFormVisible] = useState(false);

  const [isNameUpdated, setIsNameUpdated] = useState(false);
  const [isPhoneUpdated, setIsPhoneUpdated] = useState(false);
  const [isAddressUpdated, setIsAddressUpdated] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [isAddressDeleted, setIsAddressDeleted] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isReviewCreated, setIsReviewCreated] = useState(false);
  const [isReviewDeleted, setIsReviewDeleted] = useState(false);

  return (
    <div className="w-full space-y-5 py-5 md:w-[448px] md:px-0 md:pt-40">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>entrou em {formatDate(user.created_at)}</span>
        <span>atualizado em {formatDate(user.update_at)}</span>
      </div>

      {isNameFormVisible ? (
        <UpdateNameForm
          closeComponent={() => setIsNameFormVisible(false)}
          showSonner={setIsNameUpdated}
        />
      ) : (
        <InfoRow
          setUpdateForm={setIsNameFormVisible}
          className="font-medium capitalize !text-black"
        >
          {user.firstName} {user.lastName}
        </InfoRow>
      )}

      {isNameUpdated && <Sonner>Nome atualizado com sucesso!</Sonner>}

      {isEmailFormVisible ? (
        <UpdateEmailForm
          closeComponent={() => setIsEmailFormVisible(!isEmailFormVisible)}
          showSonner={setIsEmailUpdated}
        />
      ) : (
        <InfoRow
          setUpdateForm={setIsEmailFormVisible}
          className={!user.emailVerified ? "border-yellow-500" : ""}
        >
          {user.email}
        </InfoRow>
      )}

      {isEmailUpdated && (
        <Sonner>Seu e-mail foi atualizado com sucesso!</Sonner>
      )}

      {isPhoneFormVisible ? (
        <UpdatePhoneForm
          closeComponent={() => setIsPhoneFormVisible(false)}
          showSonner={setIsPhoneUpdated}
        />
      ) : (
        <InfoRow
          className={!user.phone ? "border-yellow-500" : ""}
          showInteractionButton={!user.phone ? false : true}
          setUpdateForm={setIsPhoneFormVisible}
        >
          {user.phone
            ? `${formatPhoneNumber(user.phone)}`
            : "nenhum número de telefone cadastrado"}
        </InfoRow>
      )}

      {isPhoneUpdated && (
        <Sonner>Número de telefone atualizado com sucesso!</Sonner>
      )}

      <ActionButton
        showComponent={isAddressVisible}
        handleClick={() => setIsAddressVisible(!isAddressVisible)}
        className={
          user.address.length === 0 ? "border-yellow-500 text-yellow-500" : ""
        }
      >
        Endereço
      </ActionButton>

      {isAddressVisible &&
        (user.address.length === 0 ? (
          <AddressForm showSonner={setIsAddressUpdated} />
        ) : (
          <AddressData
            address={user.address[0]}
            showSonner={setIsAddressDeleted}
          />
        ))}

      {isAddressUpdated && <Sonner>Endereço atualizado com sucesso!</Sonner>}
      {isAddressDeleted && <Sonner>Endereço deletado com sucesso!</Sonner>}

      <ActionButton
        showComponent={isEmailVerificationVisible}
        handleClick={() =>
          setIsEmailVerificationVisible(!isEmailVerificationVisible)
        }
        className={
          !user.emailVerified ? "border-yellow-500 text-yellow-500" : ""
        }
      >
        Verifique seu e-mail
      </ActionButton>

      {isEmailVerificationVisible &&
        (user.emailVerified ? (
          <p className="text-center text-green-600">
            Já verificamos seu e-mail.
          </p>
        ) : (
          <EmailVerificationForm
            hasCode={user.verificationCode || ""}
            showSonner={setIsEmailVerified}
          />
        ))}

      {isEmailVerified && (
        <Sonner>Seu e-mail foi verificado com sucesso!</Sonner>
      )}

      <ActionButton
        showComponent={isReviewVisible}
        handleClick={() => setIsReviewVisible(!isReviewVisible)}
      >
        Deixe uma avaliação
      </ActionButton>

      {isReviewVisible && (
        <>
          {user.review.length === 0 ? (
            ""
          ) : (
            <>
              <p className="text-sm text-yellow-500">
                Você já deixou uma avaliação! Se quiser atualizar, basta
                preencher o formulário abaixo.
              </p>
              <DeleteReviewButton
                reviewId={user.review[0].id}
                showSonner={setIsReviewDeleted}
              />
            </>
          )}
          <ReviewForm
            setShowReview={setIsReviewVisible}
            showSonner={setIsReviewCreated}
          />
        </>
      )}

      {isReviewCreated && <Sonner>Avaliação enviada com sucesso!</Sonner>}
      {isReviewDeleted && <Sonner>Avaliação deletada com sucesso!</Sonner>}

      <SignOutButton />
    </div>
  );
};

export default HomeWrapper;
