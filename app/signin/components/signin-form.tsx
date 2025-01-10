"use client";

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
import { checkEmailExists, comparePassword } from "@/app/helpers/userAuth";

const schema = yup.object({
  email: yup
    .string()
    .required("O email é obrigatório.")
    .email("Por favor, insira um e-mail válido."),
  password: yup.string().required("A senha é obrigatória."),
});

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
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

    const isEmailExists = await checkEmailExists({ email: data.email });

    if (!isEmailExists) {
      setIsLoading(false);
      setError("email", {
        type: "manual",
        message: "Usuário não cadastrado.",
      });

      return;
    }

    const isPasswordValid = await comparePassword({
      email: data.email,
      password: data.password,
    });

    if (!isPasswordValid) {
      setIsLoading(false);
      setError("password", {
        type: "manual",
        message: "Senha incorreta.",
      });

      return;
    }

    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    reset();
    setIsLoading(false);
    router.replace("/");
    toast("Bem vindo(a) de volta");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

      <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
