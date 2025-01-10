"use client";

import { useState } from "react";

import InfoRow from "@/app/(home)/components/info-row";
import EditNameForm from "@/app/(home)/components/sections/name/edit-name-form";

import { User } from "@prisma/client";

interface NameSectionProps {
  user: Pick<User, "name" | "lastName">;
}

const NameSection = ({ user }: NameSectionProps) => {
  const [isNameFormVisible, setIsNameFormVisible] = useState(false);

  return isNameFormVisible ? (
    <EditNameForm closeComponent={() => setIsNameFormVisible(false)} />
  ) : (
    <InfoRow type="name" openComponent={() => setIsNameFormVisible(true)}>
      {user.name} {user.lastName}
    </InfoRow>
  );
};

export default NameSection;
