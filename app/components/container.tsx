import Banner from "@/app/components/banner/banner";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-5 md:px-20 xl:pl-[448px] xl:pr-0">
      <div className="fixed left-0 top-0 hidden h-full w-[448px] p-5 xl:block">
        <Banner />
      </div>
      {children}
    </main>
  );
};

export default Container;
