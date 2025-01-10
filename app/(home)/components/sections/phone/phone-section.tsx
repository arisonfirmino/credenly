"use client";

import { useState } from "react";

import InfoRow from "@/app/(home)/components/info-row";
import EditPhoneForm from "@/app/(home)/components/sections/phone/edit-phone-form";

import { User } from "@prisma/client";
import { formatPhoneNumber } from "@/app/helpers/formatPhoneNumber";

interface PhoneSectionProps {
  user: Pick<User, "phone">;
}

const PhoneSection = ({ user }: PhoneSectionProps) => {
  const [isPhoneFormVisible, setIsPhoneFormVisible] = useState(false);

  return isPhoneFormVisible ? (
    <EditPhoneForm closeComponent={() => setIsPhoneFormVisible(false)} />
  ) : (
    <InfoRow type="phone" openComponent={() => setIsPhoneFormVisible(true)}>
      {user.phone ? formatPhoneNumber(user.phone) : "+55 99 99999-9999"}
    </InfoRow>
  );
};

export default PhoneSection;
