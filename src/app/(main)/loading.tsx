import Sk, { ClassCardSkeleton } from "@/components/shared/Skeleton";

const SliderCategoriesSkeleton = () => (
  <div className="relative z-40 min-w-full box-border">
    <div className="w-full border border-dark-muted/50 bg-[rgba(34,38,46,0.50)] backdrop-blur-[11.9px] overflow-hidden pt-5.5 pb-4.5 rounded-xl">
      <div className="flex items-center px-4 md:px-6 mb-4 justify-between">
        <Sk className="h-5 w-40" />
        <div className="flex gap-1">
          <Sk className="h-7 w-7 rounded-lg" />
          <Sk className="h-7 w-7 rounded-lg" />
        </div>
      </div>
      <div className="flex gap-1.5 md:gap-2.5 overflow-hidden pl-4 md:pl-6">
        {Array.from({ length: 8 }, (_, i) => (
          <Sk key={i} className="shrink-0 w-24 md:w-30 h-24 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

const FeaturedSkeleton = () => (
  <div className="min-h-dvh w-full relative grid content-end items-center px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] py-6 md:py-8 overflow-hidden">
    {/* Aura gradient background */}
    <div className="absolute inset-0 bg-linear-to-br from-brand-primary/6 via-surface-dark to-surface-soft animate-pulse" />
    {/* Directional overlay */}
    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/0 md:bg-linear-to-tr" />

    {/* Bottom-left content */}
    <div className="relative z-10 flex flex-col self-end gap-3.5 max-w-full mb-[10vh] md:mb-[15vh]">
      <div className="flex gap-2">
        <Sk className="h-6 w-16 rounded-full" />
        <Sk className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex flex-col gap-2 mb-1.5">
        <Sk className="h-9 lg:h-12 w-64 lg:w-[28rem] rounded-xl" />
        <Sk className="h-4 w-44" />
      </div>
      <Sk className="h-10 w-28 rounded-lg" />
      <div className="flex gap-2 pt-5">
        <Sk className="h-2 w-6 rounded-full" />
        <Sk className="h-2 w-2 rounded-full" />
        <Sk className="h-2 w-2 rounded-full" />
        <Sk className="h-2 w-2 rounded-full" />
      </div>
    </div>

    <SliderCategoriesSkeleton />
  </div>
);

const LatestSkeleton = () => (
  <section className="py-10 lg:py-14">
    <div className="flex items-center justify-between px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] mb-7 lg:mb-8">
      <Sk className="h-6 w-36" />
      <Sk className="h-9 w-32 rounded-lg" />
    </div>
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 5 }, (_, i) => (
        <ClassCardSkeleton
          key={i}
          className={`shrink-0 w-60 lg:w-68 ${
            i === 0 ? "ml-4 md:ml-10 lg:ml-12 xl:ml-22 2xl:ml-[12vw]" : ""
          }`}
        />
      ))}
    </div>
    <div className="flex gap-2 pt-4 px-5 md:px-11 lg:px-13 xl:px-23 2xl:px-[12.1vw]">
      <Sk className="h-2 w-6 rounded-full" />
      <Sk className="h-2 w-2 rounded-full" />
      <Sk className="h-2 w-2 rounded-full" />
    </div>
  </section>
);

const SCBannerSkeleton = () => (
  <section className="relative bg-surface-dark px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] py-20 lg:py-32">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 flex flex-col gap-4 lg:gap-5">
        <div className="flex gap-3">
          <Sk className="size-12 lg:size-13 rounded-xl" />
          <Sk className="size-12 lg:size-13 rounded-xl" />
        </div>
        <Sk className="h-9 md:h-12 w-3/4 rounded-xl" />
        <div className="grid gap-2">
          <Sk className="h-4 w-5/6" />
          <Sk className="h-4 w-2/3" />
        </div>
        <Sk className="h-10 w-40 rounded-lg" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 flex flex-col gap-3 items-center border border-dark-muted/50"
          >
            <Sk className="h-7 w-20" />
            <Sk className="h-3.5 w-24" />
            <Sk className="h-3.5 w-16" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function HomeLoading() {
  return (
    <main>
      <FeaturedSkeleton />
      <LatestSkeleton />
      <SCBannerSkeleton />
    </main>
  );
}
