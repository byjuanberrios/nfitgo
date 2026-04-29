import { OnboardingStepperProps } from "@/types";

export const ONBOARDING_STEPS = [
  "¡Bienvenido!",
  "Datos de contacto",
  "Información del centro",
  "Actividades y operación",
  "Seleccionar plan",
];

export default function OnboardingStepper({
  currentStep,
}: OnboardingStepperProps) {
  return (
    <>
      {/* Desktop vertical stepper */}
      <nav className="hidden md:flex flex-col">
        {ONBOARDING_STEPS.map((label, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          const last = i === ONBOARDING_STEPS.length - 1;
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                    done
                      ? "bg-brand-secondary border-brand-secondary"
                      : active
                        ? "border-brand-secondary bg-transparent"
                        : "border-dark-muted bg-transparent"
                  }`}
                />
                {!last && (
                  <div
                    className={`w-px h-10 transition-colors ${
                      done ? "bg-brand-secondary" : "bg-dark-muted"
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-sm leading-5 ${
                  active
                    ? "text-white font-semibold"
                    : done
                      ? "text-white"
                      : "text-gray-muted"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Mobile horizontal stepper */}
      <nav className="flex md:hidden items-center w-full">
        {ONBOARDING_STEPS.map((label, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          const last = i === ONBOARDING_STEPS.length - 1;
          return (
            <div
              key={i}
              className={`flex items-center ${last ? "" : "flex-1"}`}
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-3 h-3 rounded-full border-2 shrink-0 transition-colors ${
                    done
                      ? "bg-brand-secondary border-brand-secondary"
                      : active
                        ? "border-brand-secondary bg-transparent"
                        : "border-dark-muted bg-transparent"
                  }`}
                />
              </div>
              {!last && (
                <div
                  className={`h-px flex-1 min-w-0 transition-colors ${
                    done ? "bg-brand-secondary" : "bg-dark-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
