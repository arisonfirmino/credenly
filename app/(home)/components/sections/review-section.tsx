"use client";

import { useState } from "react";
import ActionButton from "@/app/(home)/components/action-button";
import ReviewForm from "@/app/(home)/components/review/review-form";
import DeleteReviewButton from "@/app/(home)/components/review/delete-review-button";
import Sonner from "@/app/components/sonner";
import { Prisma } from "@prisma/client";

interface ReviewSectionProps {
  user: Pick<Prisma.UserGetPayload<{ include: { review: true } }>, "review">;
}

const ReviewSection = ({ user }: ReviewSectionProps) => {
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [isReviewCreated, setIsReviewCreated] = useState(false);
  const [isReviewDeleted, setIsReviewDeleted] = useState(false);

  return (
    <>
      <ActionButton
        showComponent={isReviewVisible}
        handleClick={() => setIsReviewVisible(!isReviewVisible)}
      >
        Deixe uma avaliação
      </ActionButton>

      {isReviewVisible && (
        <>
          {user.review.length === 0 ? (
            ""
          ) : (
            <>
              <p className="text-sm text-yellow-500">
                Você já deixou uma avaliação! Se quiser atualizar, basta
                preencher o formulário abaixo.
              </p>
              <DeleteReviewButton
                reviewId={user.review[0].id}
                showSonner={setIsReviewDeleted}
              />
            </>
          )}
          <ReviewForm
            setShowReview={setIsReviewVisible}
            showSonner={setIsReviewCreated}
          />
        </>
      )}
      {isReviewCreated && <Sonner>Avaliação enviada com sucesso!</Sonner>}
      {isReviewDeleted && <Sonner>Avaliação deletada com sucesso!</Sonner>}
    </>
  );
};

export default ReviewSection;
