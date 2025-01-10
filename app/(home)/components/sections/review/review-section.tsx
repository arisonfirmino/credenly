"use client";

import { useState } from "react";

import ActionButton from "@/app/(home)/components/action-button";
import ReviewForm from "@/app/(home)/components/sections/review/review-form";
import UserReview from "@/app/(home)/components/sections/review/user-review";

import { Prisma } from "@prisma/client";

interface ReviewSectionProps {
  user: Prisma.UserGetPayload<{
    include: {
      review: true;
    };
  }>;
}

const ReviewSection = ({ user }: ReviewSectionProps) => {
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  return (
    <>
      <ActionButton isOpen={isReviewVisible} setIsOpen={setIsReviewVisible}>
        {user.review.length === 0
          ? "Deixe uma avaliação"
          : "Ver minha avaliação"}
      </ActionButton>

      {isReviewVisible &&
        (user.review.length === 0 ? (
          <ReviewForm />
        ) : (
          <UserReview review={user.review[0]} />
        ))}
    </>
  );
};

export default ReviewSection;
