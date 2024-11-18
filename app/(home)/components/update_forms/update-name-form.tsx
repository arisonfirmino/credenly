"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputForm from "@/app/components/input-form";
import CancelButton from "./cancel-button";
import SubmitButton from "@/app/components/submit-button";
import { ArrowRightLeftIcon, LoaderCircleIcon } from "lucide-react";
import { updateUserName } from "@/app/actions/user";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "O nome precisa ter no minimo 3 caracteres.")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
      "O nome não pode conter caracteres especiais.",
    ),
  lastName: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "O sobrenome precisa ter no minimo 3 caracteres.")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
      "O sobrenome não pode conter caracteres especiais.",
    ),
});

type FormData = yup.InferType<typeof schema>;

interface UpdateNameFormProps {
  closeComponent: () => void;
  showSonner: (value: boolean) => void;
}

const UpdateNameForm = ({
  closeComponent,
  showSonner,
}: UpdateNameFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (session) {
      setIsLoading(true);

      await updateUserName({
        userId: session.user.id,
        firstName: data.firstName,
        lastName: data.lastName,
      });

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
        placeholder="Digite seu nome"
        register={{ ...register("firstName") }}
        error={errors.firstName}
      />
      <InputForm
        placeholder="Digite seu sobrenome"
        register={{ ...register("lastName") }}
        error={errors.lastName}
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

export default UpdateNameForm;
