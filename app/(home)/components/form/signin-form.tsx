"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/(home)/components/form/input-form";
import SubmitButton from "@/app/(home)/components/form/submit-button";
import { SignInFormData } from "@/app/types";

const schema = yup.object({
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .email("Insira um e-mail válido."),
  password: yup.string().required("Este campo é obrigatório."),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = (data: SignInFormData) => {
    console.log("Usuário logado:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-5">
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
        <p className="cursor-pointer text-sm text-blue-700 hover:underline">
          Esqueci minha senha
        </p>
      </div>
      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
