"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";
import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { checkEmailExists, comparePassword } from "@/app/helpers/existingUser";

const schema = yup.object({
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .email("Insira um e-mail válido."),
  password: yup.string().required("Este campo é obrigatório."),
});

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const emailExists = await checkEmailExists({ email: data.email });

    if (!emailExists) {
      setError("email", {
        type: "manual",
        message: "Usuário não cadastrado.",
      });
      setIsLoading(false);
      return;
    }

    const isPasswordValid = await comparePassword({
      email: data.email,
      password: data.password,
    });

    if (!isPasswordValid) {
      setError("password", {
        type: "manual",
        message: "Senha incorreta.",
      });
      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    }).then(() => {
      setIsLoading(false);
      router.replace("/");
    });

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
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
      <SubmitButton disable={isLoading} className="w-full justify-between">
        {isLoading ? "Carregando" : "Entrar"}
        {isLoading ? (
          <LoaderCircleIcon size={16} className="animate-spin" />
        ) : (
          <MoveRightIcon size={16} />
        )}
      </SubmitButton>
    </form>
  );
};

export default SignInForm;
