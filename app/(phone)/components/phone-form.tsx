"use client";

import { usePathname, useRouter } from "next/navigation";
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
import CancelButton from "@/app/(home)/components/update_forms/cancel-button";
import { ArrowRightLeftIcon, LoaderCircleIcon } from "lucide-react";

const schema = yup.object({
  phone: yup
    .string()
    .required("Este campo é obrigatório.")
    .length(13, "O número de telefone deve conter 13 dígitos."),
});

type FormData = yup.InferType<typeof schema>;

interface PhoneFormProps {
  closeComponent?: () => void;
  showSonner?: (value: boolean) => void;
}

const PhoneForm = ({ closeComponent, showSonner }: PhoneFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const pathname = usePathname();
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

      if (closeComponent) {
        closeComponent();
      }

      if (showSonner) {
        showSonner(true);
        setTimeout(() => {
          showSonner(false);
        }, 3500);
      }

      if (pathname === "/") {
        return;
      } else {
        router.replace("/address");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        pathname === "/"
          ? "flex items-center justify-between"
          : "w-full max-w-md space-y-5"
      }
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
          {pathname === "/" ? (
            <>
              {isLoading ? (
                <LoaderCircleIcon size={16} className="animate-spin" />
              ) : (
                <ArrowRightLeftIcon size={16} />
              )}
            </>
          ) : (
            <>{isLoading ? "Carregando" : "Cadastrar"}</>
          )}
        </SubmitButton>
        {pathname === "/" ? (
          closeComponent && (
            <CancelButton
              closeComponent={closeComponent}
              isLoading={isLoading}
            />
          )
        ) : (
          <SkipButton href="/address" />
        )}
      </div>
    </form>
  );
};

export default PhoneForm;
