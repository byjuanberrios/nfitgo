import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { classes } from "@/data/classes";
import { categories } from "@/data/categories";
import { formatScheduleDateLong } from "@/lib/dateUtils";
import { ClassItem, ClassSchedule, CategoryItem } from "@/types";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutMobileSheet from "@/components/CheckoutMobileSheet";

const TRANSACTION_FEE = 200;
const DISCOUNT_RATE = 0.2;

type SummaryProps = {
  cls: ClassItem;
  schedule: ClassSchedule | undefined;
  CategoryIcon: CategoryItem["icon"] | undefined;
  total: number;
  discountAmount: number;
};

const ReservationSummary = ({ cls, schedule, CategoryIcon, total, discountAmount }: SummaryProps) => (
  <div className="bg-surface-soft/40 border border-dark-muted/30 rounded-xl p-5 grid gap-5">
    <div>
      <h2 className="font-semibold text-base">Resumen de Reserva</h2>
      <p className="text-xs text-gray-400 mt-0.5">
        Verifica los detalles de tu clase antes de pagar
      </p>
    </div>

    <hr className="border-dark-muted/40" />

    {/* Sport center */}
    <div className="flex items-center gap-3">
      <Image
        src={cls.sportCenter.image}
        alt={cls.sportCenter.name}
        width={44}
        height={44}
        className="size-11 rounded-xl object-cover object-center bg-surface-dark shrink-0"
      />
      <div className="min-w-0">
        <p className="font-semibold text-sm leading-snug truncate">
          {cls.sportCenter.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 leading-snug">
          {cls.sportCenter.address}, {cls.sportCenter.commune},{" "}
          {cls.sportCenter.region}
        </p>
      </div>
    </div>

    {/* Class */}
    <div className="flex items-center gap-3">
      <div className="size-11 bg-surface-dark rounded-xl flex items-center justify-center shrink-0 p-2 border border-white/10">
        {CategoryIcon && <CategoryIcon width={28} height={28} />}
      </div>
      <div>
        <p className="text-xs text-gray-400">Clase</p>
        <p className="font-semibold text-sm">{cls.name}</p>
      </div>
    </div>

    <hr className="border-dark-muted/40" />

    {/* Date & time */}
    <div className="grid gap-3 text-sm">
      <div className="flex items-start gap-2.5">
        <CalendarDays className="size-4 text-brand-secondary shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Fecha y hora</p>
          {schedule ? (
            <p className="font-medium leading-snug">
              {formatScheduleDateLong(schedule.date)} &mdash; {schedule.time} hrs
            </p>
          ) : (
            <p className="text-gray-500 italic text-xs">Sin horario seleccionado</p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <Clock className="size-4 text-brand-secondary shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Duración</p>
          <p className="font-medium">{cls.duration} minutos</p>
        </div>
      </div>
    </div>

    <hr className="border-dark-muted/40" />

    {/* Price breakdown */}
    <div className="grid gap-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Precio clase</span>
        <span>${cls.price.toLocaleString("es-CL")}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Recargo transacción</span>
        <span>${TRANSACTION_FEE.toLocaleString("es-CL")}</span>
      </div>
      {cls.hasDiscount && (
        <div className="flex items-center justify-between text-brand-tertiary">
          <span>Descuento {DISCOUNT_RATE * 100}%</span>
          <span>-${discountAmount.toLocaleString("es-CL")}</span>
        </div>
      )}
      <div className="flex items-center justify-between font-semibold text-base mt-1 pt-2 border-t border-dark-muted/40">
        <span>Total a pagar</span>
        <span className="text-lg">${total.toLocaleString("es-CL")}</span>
      </div>
    </div>
  </div>
);

export default async function ReservaPage({
  params,
  searchParams,
}: {
  params: Promise<{ classId: string }>;
  searchParams: Promise<{ scheduleId?: string }>;
}) {
  const { classId } = await params;
  const { scheduleId } = await searchParams;

  const cls = classes.find((c) => c.id === Number(classId));
  if (!cls) notFound();

  const schedule = cls.schedules?.find((s) => s.id === Number(scheduleId));
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === cls.category.toLowerCase(),
  );
  const CategoryIcon = category?.icon;
  const scheduleIdNum = Number(scheduleId ?? 1);

  const discountAmount = cls.hasDiscount ? Math.round(cls.price * DISCOUNT_RATE) : 0;
  const total = cls.price + TRANSACTION_FEE - discountAmount;

  const summaryProps = { cls, schedule, CategoryIcon, total, discountAmount };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-16 px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw]">
      <div className="max-w-5xl mx-auto mt-8 lg:mt-10">
        <div className="bg-surface-dark border border-dark-muted/30 rounded-2xl p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">

            {/* Summary — mobile only (top) */}
            <div className="lg:hidden">
              <ReservationSummary {...summaryProps} />
            </div>

            {/* Form — desktop only */}
            <div className="hidden lg:block flex-1 min-w-0">
              <h1 className="text-2xl lg:text-3xl font-semibold mb-1">
                Finaliza tu reserva
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                Completa tus datos para proceder al pago seguro.
              </p>
              <CheckoutForm total={total} classId={cls.id} scheduleId={scheduleIdNum} />
            </div>

            {/* Summary — desktop sidebar */}
            <div className="hidden lg:block lg:w-80 xl:w-88 shrink-0">
              <ReservationSummary {...summaryProps} />
            </div>

          </div>
        </div>
      </div>

      {/* Mobile FAB + bottom sheet */}
      <CheckoutMobileSheet total={total} classId={cls.id} scheduleId={scheduleIdNum} />
    </div>
  );
}
