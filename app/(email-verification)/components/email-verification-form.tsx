"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputForm from "@/app/components/input-form";
import SubmitButton from "@/app/components/submit-button";
import SkipButton from "@/app/components/skip-button";
import SendCodeButton from "@/app/(email-verification)/components/send-code-button";
import { updateEmailVerified, verifyCode } from "@/app/helpers/emailService";

const schema = yup.object({
  code: yup
    .string()
    .required("Este campo é obrigatório.")
    .length(6, "O código deve conter 6 dígitos."),
});

type FormData = yup.InferType<typeof schema>;

const EmailVerificationForm = ({ hasCode }: { hasCode: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const pathname = usePathname();
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
    if (session) {
      setIsLoading(true);

      const isCodeValid = await verifyCode(session.user.id, data.code);

      if (!isCodeValid) {
        setError("code", {
          type: "manual",
          message: "O código de verificação está incorreto ou expirou.",
        });
        setIsLoading(false);
        return;
      }

      await updateEmailVerified({
        userId: session.user.id,
        code: data.code,
      });

      setIsLoading(false);
      reset();
      if (pathname === "/") {
        return;
      } else {
        router.replace("/phone");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full space-y-5 ${pathname === "/" ? "text-sm" : "text-base"}`}
    >
      <div className="flex items-end gap-5">
        <InputForm
          label="Código de verificação"
          placeholder="000000"
          register={{ ...register("code") }}
          error={errors.code}
        />
        <SendCodeButton hasCode={hasCode} />
      </div>
      <div className="flex justify-end gap-5">
        <SubmitButton disable={isLoading}>
          {isLoading ? "Carregando" : "Confirmar"}
        </SubmitButton>
        <SkipButton href="/phone" />
      </div>
    </form>
  );
};

export default EmailVerificationForm;
