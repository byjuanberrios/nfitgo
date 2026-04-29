"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  CalendarDays,
  ClockFading,
  MapPin,
  User,
  LayoutList,
  X,
} from "lucide-react";
import { classes } from "@/lib/classes";
import { categories } from "@/lib/categories";
import Tag from "@/components/shared/Tag";
import ClassCard from "@/components/shared/ClassCard";
import SchedulePicker from "@/components/SchedulePicker";

const SportCenterCard = ({ cls }: { cls: (typeof classes)[number] }) => {
  return (
    <div className="p-4 lg:p-5 flex items-center gap-3 bg-surface-dark rounded-xl">
      <Link href={`/centro/${cls.sportCenter.id}`}>
        <Image
          src={cls.sportCenter.image}
          alt={cls.sportCenter.name}
          width={48}
          height={48}
          className="object-cover object-center size-13 lg:size-15 bg-surface-soft rounded-xl flex items-center justify-center shrink-0"
        />
      </Link>
      <div className="min-w-0">
        <Link
          href={`/centro/${cls.sportCenter.id}`}
          className="font-semibold text-base lg:text-lg truncate"
        >
          {cls.sportCenter.name} lero
        </Link>
        <p className="text-xs text-gray-400 mt-0.5 leading-snug">
          {cls.sportCenter.address ?? cls.sportCenter.commune}
        </p>
      </div>
    </div>
  );
};

const ReservationPanel = ({ cls }: { cls: (typeof classes)[number] }) => {
  const [selectedId, setSelectedId] = useState<number>(
    cls.schedules?.[0]?.id ?? -1,
  );
  const checkoutHref = `/reserva/${cls.id}?scheduleId=${selectedId}`;

  return (
    <div className="lg:px-5 lg:py-7 grid gap-5 bg-surface-dark rounded-xl">
      {/* Price */}
      <div>
        <p className="text-xs text-gray-400 mb-0.5">Precio de la clase</p>
        <p className="text-3xl font-semibold text-brand-primary tracking-tight">
          ${cls.price.toLocaleString("es-CL")}
        </p>
      </div>

      {/* Schedule */}
      {cls.schedules && cls.schedules.length > 0 && (
        <div className="relative">
          <p className="text-sm font-semibold mb-3 flex items-center gap-2">
            <CalendarDays className="size-4 text-brand-secondary" />
            Selecciona un horario
          </p>
          <div
            className={`
            after:content-['']
            after:h-3
            after:w-full
            after:bg-linear-to-t
            after:from-surface-dark
            after:to-transparent
            after:absolute
            after:bottom-0
            after:pointer-events-none`}
          >
            <SchedulePicker
              schedules={cls.schedules}
              selected={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <a
        href={checkoutHref}
        className="text-sm lg:text-base -mt-2 block w-full text-center bg-brand-primary text-black font-semibold py-3.5 lg:py-3 rounded-lg hover:bg-brand-primary/90 transition-colors"
      >
        Reserva ahora
      </a>
      <p className="text-xs text-gray-400 text-center mb-2">
        Serás redirigido para completar tu reserva
      </p>
    </div>
  );
};

const ClassDetailPage = () => {
  const params = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const cls = classes.find((c) => c.id === Number(params.id));
  if (!cls) notFound();

  const category = categories.find(
    (cat) => cat.name.toLowerCase() === cls.category.toLowerCase(),
  );
  const CategoryIcon = category?.icon;

  const otherClasses = classes
    .filter(
      (c) => c.sportCenter.name === cls.sportCenter.name && c.id !== cls.id,
    )
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
          {/* Two-column layout */}
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

              {/* Sport center — mobile only */}
              <div className="-mt-4 lg:hidden">
                <SportCenterCard cls={cls} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 xl:w-84 shrink-0 lg:sticky lg:top-26">
              <div className="hidden lg:block">
                <SportCenterCard cls={cls} />
                <div className="mt-1 lg:mt-2.5">
                  <ReservationPanel cls={cls} />
                </div>
              </div>
            </div>

            {/* Mobile FAB */}
            <button
              onClick={() => setIsOpen(true)}
              className="tracking-tight lg:hidden fixed bottom-6 inset-x-4 z-40 flex items-center justify-center bg-brand-primary text-black font-semibold text-sm py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              Reserva esta clase
            </button>

            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            />

            {/* Bottom sheet */}
            <div
              className={`lg:hidden fixed inset-x-0 bottom-0 z-60 bg-surface-dark rounded-t-2xl border-t border-white/10 transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="font-semibold">Reserva</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-5 overflow-y-auto max-h-[70dvh] pb-10">
                <ReservationPanel cls={cls} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;
