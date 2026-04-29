import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, CreditCard } from "lucide-react";
import { getClassById, getCategories } from "@/services";
import { formatScheduleDateLong } from "@/lib/dateUtils";

const TRANSACTION_FEE = 200;
const DISCOUNT_RATE = 0.2;

function generateCode(classId: number, scheduleId: number) {
  const suffix = String.fromCharCode(
    65 + (classId % 26),
    65 + (scheduleId % 26),
  );
  return `NFIT-2026-${String(classId).padStart(2, "0")}-${String(scheduleId).padStart(3, "0")}-${suffix}`;
}

function getModules(): [number, number][] {
  const modules: [number, number][] = [];

  const addFinder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const outer = x === 0 || x === 6 || y === 0 || y === 6;
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        if (outer || inner) modules.push([ox + x, oy + y]);
      }
    }
  };

  addFinder(0, 0);
  addFinder(14, 0);
  addFinder(0, 14);

  for (let i = 8; i <= 12; i += 2) {
    modules.push([i, 6]);
    modules.push([6, i]);
  }

  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      if ((x < 8 && y < 8) || (x > 13 && y < 8) || (x < 8 && y > 13)) continue;
      if (x === 6 || y === 6) continue;
      if ((x * 11 + y * 7 + x * y * 3) % 5 < 2) modules.push([x, y]);
    }
  }

  return modules;
}

const QRCodeSVG = () => {
  const S = 5;
  const modules = getModules();
  return (
    <svg
      width={21 * S}
      height={21 * S}
      viewBox={`0 0 ${21 * S} ${21 * S}`}
      shapeRendering="crispEdges"
      className="text-brand-primary"
    >
      {modules.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x * S}
          y={y * S}
          width={S}
          height={S}
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

export default async function ExitoPage({
  params,
  searchParams,
}: {
  params: Promise<{ classId: string }>;
  searchParams: Promise<{ scheduleId?: string }>;
}) {
  const { classId } = await params;
  const { scheduleId } = await searchParams;

  const cls = await getClassById(Number(classId));
  if (!cls) notFound();

  const schedule = cls.schedules?.find((s) => s.id === Number(scheduleId));
  const allCategories = await getCategories();
  const category = allCategories.find(
    (cat) => cat.name.toLowerCase() === cls.category.toLowerCase(),
  );
  const CategoryIcon = category?.icon;

  const discountAmount = cls.hasDiscount
    ? Math.round(cls.price * DISCOUNT_RATE)
    : 0;
  const total = cls.price + TRANSACTION_FEE - discountAmount;
  const reservationCode = generateCode(cls.id, Number(scheduleId ?? 1));

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-16 px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw]">
      <div className="max-w-5xl mx-auto mt-8 lg:mt-10">
        <div className="bg-surface-dark border border-dark-muted/30 rounded-2xl p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            {/* Left — confirmation */}
            <div className="flex-1 min-w-0 grid gap-6">
              {/* Logo + heading */}
              <div>
                <Image
                  src="/icon.svg"
                  alt="NFITGO"
                  width={52}
                  height={52}
                  className="rounded-xl mb-4"
                />
                <h1 className="text-3xl lg:text-4xl font-bold mb-1">
                  ¡TODO LISTO!
                </h1>
                <p className="text-sm text-gray-400">
                  Hemos enviado un comprobante a tu correo.
                </p>
              </div>

              {/* QR + code */}
              <div className="flex items-center gap-5">
                <div className="shrink-0">
                  <QRCodeSVG />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    Código de Reserva
                  </p>
                  <p className="font-bold text-brand-primary text-lg leading-snug tracking-wide">
                    {reservationCode}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="border border-white/20 rounded-xl p-4 grid gap-2">
                <p className="text-sm font-semibold text-brand-secondary">
                  Recomendaciones
                </p>
                <ul className="grid gap-1.5">
                  {[
                    "Si es primera vez que asistes llega 15 minutos antes a la clase",
                    "Lleva ropa cómoda y una botella con agua para hidratarte",
                  ].map((tip) => (
                    <li
                      key={tip}
                      className="text-xs text-gray-400 flex items-start gap-2"
                    >
                      <span className="mt-1 size-1 rounded-full bg-gray-500 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="https://wa.me/56900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dark-muted/60 text-sm font-medium hover:border-white/30 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 fill-current text-[#25D366]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  ¿Tienes dudas?
                </a>
                <Link
                  href="/perfil/reservas"
                  className="px-4 py-2.5 rounded-xl bg-brand-primary text-black text-sm font-semibold hover:bg-brand-primary/90 transition-colors"
                >
                  Ver reservas
                </Link>
              </div>
            </div>

            {/* Right — paid summary */}
            <div className="lg:w-80 xl:w-88 shrink-0">
              <div className="bg-surface-soft/40 border border-dark-muted/30 rounded-xl p-5 grid gap-5">
                <div>
                  <h2 className="font-semibold text-base">Reserva pagada</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Encuentra los detalles a continuación
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

                {/* Details */}
                <div className="grid gap-3 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CalendarDays className="size-4 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">
                        Fecha y hora
                      </p>
                      {schedule ? (
                        <p className="font-medium leading-snug">
                          {formatScheduleDateLong(schedule.date)} &mdash;{" "}
                          {schedule.time} hrs
                        </p>
                      ) : (
                        <p className="text-gray-500 italic text-xs">
                          Sin horario
                        </p>
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

                  <div className="flex items-start gap-2.5">
                    <CreditCard className="size-4 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Método</p>
                      <p className="font-medium">Webpay</p>
                    </div>
                  </div>
                </div>

                <hr className="border-dark-muted/40" />

                <div className="flex items-center justify-between font-semibold text-base">
                  <span>Total pagado</span>
                  <span className="text-lg">
                    ${total.toLocaleString("es-CL")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
