const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center py-5">
      <div className="flex w-full max-w-xl flex-col gap-5 px-5 md:px-0">
        {children}
      </div>
    </main>
  );
};

export default Container;
