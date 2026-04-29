import Sk, { ClassCardSkeleton } from "@/components/shared/Skeleton";

const FiltersSkeleton = () => (
  <aside className="hidden lg:block w-52 lg:w-60 shrink-0 sticky top-26">
    <div className="grid gap-6">
      <div className="flex items-center gap-2">
        <Sk className="size-4 rounded" />
        <Sk className="h-4 w-24" />
      </div>
      {/* Category grid */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <Sk key={i} className="h-[4.5rem] rounded-xl" />
        ))}
      </div>
      {/* Date filter */}
      <div className="grid gap-2.5">
        <Sk className="h-4 w-14" />
        <Sk className="h-10 w-full rounded-lg" />
      </div>
      {/* Commune filter */}
      <div className="grid gap-2.5">
        <Sk className="h-4 w-20" />
        <Sk className="h-10 w-full rounded-lg" />
      </div>
      {/* Distance filter */}
      <div className="grid gap-2.5">
        <Sk className="h-4 w-16" />
        <Sk className="h-10 w-full rounded-lg" />
      </div>
    </div>
  </aside>
);

export default function ExploreLoading() {
  return (
    <div className="pt-20 lg:pt-24 px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] pb-16">
      <div className="flex gap-6 lg:gap-8 items-start mt-6 lg:mt-8">
        <FiltersSkeleton />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-6 lg:mb-7">
            <Sk className="size-4 lg:size-5 rounded" />
            <Sk className="h-6 w-36" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <ClassCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
