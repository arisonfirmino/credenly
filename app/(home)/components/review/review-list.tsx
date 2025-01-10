"use client";

import { cn } from "@/app/lib/utils";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import ReviewItem from "@/app/(home)/components/review/review-item";

import { Prisma } from "@prisma/client";

interface ReviewListProps {
  reviews: Prisma.ReviewGetPayload<{
    include: {
      user: true;
    };
  }>[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <ul>
      <li>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-xl"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem className={cn("w-full")} key={review.id}>
                <ReviewItem review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={cn("hidden md:flex")} />
          <CarouselNext className={cn("hidden md:flex")} />
        </Carousel>
      </li>
    </ul>
  );
};

export default ReviewList;
