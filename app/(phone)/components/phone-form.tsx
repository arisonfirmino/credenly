"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SkipButton from "@/app/components/skip-button";
import SubmitButton from "@/app/components/submit-button";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { updatePhoneNumber } from "@/app/actions/user";

const schema = yup.object({
  phone: yup
    .string()
    .required("Este campo é obrigatório.")
    .length(13, "O número de telefone deve conter 13 dígitos."),
});

type FormData = yup.InferType<typeof schema>;

const PhoneForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (session) {
      setIsLoading(true);

      await updatePhoneNumber({ userId: session.user.id, phone: data.phone });

      setIsLoading(false);
      reset();
      router.replace("/address");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-5"
    >
      <div>
        <PhoneInput
          country={"br"}
          onChange={(value) => setValue("phone", value)}
          placeholder="(99) 99999-9999"
          inputClass={`${errors.phone ? "border-red-600" : ""}`}
        />
        {errors.phone && (
          <small className="text-red-600">{errors.phone.message}</small>
        )}
      </div>
      <div className="flex justify-end gap-5">
        <SubmitButton disable={isLoading}>
          {isLoading ? "Carregando" : "Cadastrar"}
        </SubmitButton>
        <SkipButton href="/address" />
      </div>
    </form>
  );
};

export default PhoneForm;
