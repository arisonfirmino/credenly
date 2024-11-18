"use client";

import { useState } from "react";
import InfoRow from "@/app/(home)/components/info-row";
import UpdatePhoneForm from "@/app/(home)/components/update_forms/update-phone-form";
import Sonner from "@/app/components/sonner";
import { formatPhoneNumber } from "@/app/helpers/formatPhoneNumber";
import { User } from "@prisma/client";

interface PhoneSectionProps {
  user: Pick<User, "phone">;
}

const PhoneSection = ({ user }: PhoneSectionProps) => {
  const [isPhoneFormVisible, setIsPhoneFormVisible] = useState(false);
  const [isPhoneUpdated, setIsPhoneUpdated] = useState(false);

  return (
    <>
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
    </>
  );
};

export default PhoneSection;
