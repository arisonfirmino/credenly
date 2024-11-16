import Container from "@/app/components/container";
import Banner from "@/app/components/banner/banner";
import PageIndicator from "@/app/components/page-indicator";
import { db } from "@/app/lib/prisma";

const ContainerWrapper = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const reviews = await db.review.findMany({
    include: {
      user: true,
    },
  });

  return (
    <Container>
      <Banner reviews={reviews} />
      <PageIndicator />
      <div className="flex w-full flex-col items-center gap-10 px-5 md:max-w-lg md:px-0 xl:max-w-2xl">
        {children}
      </div>
    </Container>
  );
};

export default ContainerWrapper;
