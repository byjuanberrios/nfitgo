"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { CheckoutFormProps } from "@/types";

export default function CheckoutForm({ total, classId, scheduleId }: CheckoutFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/reserva/${classId}/exito?scheduleId=${scheduleId}`);
  };

  const inputClass =
    "w-full bg-surface-soft border border-dark-muted/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-primary/60 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-1.5">
        <label className="text-xs text-gray-400">Nombre completo</label>
        <input
          type="text"
          placeholder="Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs text-gray-400">Correo electrónico</label>
        <input
          type="email"
          placeholder="juan@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs text-gray-400">Teléfono</label>
        <input
          type="tel"
          placeholder="+569 1234 5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer mt-1">
        <div className="relative mt-0.5 shrink-0">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="peer appearance-none size-5 rounded border border-dark-muted/60 bg-surface-soft checked:bg-brand-primary checked:border-brand-primary transition-colors cursor-pointer"
          />
          <svg
            className="pointer-events-none absolute inset-0 m-auto size-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 12 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1,5 4,8 11,1" />
          </svg>
        </div>
        <span className="text-xs text-gray-400 leading-relaxed">
          He leído y acepto los{" "}
          <Link href="#" className="text-brand-primary hover:underline">
            Términos y Condiciones
          </Link>{" "}
          de NFITGO, incluyendo la política de privacidad y cancelaciones.
        </span>
      </label>

      <button
        type="submit"
        disabled={!termsAccepted}
        className="mt-1 w-full bg-brand-primary text-black font-semibold text-sm py-4 rounded-xl hover:bg-brand-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Pagar ${total.toLocaleString("es-CL")}
      </button>

      <p className="text-xs text-gray-500 text-center -mt-2">
        Serás redirigido a Payku para realizar el pago de forma segura
      </p>
    </form>
  );
}
