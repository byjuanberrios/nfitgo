"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60dvh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface-dark border-[0.5px] border-gray-muted/40 rounded-2xl p-8 flex flex-col items-center gap-5 text-center">
        {/* Icon with aura glow */}
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-brand-primary/15 rounded-full" />
          <div className="relative size-14 rounded-2xl bg-surface-soft border border-gray-muted/30 flex items-center justify-center">
            <AlertTriangle className="size-6 text-brand-primary/80" />
          </div>
        </div>

        <div className="grid gap-1.5">
          <h2 className="font-semibold text-lg text-white">
            Algo salió mal
          </h2>
          <p className="text-sm text-gray-muted leading-snug">
            Ocurrió un error inesperado. Puedes intentar de nuevo o volver más
            tarde.
          </p>
        </div>

        {error.digest && (
          <code className="text-xs text-dark-muted font-mono bg-surface-soft px-3 py-1.5 rounded-lg border border-dark-muted/40">
            {error.digest}
          </code>
        )}

        <button
          onClick={reset}
          className="flex items-center gap-2 bg-brand-primary text-black font-semibold text-sm py-2.5 px-5 rounded-lg hover:bg-brand-primary/90 transition-colors cursor-pointer"
        >
          <RotateCcw size={15} />
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
