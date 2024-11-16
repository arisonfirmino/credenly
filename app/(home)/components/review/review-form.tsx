"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import StarRating from "@/app/(home)/components/review/star-rating";
import SubmitButton from "@/app/components/submit-button";
import { createNewreview } from "@/app/actions/review";

const schema = yup.object({
  comment: yup.string().required("Este campo é obrigatório."),
  stars: yup.number().required(),
});

type FormData = yup.InferType<typeof schema>;

const ReviewForm = ({
  setShowReview,
}: {
  setShowReview: (value: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const starsValue = watch("stars");

  const onSubmit = async (data: FormData) => {
    if (session) {
      setIsLoading(true);

      await createNewreview({
        userId: session.user.id,
        comment: data.comment,
        rating: String(data.stars),
      });

      reset();
      setShowReview(false);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5 text-sm">
      <div>
        <textarea
          rows={3}
          placeholder="Escreva sua avaliação aqui"
          {...register("comment")}
          className={`w-full resize-none rounded-lg border border-solid bg-transparent p-2.5 outline-none focus:ring-1 ${errors.comment ? "border-red-600 focus:border-red-600 focus:ring-red-600" : "border-gray-400 focus:border-blue-700 focus:ring-blue-700"}`}
        ></textarea>
        {errors.comment && (
          <p className="text-xs text-red-600">{errors.comment.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <StarRating
          value={starsValue}
          setValue={(value) => setValue("stars", value)}
          error={errors.stars}
        />
        <SubmitButton disable={isLoading}>
          {isLoading ? "Carregando" : "Enviar Avaliação"}
        </SubmitButton>
      </div>
    </form>
  );
};

export default ReviewForm;
