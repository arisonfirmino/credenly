"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";

import SubmitButton from "@/app/components/submit-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";

import { toast } from "sonner";
import { verifyCode } from "@/app/actions/user";

const schema = yup.object({
  code: yup.string().required("Insira o código de verificação."),
});

const EmailVerificationForm = ({
  verificationCode,
}: {
  verificationCode: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const code = watch("code", "");

  const onSubmit = async () => {
    if (!session) return;

    setIsLoading(true);

    if (code !== verificationCode) {
      setIsLoading(false);
      setError("code", {
        type: "manual",
        message: "Código invalido.",
      });

      return;
    }

    await verifyCode({ userId: session.user.id, code: verificationCode });

    reset();
    setIsLoading(false);
    toast("Seu e-mail foi verificado.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(newValue: string) => setValue("code", newValue)}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className={cn(errors.code && "border-red-600 ring-red-600")}
            />
            <InputOTPSlot
              index={1}
              className={cn(errors.code && "border-red-600 ring-red-600")}
            />
            <InputOTPSlot
              index={2}
              className={cn(errors.code && "border-red-600 ring-red-600")}
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className={cn(errors.code && "border-red-600 ring-red-600")}
            />
            <InputOTPSlot
              index={4}
              className={cn(errors.code && "border-red-600 ring-red-600")}
            />
            <InputOTPSlot
              index={5}
              className={cn(errors.code && "border-red-600 ring-red-600")}
            />
          </InputOTPGroup>
        </InputOTP>

        <SubmitButton isLoading={isLoading}>Confirmar</SubmitButton>
      </div>

      {errors.code && (
        <p className="text-xs text-red-600">{errors.code.message}</p>
      )}
    </form>
  );
};

export default EmailVerificationForm;
