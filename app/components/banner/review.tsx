import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface ReviewProps {
  review: Prisma.ReviewGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const Review = ({ review }: ReviewProps) => {
  const renderStars = (rating: number) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        size={14}
        className={`${index < rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-400 text-gray-400"}`}
      />
    ));
    return stars;
  };

  return (
    <div className="space-y-1.5 rounded-lg bg-blue-600 p-2.5 shadow">
      <p className="line-clamp-3 text-sm">{review.comment}</p>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {review.user.firstName} {review.user.lastName}
        </h3>
        <div className="flex gap-1.5">{renderStars(Number(review.rating))}</div>
      </div>
    </div>
  );
};

export default Review;
