"use client";

import { usePathname } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Review from "@/app/components/banner/review";
import Title from "@/app/components/banner/title";

interface BannerProps {
  reviews: Prisma.ReviewGetPayload<{
    include: {
      user: true;
    };
  }>[];
}

const Banner = ({ reviews }: BannerProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed left-0 top-0 flex h-full w-full flex-col justify-between bg-blue-700 p-5 text-white xl:max-w-md ${pathname === "/" ? "hidden" : "hidden xl:flex"}`}
    >
      <div className="flex justify-between">
        <Title />
        <p className="text-xs text-white text-opacity-50">
          © 2024 Arison. All Rights Reserved
        </p>
      </div>

      <div className="space-y-2.5">
        <h4 className="jetbrains-mono text-3xl font-bold uppercase">
          Cadastre-se e aproveite o melhor da nossa plataforma.
        </h4>
        <p className="text-white text-opacity-70">
          Tenha acesso exclusivo a recursos e serviços personalizados para você.
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="jetbrains-mono text-center text-sm uppercase">
          Sem avaliações disponiveis
        </p>
      ) : (
        <Swiper
          className="w-full"
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <Review review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Banner;
