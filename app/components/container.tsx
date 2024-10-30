import Banner from "@/app/components/banner/banner";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pl-[448px]">
      <div className="fixed left-0 top-0 h-full w-[448px] p-5">
        <Banner />
      </div>
      {children}
    </main>
  );
};

export default Container;
