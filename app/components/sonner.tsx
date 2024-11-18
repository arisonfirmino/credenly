const Sonner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed left-1/2 top-0 -translate-x-1/2 transform text-nowrap rounded-lg bg-blue-700 px-5 py-2.5 text-sm uppercase text-white">
      {children}
    </div>
  );
};

export default Sonner;
