import Image from "next/image";
import Button from "./shared/Button";

const stats = [
  {
    value: "$0",
    label: "Sin costos fijos mensuales",
  },
  {
    value: "Pay-per-visit",
    label: "Solo pagas por visita confirmada",
  },
  {
    value: "+ Clientes",
    label: "Llena tus cupos vacíos",
  },
  {
    value: "Dashboard",
    label: "Control total en tiempo real",
  },
];

export default function SCBanner() {
  return (
    <section className="relative overflow-hidden bg-surface-dark">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/promo-onboarding.webp')",
        }}
      />
      <div className="absolute inset-0 bg-surface-soft/70" />

      <div className="relative z-10 px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw] mx-auto py-20 lg:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col gap-2.5 lg:gap-4">
          <header className="grid gap-4 lg:gap-5">
            <div className="flex items-center gap-2 lg:gap-4">
              <Image
                src="/icon.svg"
                alt="NFIT"
                width={56}
                height={56}
                className="size-12 lg:size-13"
              />
              <Image
                src="/nfit-icon.svg"
                alt="NFIT"
                width={56}
                height={56}
                className="size-12 lg:size-13"
              />
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight tracking-tight">
              ¿Tienes un centro deportivo?
            </h2>
          </header>

          <div className="grid gap-4 lg:gap-5">
            <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-[34ch] md:max-w-[42ch]">
              Únete a la NFIT y aumenta tus ingresos llenando tus cupos vacíos.
              Sin costos fijos, solo pagas por visita efectiva.
            </p>

            <div>
              <Button link="/onboarding" text="Registra tu centro" />
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md">
          {stats.map(({ value, label }) => (
            <div
              key={value}
              className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 flex flex-col gap-2 items-center text-center border border-dark-muted/50"
            >
              <span
                className={`text-lg lg:text-2xl font-semibold text-brand-secondary`}
              >
                {value}
              </span>
              <span className="text-sm text-gray-300 leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
