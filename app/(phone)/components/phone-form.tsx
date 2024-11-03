"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SkipButton from "@/app/components/skip-button";
import SubmitButton from "@/app/components/submit-button";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { updatePhoneNumber } from "@/app/actions/phone";

import { PhoneFormProps } from "@/app/types";

const schema = yup.object({
  phoneNumber: yup
    .string()
    .required("O número de telefone é obrigatório.")
    .min(11, "O número de telefone precisa ter 11 números."),
});

const PhoneForm = ({ closeComponent }: PhoneFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  const {
    handleSubmit,

    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { phoneNumber: string }) => {
    if (session) {
      const formData = {
        userId: session.user.id,
        phoneNumber: data.phoneNumber,
      };

      setIsLoading(true);

      await updatePhoneNumber(formData).then(() => {
        reset();
        setIsLoading(false);

        if (pathname === "/admin") {
          if (closeComponent) {
            closeComponent();
          }

          return;
        } else {
          router.replace("/address");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div>
        <PhoneInput
          country={"br"}
          onChange={(value) => setValue("phoneNumber", value)}
          placeholder="(99) 99999-9999"
          inputClass={`${errors.phoneNumber ? "border-red-600" : ""}`}
        />
        {errors.phoneNumber && (
          <small className="text-red-600">{errors.phoneNumber.message}</small>
        )}
      </div>

      <div className="flex items-center justify-end gap-5">
        <SubmitButton isLoading={isLoading} showIcon={false} className="w-fit">
          {isLoading ? "Carregando" : "Atualizar"}
        </SubmitButton>
        {pathname === "/admin" ? "" : <SkipButton href="/address" />}
      </div>
    </form>
  );
};

export default PhoneForm;
