import { notFound } from "next/navigation";
import Image from "next/image";
import { ClockFading, MapPin, User, LayoutList } from "lucide-react";
import { getClassById, getClasses, getCategories } from "@/services";
import Tag from "@/components/shared/Tag";
import ClassCard from "@/components/shared/ClassCard";
import ClassDetailClient from "./ClassDetailClient";

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [cls, allClasses, categories] = await Promise.all([
    getClassById(Number(id)),
    getClasses(),
    getCategories(),
  ]);
  if (!cls) notFound();

  const category = categories.find(
    (cat) => cat.name.toLowerCase() === cls.category.toLowerCase(),
  );
  const CategoryIcon = category?.icon;

  const otherClasses = allClasses
    .filter((c) => c.sportCenter.name === cls.sportCenter.name && c.id !== cls.id)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <div className="mt-18 lg:mt-20 relative w-full h-[42vh] min-h-[26vh] lg:h-[60vh]">
        <Image
          src={cls.image}
          alt={cls.name}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface-soft via-surface-soft/40 to-surface-soft/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white -mt-24 lg:-mt-32">
        <div className="px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 items-start">
            {/* Main column */}
            <div className="flex-1 min-w-0 grid gap-8 lg:gap-10">
              {/* Class header */}
              <div className="mb-2 lg:mb-4 grid gap-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 lg:w-19 lg:h-19 bg-surface-dark rounded-2xl flex items-center justify-center shrink-0 p-3 border border-white/20">
                      {CategoryIcon && <CategoryIcon width={44} height={44} />}
                    </div>
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-semibold leading-tight truncate">
                        {cls.name}
                      </h1>
                      <p className="text-gray-500 text-sm lg:text-base mt-0.5">
                        {cls.sportCenter.name}
                      </p>
                    </div>
                  </div>
                </div>

                {cls.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {cls.tags.map((tag, i) => (
                      <Tag key={i} tag={tag} />
                    ))}
                  </div>
                )}
              </div>

              {/* Detalles */}
              <section>
                <h2 className="font-semibold text-base lg:text-lg mb-4 flex items-center gap-2">
                  <LayoutList className="size-4 text-brand-secondary shrink-0" />
                  Detalles de la clase
                </h2>
                <div className="rounded-xl p-5 lg:p-6 grid grid-cols-1 gap-3 lg:grid-cols-7 bg-surface-dark text-xs lg:text-sm">
                  <div className="grid gap-0.5 content-start lg:col-span-2">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <ClockFading className="size-3.5" />
                      Duración
                    </span>
                    <span className="font-medium leading-snug">
                      {cls.duration} min.
                    </span>
                  </div>
                  <div className="grid gap-0.5 content-start lg:col-span-2">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <User className="size-3.5" />
                      Coach
                    </span>
                    <span className="font-medium leading-snug">
                      {cls.coach ?? "Por confirmar"}
                    </span>
                  </div>
                  <div className="grid gap-0.5 content-start lg:col-span-3">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      Dirección
                    </span>
                    <span className="font-medium leading-snug">
                      {cls.sportCenter.address ?? cls.sportCenter.commune}
                    </span>
                  </div>
                </div>
              </section>

              {/* Descripción */}
              <section>
                <h2 className="font-semibold text-base lg:text-lg mb-4 flex items-center gap-2">
                  <LayoutList className="size-4 shrink-0 text-brand-secondary" />
                  Descripción de la clase
                </h2>
                <div className="rounded-xl p-5 lg:p-6 bg-surface-dark">
                  <p className="leading-relaxed text-xs lg:text-sm">
                    {cls.description}
                  </p>
                </div>
              </section>

              {/* Otras clases */}
              {otherClasses.length > 0 && (
                <section>
                  <h2 className="font-semibold text-base lg:text-lg mb-4 flex items-center gap-2">
                    <LayoutList className="size-4 text-brand-secondary shrink-0" />
                    Otras clases de {cls.sportCenter.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherClasses.map((other) => (
                      <ClassCard
                        key={other.id}
                        cls={other}
                        href={`/clase/${other.id}`}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar + mobile FAB/sheet — client component */}
            <ClassDetailClient cls={cls} />
          </div>
        </div>
      </div>
    </div>
  );
}
