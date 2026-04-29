import Sk, { ClassCardSkeleton } from "@/components/shared/Skeleton";

export default function ClaseLoading() {
  return (
    <div>
      {/* Hero */}
      <div className="mt-18 lg:mt-20 relative w-full h-[42vh] min-h-[26vh] lg:h-[60vh] bg-surface-dark animate-pulse overflow-hidden">
        {/* Aura */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-primary/6 via-transparent to-transparent" />
        {/* Gradient fade */}
        <div className="absolute inset-0 bg-linear-to-t from-surface-soft via-surface-soft/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white -mt-24 lg:-mt-32">
        <div className="px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 items-start">
            {/* Main column */}
            <div className="flex-1 min-w-0 grid gap-8 lg:gap-10">
              {/* Class header */}
              <div className="mb-2 lg:mb-4 grid gap-4">
                <div className="flex items-center gap-4">
                  <Sk className="size-16 lg:size-19 rounded-2xl shrink-0" />
                  <div className="grid gap-2">
                    <Sk className="h-7 lg:h-9 w-52 lg:w-72 rounded-lg" />
                    <Sk className="h-4 w-36 lg:w-44" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Sk className="h-6 w-16 rounded-full" />
                  <Sk className="h-6 w-20 rounded-full" />
                  <Sk className="h-6 w-14 rounded-full" />
                </div>
              </div>

              {/* Details card */}
              <section>
                <Sk className="h-5 w-40 mb-4 rounded-lg" />
                <div className="rounded-xl p-5 lg:p-6 bg-surface-dark grid grid-cols-1 gap-4 lg:grid-cols-7">
                  <div className="lg:col-span-2 grid gap-1.5">
                    <Sk className="h-3.5 w-16" />
                    <Sk className="h-4 w-20" />
                  </div>
                  <div className="lg:col-span-2 grid gap-1.5">
                    <Sk className="h-3.5 w-12" />
                    <Sk className="h-4 w-24" />
                  </div>
                  <div className="lg:col-span-3 grid gap-1.5">
                    <Sk className="h-3.5 w-20" />
                    <Sk className="h-4 w-36" />
                  </div>
                </div>
              </section>

              {/* Description card */}
              <section>
                <Sk className="h-5 w-44 mb-4 rounded-lg" />
                <div className="rounded-xl p-5 lg:p-6 bg-surface-dark grid gap-2">
                  <Sk className="h-3.5 w-full" />
                  <Sk className="h-3.5 w-11/12" />
                  <Sk className="h-3.5 w-5/6" />
                  <Sk className="h-3.5 w-4/5" />
                  <Sk className="h-3.5 w-2/3" />
                </div>
              </section>

              {/* Other classes */}
              <section>
                <Sk className="h-5 w-52 mb-4 rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ClassCardSkeleton />
                  <ClassCardSkeleton />
                  <ClassCardSkeleton />
                </div>
              </section>
            </div>

            {/* Sidebar — desktop only */}
            <div className="hidden lg:block w-80 xl:w-84 shrink-0 lg:sticky lg:top-26">
              {/* Sport center card */}
              <div className="p-4 lg:p-5 flex items-center gap-3 bg-surface-dark rounded-xl">
                <Sk className="size-13 lg:size-15 rounded-xl shrink-0" />
                <div className="grid gap-1.5 flex-1 min-w-0">
                  <Sk className="h-5 w-3/4" />
                  <Sk className="h-3.5 w-1/2" />
                </div>
              </div>

              {/* Reservation panel */}
              <div className="mt-2.5 lg:px-5 lg:py-7 grid gap-5 bg-surface-dark rounded-xl">
                <div>
                  <Sk className="h-3 w-28 mb-1.5" />
                  <Sk className="h-9 w-32 rounded-lg" />
                </div>
                <div>
                  <Sk className="h-4 w-36 mb-3" />
                  <div className="grid gap-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <Sk key={i} className="h-14 w-full rounded-xl" />
                    ))}
                  </div>
                </div>
                <Sk className="h-12 w-full rounded-lg" />
                <Sk className="h-3 w-48 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
