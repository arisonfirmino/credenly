"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import CancelButton from "@/app/(home)/components/cancel-button";
import SubmitEditButton from "@/app/(home)/components/submit-edit-button";
import { updateUserPhone } from "@/app/actions/user";

const schema = yup.object({
  phone: yup
    .string()
    .required("Este campo é obrigatório.")
    .length(13, "O número de telefone deve conter 13 dígitos."),
});

type FormData = yup.InferType<typeof schema>;

interface EditPhoneFormProps {
  closeComponent: () => void;
}

const EditPhoneForm = ({ closeComponent }: EditPhoneFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setIsLoading(true);

    await updateUserPhone({ userId: session.user.id, phone: data.phone });

    reset();
    setIsLoading(false);
    closeComponent();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
      <div className="flex items-center gap-5">
        <PhoneInput
          country={"br"}
          onChange={(value) => setValue("phone", value)}
          placeholder="(99) 99999-9999"
          inputClass={`${errors.phone ? "border-red-600" : ""}`}
        />

        <div className="flex justify-end gap-5 md:justify-normal">
          <CancelButton closeComponent={closeComponent} isLoading={isLoading} />
          <SubmitEditButton isLoading={isLoading} />
        </div>
      </div>

      {errors.phone && (
        <p className="text-xs text-red-600">{errors.phone.message}</p>
      )}
    </form>
  );
};

export default EditPhoneForm;
