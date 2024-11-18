"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputForm from "@/app/components/input-form";
import SkipButton from "@/app/components/skip-button";
import SubmitButton from "@/app/components/submit-button";
import axios from "axios";
import { updateAddress } from "@/app/actions/address";

const schema = yup.object({
  zipCode: yup
    .string()
    .required("Este campo é obrigatório.")
    .length(8, "O CEP deve ter 8 dígitos.")
    .matches(/^\d+$/, "O CEP deve conter apenas números."),
  street: yup.string().required("Este campo é obrigatório."),
  number: yup
    .number()
    .typeError("Este campo só aceita números.")
    .required("Este campo é obrigatório."),
  neighborhood: yup.string().required("Este campo é obrigatório."),
  state: yup
    .string()
    .required("Este campo é obrigatório.")
    .length(2, "O estado deve ter 2 caracteres."),
  city: yup.string().required("Este campo é obrigatório."),
  additionalInfo: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

interface AddressFormProps {
  showSonner?: (value: boolean) => void;
}

const AddressForm = ({ showSonner }: AddressFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchAddress = async (zipCode: string) => {
    if (zipCode.length !== 8) return;

    const { data } = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    );

    if (data.erro) {
      return;
    }

    setValue("street", data.logradouro);
    setValue("neighborhood", data.bairro);
    setValue("city", data.localidade);
    setValue("state", data.uf);
  };

  const onSubmit = async (data: FormData) => {
    if (session) {
      const formData = {
        userId: session.user.id,
        zipCode: data.zipCode,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        number: String(data.number),
        additionalInfo: data.additionalInfo,
      };

      setIsLoading(true);

      await updateAddress(formData);

      setIsLoading(false);
      reset();

      if (showSonner) {
        showSonner(true);
        setTimeout(() => {
          showSonner(false);
        }, 3500);
      }

      if (pathname === "/") {
        return;
      } else {
        router.replace("/");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full space-y-5 ${pathname === "/" ? "text-sm" : "text-base"}`}
    >
      <InputForm
        label="CEP"
        placeholder="00000000"
        register={{
          ...register("zipCode", {
            onBlur: (e) => fetchAddress(e.target.value),
          }),
        }}
        error={errors.zipCode}
        className={pathname === "/" ? "" : "md:max-w-[210.67px]"}
      />
      <div
        className={`flex flex-col gap-5 ${pathname === "/" ? "flex-col" : "md:flex-row"}`}
      >
        <InputForm
          label="Nome da rua"
          placeholder="Nome da rua"
          register={{ ...register("street") }}
          error={errors.street}
        />
        <InputForm
          label="Rua"
          placeholder="Nome do bairro"
          register={{ ...register("neighborhood") }}
          error={errors.neighborhood}
        />
        <InputForm
          label="Número"
          placeholder="Número"
          register={{ ...register("number") }}
          error={errors.number}
        />
      </div>
      <InputForm
        label="Complemento"
        placeholder="Ex: casa 2, fundos"
        register={{ ...register("additionalInfo") }}
        error={errors.additionalInfo}
      />
      <div className="flex gap-5">
        <InputForm
          label="Estado"
          placeholder="Selecione o estado"
          register={{ ...register("state") }}
          error={errors.state}
        />
        <InputForm
          label="Cidade"
          placeholder="Nome da cidade"
          register={{ ...register("city") }}
          error={errors.city}
        />
      </div>
      <div className="flex justify-end gap-5">
        <SubmitButton disable={isLoading}>
          {isLoading ? "Carregando" : "Cadastrar"}
        </SubmitButton>
        {pathname === "/" ? "" : <SkipButton href="/" />}
      </div>
    </form>
  );
};

export default AddressForm;
