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

import { updateUserEmail } from "@/app/actions/user";

import { toast } from "sonner";

const schema = yup.object({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Por favor, insira um e-mail válido."),
});

type FormData = yup.InferType<typeof schema>;

interface EditEmailFormProps {
  closeComponent: () => void;
  userEmail: string;
}

const EditEmailForm = ({ closeComponent, userEmail }: EditEmailFormProps) => {
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
    if (!session) return;

    setIsLoading(true);

    if (data.email === userEmail) {
      setIsLoading(false);
      setError("email", {
        type: "manual",
        message: "Este e-mail já está cadastrado no seus dados.",
      });

      return;
    }

    await updateUserEmail({ userId: session.user.id, email: data.email });

    reset();
    setIsLoading(false);
    closeComponent();
    toast("O email do usuário foi alterado.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
      <div className="flex items-center gap-5">
        <Input
          placeholder="Insira seu endereço de e-mail"
          {...register("email")}
          className={cn(
            errors.email && "border-red-600 focus-visible:ring-red-600",
          )}
        />

        <div className="flex justify-end gap-5 md:justify-normal">
          <CancelButton closeComponent={closeComponent} isLoading={isLoading} />
          <SubmitEditButton isLoading={isLoading} />
        </div>
      </div>

      {errors.email && (
        <p className="text-xs text-red-600">{errors.email.message}</p>
      )}
    </form>
  );
};

export default EditEmailForm;
