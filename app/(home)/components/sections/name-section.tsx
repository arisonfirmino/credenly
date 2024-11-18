"use client";

import { useState } from "react";
import InfoRow from "@/app/(home)/components/info-row";
import UpdateNameForm from "@/app/(home)/components/update_forms/update-name-form";
import Sonner from "@/app/components/sonner";
import { User } from "@prisma/client";

interface NameSectionProps {
  user: Pick<User, "firstName" | "lastName">;
}

const NameSection = ({ user }: NameSectionProps) => {
  const [isNameFormVisible, setIsNameFormVisible] = useState(false);
  const [isNameUpdated, setIsNameUpdated] = useState(false);

  return (
    <>
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
    </>
  );
};

export default NameSection;
