"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/(home)/components/form/input-form";
import SubmitButton from "@/app/(home)/components/form/submit-button";
import { SignUpFormData } from "@/app/types";
import { createNewUser } from "@/app/action/user";
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

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordConfirmationValue = watch("passwordConfirmation");

  const onSubmit = async (data: SignUpFormData) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    setIsLoading(true);

    try {
      await createNewUser(formData);
      reset();
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("email já está em uso")
      ) {
        setError("email", {
          type: "manual",
          message: "Este email já está em uso, tente outro.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-5">
        <div className="flex gap-5">
          <InputForm
            label="Nome"
            placeholder="Digite seu nome"
            register={{ ...register("firstName") }}
            error={errors.firstName?.message}
            value={firstNameValue}
          />
          <InputForm
            label="Sobrenome"
            placeholder="Digite seu sobrenome"
            register={{ ...register("lastName") }}
            error={errors.lastName?.message}
            value={lastNameValue}
          />
        </div>
        <InputForm
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          register={{ ...register("email") }}
          error={errors.email?.message}
          value={emailValue}
        />
        <InputForm
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          register={{ ...register("password") }}
          error={errors.password?.message}
          value={passwordValue}
        />
        <InputForm
          label="Confirmação de senha"
          type="password"
          placeholder="Digite sua senha novamente"
          register={{ ...register("passwordConfirmation") }}
          error={errors.passwordConfirmation?.message}
          value={passwordConfirmationValue}
        />
      </div>

      <SubmitButton isLoading={isLoading}>
        {isLoading ? "Carregando" : "Próximo"}
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;
