"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";

import { Input } from "@/app/components/ui/input";

import CancelButton from "@/app/(home)/components/cancel-button";
import SubmitEditButton from "@/app/(home)/components/submit-edit-button";

import { updateUserName } from "@/app/actions/user";

import { toast } from "sonner";

const schema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome precisa ter pelo menos 3 caracteres.")
    .matches(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "O nome não pode conter números ou caracteres especiais.",
    ),
  lastName: yup
    .string()
    .required("O sobrenome é obrigatório.")
    .min(3, "O sobrenome precisa ter pelo menos 3 caracteres.")
    .matches(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "O sobrenome não pode conter números ou caracteres especiais.",
    ),
});

type FormData = yup.InferType<typeof schema>;

interface EditNameFormProps {
  closeComponent: () => void;
}

const EditNameForm = ({ closeComponent }: EditNameFormProps) => {
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
    if (!session) return;

    setIsLoading(true);

    await updateUserName({
      userId: session.user.id,
      name: data.name,
      lastName: data.lastName,
    });

    reset();
    setIsLoading(false);
    closeComponent();
    toast("O nome de usuário foi alterado.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-5 md:flex-row"
    >
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Input
          placeholder="Digite seu nome"
          {...register("name")}
          className={cn(
            errors.name && "border-red-600 focus-visible:ring-red-600",
          )}
        />

        <Input
          placeholder="Digite seu sobrenome"
          {...register("lastName")}
          className={cn(
            errors.lastName && "border-red-600 focus-visible:ring-red-600",
          )}
        />
      </div>

      <div className="flex w-full justify-end gap-5 md:w-fit md:justify-normal">
        <CancelButton isLoading={isLoading} closeComponent={closeComponent} />
        <SubmitEditButton isLoading={isLoading} />
      </div>
    </form>
  );
};

export default EditNameForm;
