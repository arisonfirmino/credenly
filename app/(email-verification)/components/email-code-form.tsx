"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputForm from "@/app/components/input-form";
import SendCodeButton from "@/app/components/send-code-button";
import SkipButton from "@/app/components/skip-button";
import SubmitButton from "@/app/components/submit-button";

import { updateEmailVerified, verifyCode } from "@/app/actions/verifyCode";

const schema = yup.object({
  verificationCode: yup.string().required("Este campo é obrigatório."),
});

const EmailCodeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const onSubmit = async (data: { verificationCode: string }) => {
    if (session) {
      setIsLoading(true);

      const isCodeValid = await verifyCode(
        session.user.id,
        data.verificationCode,
      );

      if (!isCodeValid) {
        setError("verificationCode", {
          type: "manual",
          message: "O código de verificação está incorreto ou expirou.",
        });
        setIsLoading(false);
        return;
      }

      await updateEmailVerified({
        userId: session.user.id,
        code: data.verificationCode,
      });

      reset();

      setIsLoading(false);

      if (pathname === "/admin") {
        return;
      } else {
        router.replace("/phone");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="flex items-end gap-5">
        <InputForm
          label="Código de verificação"
          placeholder="000000"
          register={{ ...register("verificationCode") }}
          error={errors.verificationCode}
        />
        <SendCodeButton />
      </div>

      <div className="flex items-center justify-end gap-5">
        <SubmitButton isLoading={isLoading} showIcon={false} className="w-fit">
          {isLoading ? "Carregando" : "Confirmar"}
        </SubmitButton>
        <SkipButton href="/phone" />
      </div>
    </form>
  );
};

export default EmailCodeForm;
