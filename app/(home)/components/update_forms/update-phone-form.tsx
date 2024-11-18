"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "@/app/components/submit-button";
import { ArrowRightLeftIcon, LoaderCircleIcon } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { updatePhoneNumber } from "@/app/actions/user";
import CancelButton from "@/app/(home)/components/update_forms/cancel-button";

const schema = yup.object({
  phone: yup
    .string()
    .required("Este campo é obrigatório.")
    .length(13, "O número de telefone deve conter 13 dígitos."),
});

type FormData = yup.InferType<typeof schema>;

interface UpdatePhoneFormProps {
  closeComponent: () => void;
  showSonner: (value: boolean) => void;
}

const UpdatePhoneForm = ({
  closeComponent,
  showSonner,
}: UpdatePhoneFormProps) => {
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
    if (session) {
      setIsLoading(true);

      await updatePhoneNumber({ userId: session.user.id, phone: data.phone });

      reset();
      setIsLoading(false);
      closeComponent();
      showSonner(true);
      setTimeout(() => {
        showSonner(false);
      }, 3500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between text-sm"
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

      <div className="flex items-center gap-2.5">
        <SubmitButton disable={isLoading}>
          {isLoading ? (
            <LoaderCircleIcon size={16} className="animate-spin" />
          ) : (
            <ArrowRightLeftIcon size={16} />
          )}
        </SubmitButton>
        <CancelButton closeComponent={closeComponent} isLoading={isLoading} />
      </div>
    </form>
  );
};

export default UpdatePhoneForm;
