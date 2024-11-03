"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";

import { signIn } from "next-auth/react";

import { SignInFormData } from "@/app/types";

const schema = yup.object({
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .email("Insira um e-mail válido."),
  password: yup.string().required("Este campo é obrigatório."),
});

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "Usuário não cadastrado.") {
        setError("email", {
          type: "manual",
          message: "Usuário não cadastrado.",
        });
      } else if (result.error === "Senha incorreta.") {
        setError("password", {
          type: "manual",
          message: "Senha incorreta.",
        });
      }

      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    reset();
    router.replace("/admin");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-5">
        <InputForm
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          register={{ ...register("email") }}
          error={errors.email}
          value={emailValue}
        />
        <InputForm
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          register={{ ...register("password") }}
          error={errors.password}
          value={passwordValue}
        />
        <p className="cursor-pointer text-sm text-blue-700 hover:underline">
          Esqueci minha senha
        </p>
      </div>
      <SubmitButton isLoading={isLoading}>
        {isLoading ? "Carregando" : "Entrar"}
      </SubmitButton>
    </form>
  );
};

export default SignInForm;
