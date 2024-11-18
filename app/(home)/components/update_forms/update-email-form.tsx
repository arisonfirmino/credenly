"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";
import { ArrowRightLeftIcon, LoaderCircleIcon } from "lucide-react";
import CancelButton from "@/app/(home)/components/update_forms/cancel-button";
import { updateUserEmail } from "@/app/actions/user";
import { checkEmailAvailability } from "@/app/helpers/existingUser";

const schema = yup.object({
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .email("Insira um e-mail válido."),
});

type FormData = yup.InferType<typeof schema>;

interface UpdateEmailProps {
  closeComponent: () => void;
  showSonner: (value: boolean) => void;
}

const UpdateEmailForm = ({ closeComponent, showSonner }: UpdateEmailProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (session) {
      setIsLoading(true);

      const isEmailAvailable = await checkEmailAvailability({
        email: data.email,
      });

      if (!isEmailAvailable) {
        setError("email", {
          type: "manual",
          message: "Este e-mail já está em uso, por favor tente outro.",
        });
        setIsLoading(false);
        return;
      }

      await updateUserEmail({ userId: session.user.id, email: data.email });

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
      className="flex items-center gap-5 text-sm"
    >
      <InputForm
        placeholder="Insira seu novo endereço de e-mail"
        register={{ ...register("email") }}
        error={errors.email}
      />
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

export default UpdateEmailForm;
