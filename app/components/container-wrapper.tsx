import Container from "@/app/components/container";
import Banner from "@/app/components/banner";
import PageIndicator from "@/app/components/page-indicator";

const ContainerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Banner />
      <PageIndicator />
      <div className="flex w-full flex-col items-center gap-10 px-5 md:max-w-lg md:px-0 xl:max-w-2xl">
        {children}
      </div>
    </Container>
  );
};

export default ContainerWrapper;
