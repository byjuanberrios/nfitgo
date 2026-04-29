const Sk = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-white/8 ${className ?? ""}`} />
);

export const ClassCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={`overflow-hidden rounded-xl bg-surface-dark border-[0.5px] border-gray-muted/40 ${className ?? ""}`}
  >
    <div className="w-full aspect-video bg-white/6 animate-pulse" />
    <div className="grid gap-3.5 px-4.5 py-4.5 lg:px-5 lg:py-5">
      <div className="flex items-center gap-2.5">
        <Sk className="shrink-0 w-11 h-11 rounded-lg" />
        <div className="grid gap-1.5 flex-1 min-w-0">
          <Sk className="h-4 w-4/5" />
          <Sk className="h-3 w-3/5" />
        </div>
      </div>
      <div className="flex gap-1.5">
        <Sk className="h-5 w-14 rounded-full" />
        <Sk className="h-5 w-16 rounded-full" />
      </div>
      <div className="grid gap-1.5">
        <Sk className="h-3.5 w-2/3" />
        <Sk className="h-3.5 w-1/2" />
        <Sk className="h-3.5 w-3/5" />
      </div>
      <Sk className="h-7 w-24" />
    </div>
  </div>
);

export default Sk;
