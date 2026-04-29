"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, X } from "lucide-react";
import type { ClassItem } from "@/types";
import SchedulePicker from "@/components/SchedulePicker";

const SportCenterCard = ({ cls }: { cls: ClassItem }) => (
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
        {cls.sportCenter.name}
      </Link>
      <p className="text-xs text-gray-400 mt-0.5 leading-snug">
        {cls.sportCenter.address ?? cls.sportCenter.commune}
      </p>
    </div>
  </div>
);

const ReservationPanel = ({ cls }: { cls: ClassItem }) => {
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

export default function ClassDetailClient({ cls }: { cls: ClassItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="w-full lg:w-80 xl:w-84 shrink-0 lg:sticky lg:top-26">
        <div className="hidden lg:block">
          <SportCenterCard cls={cls} />
          <div className="mt-1 lg:mt-2.5">
            <ReservationPanel cls={cls} />
          </div>
        </div>
      </div>

      {/* Mobile: sport center card at bottom of main column */}
      <div className="-mt-4 lg:hidden">
        <SportCenterCard cls={cls} />
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
    </>
  );
}
