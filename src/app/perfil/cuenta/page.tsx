import { CircleUser, KeyRound, MapPin, Mail } from "lucide-react";
import Image from "next/image";

const MOCK_USER = {
  name: "Juan Berrios",
  location: "Curicó, Maule",
  email: "jberrios@gmail.com",
};

export default function CuentaPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Profile info */}
      <section className="flex flex-col gap-5">
        <h2 className="flex items-center gap-2.5 text-xl font-semibold">
          <CircleUser className="text-brand-secondary size-5" />
          Cuenta
        </h2>

        <div className="flex items-center gap-4 lg:gap-5">
          <div className="size-22 lg:size-24 rounded-xl overflow-hidden shrink-0 bg-tag-gray flex items-center justify-center">
            <Image
              src="/fake-avatar.png"
              alt={MOCK_USER.name}
              width={100}
              height={100}
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{MOCK_USER.name}</p>
            <div className="flex flex-col gap-1.5 lg:gap-1">
              <span className="flex items-center gap-2 text-xs lg:text-sm text-white/60">
                <MapPin size={14} className="text-brand-secondary shrink-0" />
                {MOCK_USER.location}
              </span>
              <span className="flex items-center gap-2 text-xs lg:text-sm text-white/60">
                <Mail size={14} className="text-brand-secondary shrink-0" />
                {MOCK_USER.email}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-dark-muted/30" />

      {/* Password update */}
      <section className="flex flex-col gap-5">
        <h2 className="flex items-center gap-2.5 text-xl font-semibold">
          <KeyRound className="text-brand-secondary size-5" />
          Actualizar contraseña
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Contraseña actual</label>
            <input
              type="password"
              placeholder="••••••••••"
              className="bg-surface-dark border border-dark-muted/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/60">Nueva contraseña</label>
            <input
              type="password"
              placeholder="••••••••••"
              className="bg-surface-dark border border-dark-muted/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
        </div>

        <button className="w-fit bg-brand-primary text-black font-semibold text-sm px-5 py-3 rounded-lg hover:bg-brand-primary/90 transition-colors cursor-pointer">
          Actualizar contraseña
        </button>
      </section>
    </div>
  );
}
