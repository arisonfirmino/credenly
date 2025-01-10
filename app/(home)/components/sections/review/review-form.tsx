"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";

import SubmitButton from "@/app/components/submit-button";
import { Textarea } from "@/app/components/ui/textarea";

import { StarIcon } from "lucide-react";

import { toast } from "sonner";
import { addReview } from "@/app/actions/review";

const schema = yup.object({
  review: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "Este campo precisa ter pelo menos 3 caracteres."),
});

type FormData = yup.InferType<typeof schema>;

const ReviewForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

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

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setIsLoading(true);

    if (rating === 0) {
      setError("review", {
        type: "manual",
        message:
          "Não esqueça de selecionar a quantidade de estrelas que reflete sua experiência.",
      });

      setIsLoading(false);
      return;
    }

    await addReview({ userId: session.user.id, text: data.review, rating });

    reset();
    setRating(0);
    setIsLoading(false);
    toast("Avaliação enviada.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Textarea
          placeholder="Escreva sua avaliação aqui"
          {...register("review")}
          className={cn(
            errors.review && "border-red-600 focus-visible:ring-red-600",
          )}
        />
        {errors.review && (
          <p className="text-xs text-red-600">{errors.review.message}</p>
        )}
      </div>

      <div className="flex items-center gap-5">
        <SubmitButton isLoading={isLoading}>Enviar Avaliação</SubmitButton>

        <div className="flex w-full justify-end gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              size={16}
              onClick={() => setRating(star)}
              className={cn(
                "cursor-pointer",
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400",
              )}
            />
          ))}
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
