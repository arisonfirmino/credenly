"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";

import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";
import CancelButton from "@/app/(home)/components/cancel-button";

import { addAddress } from "@/app/actions/address";

import { toast } from "sonner";

const schema = yup.object({
  zipCode: yup
    .string()
    .required("Campo obrigatório.")
    .matches(/^\d{8}$/, "O CEP deve conter 8 dígitos."),
  street: yup
    .string()
    .required("Campo obrigatório.")
    .min(3, "O nome da rua deve conter pelo menos 3 caracteres."),
  number: yup
    .number()
    .required("Campo obrigatório.")
    .typeError("Por favor, insira um número válido."),
  neighborhood: yup
    .string()
    .required("Campo obrigatório.")
    .min(3, "O nome do bairro deve conter pelo menos 3 caracteres."),
  state: yup
    .string()
    .required("Campo obrigatório.")
    .matches(
      /^[A-Za-z]{2}$/,
      "Por favor, insira somente a sigla do estado (ex.: SP, RJ).",
    ),
  city: yup
    .string()
    .required("Campo obrigatório.")
    .min(3, "O nome do bairro deve conter pelo menos 3 caracteres."),
  additionalInfo: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

interface AddressFormProps {
  isEditing: boolean;
  setIsEditing: () => void;
}

const AddressForm = ({ isEditing, setIsEditing }: AddressFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const zipCode = watch("zipCode");

  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then((response) => {
          const { logradouro, bairro, localidade, uf } = response.data;

          setValue("street", logradouro || "");
          setValue("neighborhood", bairro || "");
          setValue("city", localidade || "");
          setValue("state", uf || "");
        })
        .catch(() => {
          toast.error("Erro ao buscar informações do CEP.");
        });
    }
  }, [zipCode, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setIsLoading(true);

    await addAddress({
      userId: session.user.id,
      zipCode: data.zipCode,
      street: data.street,
      number: String(data.number),
      neighborhood: data.neighborhood,
      state: data.state,
      city: data.city,
      additionalInfo: data.additionalInfo || "",
    });

    reset();
    setIsLoading(false);
    setIsEditing();
    toast("O endereço foi atualizado.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full space-y-1.5">
          <Input
            placeholder="CEP"
            {...register("zipCode")}
            className={cn(
              errors.zipCode && "border-red-600 focus-visible:ring-red-600",
            )}
          />
          {errors.zipCode && (
            <p className="text-xs text-red-600">{errors.zipCode.message}</p>
          )}
        </div>

        <div className="w-full space-y-1.5">
          <Input
            placeholder="Rua"
            {...register("street")}
            className={cn(
              errors.street && "border-red-600 focus-visible:ring-red-600",
            )}
          />
          {errors.street && (
            <p className="text-xs text-red-600">{errors.street.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full space-y-1.5">
          <Input
            placeholder="Número"
            {...register("number")}
            className={cn(
              errors.number && "border-red-600 focus-visible:ring-red-600",
            )}
          />
          {errors.number && (
            <p className="text-xs text-red-600">{errors.number.message}</p>
          )}
        </div>

        <div className="w-full space-y-1.5">
          <Input
            placeholder="Cidade"
            {...register("city")}
            className={cn(
              errors.city && "border-red-600 focus-visible:ring-red-600",
            )}
          />
          {errors.city && (
            <p className="text-xs text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div className="w-full space-y-1.5">
          <Input
            placeholder="Estado"
            {...register("state")}
            className={cn(
              errors.state && "border-red-600 focus-visible:ring-red-600",
            )}
          />
          {errors.state && (
            <p className="text-xs text-red-600">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full space-y-1.5">
          <Input
            placeholder="Bairro"
            {...register("neighborhood")}
            className={cn(
              errors.neighborhood &&
                "border-red-600 focus-visible:ring-red-600",
            )}
          />
          {errors.neighborhood && (
            <p className="text-xs text-red-600">
              {errors.neighborhood.message}
            </p>
          )}
        </div>

        <Input
          placeholder="Complemento"
          {...register("additionalInfo")}
          className={cn(
            errors.additionalInfo &&
              "border-red-600 focus-visible:ring-red-600",
          )}
        />
      </div>

      <div className="flex items-center gap-5">
        {isEditing && (
          <CancelButton closeComponent={setIsEditing} isLoading={isLoading} />
        )}
        <SubmitButton isLoading={isLoading}>Atualizar</SubmitButton>
      </div>
    </form>
  );
};

export default AddressForm;
