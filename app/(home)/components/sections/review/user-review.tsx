import { cn } from "@/app/lib/utils";

import { Card } from "@/app/components/ui/card";

import DeleteReviewButton from "@/app/(home)/components/sections/review/delete-review-button";

import { formatReviewDate } from "@/app/helpers/formatDate";

import { StarIcon } from "lucide-react";

import { Review } from "@prisma/client";

interface UserReviewProps {
  review: Review;
}

const UserReview = ({ review }: UserReviewProps) => {
  return (
    <Card className={cn("space-y-2.5 p-2.5")}>
      <p className="text-end text-xs text-muted-foreground">
        {formatReviewDate(review.created_at)}
      </p>

      <p className="text-sm">{review.text}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              size={16}
              className={cn(
                star <= review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400",
              )}
            />
          ))}
        </div>

        <DeleteReviewButton id={review.id} />
      </div>
    </Card>
  );
};

export default UserReview;
