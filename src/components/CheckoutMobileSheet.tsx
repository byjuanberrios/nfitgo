"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import CheckoutForm from "@/components/CheckoutForm";

type Props = {
  total: number;
  classId: number;
  scheduleId: number;
};

export default function CheckoutMobileSheet({
  total,
  classId,
  scheduleId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 inset-x-4 z-40 flex items-center justify-center bg-brand-primary text-black font-semibold text-sm py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform"
      >
        Completa tus datos y paga
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
          <span className="font-semibold">Finaliza tu reserva</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto max-h-[80dvh] pb-10">
          <CheckoutForm
            total={total}
            classId={classId}
            scheduleId={scheduleId}
          />
        </div>
      </div>
    </>
  );
}
