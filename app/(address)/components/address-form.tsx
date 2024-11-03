"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

import InputForm from "@/app/components/input-form";
import SkipButton from "@/app/components/skip-button";
import SubmitButton from "@/app/components/submit-button";

import { createNewAddress } from "@/app/actions/address";

import { AddressFormData } from "@/app/types";

const schema = yup.object({
  street: yup.string().required().min(3),
  neighborhood: yup.string().required().min(3),
  zipCode: yup.string().required().min(8).max(8),
  state: yup.string().required().min(3),
  city: yup.string().required().min(3),
  additionalInfo: yup.string().min(3),
  number: yup.number().required(),
});

const AddressForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const zipCodeValue = watch("zipCode");

  useEffect(() => {
    const fetchAddressData = async (zipCode: string) => {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      );
      const { logradouro, bairro, uf, localidade } = response.data;

      setValue("street", logradouro);
      setValue("neighborhood", bairro);
      setValue("state", uf);
      setValue("city", localidade);
    };

    if (zipCodeValue && zipCodeValue.length === 8) {
      fetchAddressData(zipCodeValue);
    }
  }, [zipCodeValue, setValue]);

  const onSubmit = async (data: AddressFormData) => {
    if (session) {
      const formData = {
        userId: session?.user.id,
        street: data.street,
        neighborhood: data.neighborhood,
        zipCode: Number(data.zipCode),
        state: data.state,
        city: data.city,
        additionalInfo: data.additionalInfo,
        number: Number(data.number),
      };

      setIsLoading(true);

      await createNewAddress(formData).then(() => {
        reset();
        setIsLoading(false);
        router.replace("/admin");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-5">
        <div className="w-full md:max-w-52">
          <InputForm
            label="CEP"
            placeholder="000000"
            register={{ ...register("zipCode") }}
            showError={false}
            error={errors.zipCode}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <InputForm
            label="Rua"
            placeholder="Nome da rua"
            register={{ ...register("street") }}
            showError={false}
            error={errors.street}
          />
          <InputForm
            label="Bairro"
            placeholder="Nome do bairro"
            register={{ ...register("neighborhood") }}
            showError={false}
            error={errors.neighborhood}
          />

          <div className="w-full max-w-24">
            <InputForm
              label="Número"
              placeholder="Nº"
              type="number"
              register={{ ...register("number") }}
              showError={false}
              error={errors.number}
            />
          </div>
        </div>

        <InputForm
          label="Complemento"
          placeholder="Ex: casa 2, fundos"
          register={{ ...register("additionalInfo") }}
          showError={false}
          error={errors.additionalInfo}
        />

        <div className="flex flex-col gap-5 md:flex-row">
          <InputForm
            label="Estado"
            placeholder="Selecione o estado"
            register={{ ...register("state") }}
            showError={false}
            error={errors.state}
          />
          <InputForm
            label="Cidade"
            placeholder="Nome da cidade"
            register={{ ...register("city") }}
            showError={false}
            error={errors.city}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-5">
        <SubmitButton isLoading={isLoading} showIcon={false} className="w-fit">
          {isLoading ? "Carregando" : "Cadastrar"}
        </SubmitButton>
        <SkipButton href="/admin" />
      </div>
    </form>
  );
};

export default AddressForm;
