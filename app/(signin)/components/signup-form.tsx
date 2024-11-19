"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";
import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";
import { checkEmailAvailability } from "@/app/helpers/existingUser";
import { createNewUser } from "@/app/actions/user";
import { signIn } from "next-auth/react";

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
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .email("Insira um e-mail válido."),
  password: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(6, "A senha precisa ter no minimo 6 caracteres.")
    .matches(/[A-Z]/, "A senha precisa ter pelo menos uma letra maiúscula.")
    .matches(/[0-9]/, "A senha precisa ter pelo menos um número.")
    .matches(
      /[@$!%*?&]/,
      "A senha precisa ter pelo menos um caractere especial.",
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas precisam ser iguais.")
    .required("Este campo é obrigatório."),
});

type FormData = yup.InferType<typeof schema>;

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

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

    await createNewUser(formData);

    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);
    reset();
    router.replace("/email-verification");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <InputForm
          label="Nome"
          placeholder="Digite seu nome"
          register={{ ...register("firstName") }}
          error={errors.firstName}
        />
        <InputForm
          label="Sobrenome"
          placeholder="Digite seu sobrenome"
          register={{ ...register("lastName") }}
          error={errors.lastName}
        />
      </div>

      <InputForm
        label="E-mail"
        placeholder="Insira seu endereço de e-mail"
        register={{ ...register("email") }}
        error={errors.email}
      />
      <InputForm
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        register={{ ...register("password") }}
        error={errors.password}
      />
      <InputForm
        label="Confirmação de senha"
        placeholder="Digite sua senha novamente"
        type="password"
        register={{ ...register("passwordConfirmation") }}
        error={errors.passwordConfirmation}
      />

      <SubmitButton disable={isLoading} className="w-full justify-between">
        {isLoading ? "Carregando" : "Próximo"}
        {isLoading ? (
          <LoaderCircleIcon size={16} className="animate-spin" />
        ) : (
          <MoveRightIcon size={16} />
        )}
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;
