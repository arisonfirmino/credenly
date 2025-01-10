"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputSection from "@/app/components/input-section";
import SubmitButton from "@/app/components/submit-button";

import { toast } from "sonner";

import { createNewUser } from "@/app/actions/user";
import { checkEmailExists } from "@/app/helpers/userAuth";

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
  email: yup
    .string()
    .required("O email é obrigatório.")
    .email("Por favor, insira um e-mail válido."),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(8, "A senha precisa ter pelo menos 8 caracteres."),
  passwordConfirmation: yup
    .string()
    .required("A confirmação de senha é obrigatória.")
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais."),
});

type FormData = yup.InferType<typeof schema>;

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
    setIsLoading(true);

    const isEmailAvailable = await checkEmailExists({ email: data.email });

    if (isEmailAvailable) {
      setIsLoading(false);
      setError("email", {
        type: "manual",
        message: "Este e-mail já está em uso, por favor tente outro.",
      });

      return;
    }

    await createNewUser({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    reset();
    setIsLoading(false);
    router.replace("/");
    toast(`Bem vindo(a), ${data.name} ${data.lastName}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <InputSection
          label="Nome"
          placeholder="Digite seu nome"
          register={{ ...register("name") }}
          error={errors.name}
        />

        <InputSection
          label="Sobrenome"
          placeholder="Digite seu sobrenome"
          register={{ ...register("lastName") }}
          error={errors.lastName}
        />
      </div>

      <InputSection
        label="E-mail"
        placeholder="Insira seu endereço de e-mail"
        register={{ ...register("email") }}
        error={errors.email}
      />

      <InputSection
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        register={{ ...register("password") }}
        error={errors.password}
      />

      <InputSection
        label="Confirmação de senha"
        placeholder="Digite sua senha novamente"
        type="password"
        register={{ ...register("passwordConfirmation") }}
        error={errors.passwordConfirmation}
      />

      <SubmitButton isLoading={isLoading}>Cadastrar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
