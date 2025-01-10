import { Skeleton } from "@/app/components/ui/skeleton";

const HomeLoadingPage = () => {
  return (
    <>
      <div className="flex justify-end">
        <Skeleton className="h-4 w-32" />
      </div>

      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />

      <Skeleton className="h-10 w-full rounded-none" />
      <Skeleton className="h-10 w-full rounded-none" />
      <Skeleton className="h-10 w-full rounded-none" />

      <Skeleton className="h-6 w-[99px] rounded-none" />

      <Skeleton className="h-[90px] w-full" />

      <Skeleton className="h-10 w-full" />
    </>
  );
};

export default HomeLoadingPage;
