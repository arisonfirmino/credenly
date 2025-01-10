import { cn } from "@/app/lib/utils";

import { Card } from "@/app/components/ui/card";
import { StarIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface ReviewItemProps {
  review: Prisma.ReviewGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Card className={cn("w-full space-y-1.5 p-2.5")}>
      <p className="line-clamp-2 text-sm">{review.text}</p>

      <div className="flex items-center justify-between">
        <p className="font-medium">
          {review.user.name} {review.user.lastName}
        </p>

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
      </div>
    </Card>
  );
};

export default ReviewItem;
