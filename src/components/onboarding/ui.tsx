import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { primaryBtn, secondaryBtn } from "./styles";

export function Logo() {
  return (
    <Image
      src="/nfit-icon.svg"
      alt="NFIT"
      className="w-12 h-12 mb-6"
      width={12}
      height={12}
    />
  );
}

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="mb-5">
      <Logo />
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tighter uppercase">
        {children || ""}
      </h1>
    </header>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-muted">{label}</label>
      {children}
    </div>
  );
}

export function SelectField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Field label={label}>
      <div className="relative">
        {children}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-muted w-4 h-4 pointer-events-none" />
      </div>
    </Field>
  );
}

export function NavButtons({
  onBack,
  onNext,
  backLabel = "Paso anterior",
  nextLabel = "Continuar",
}: {
  onBack?: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 mt-8">
      {onBack && (
        <button
          onClick={onBack}
          className={`${secondaryBtn} flex-1 sm:flex-initial`}
        >
          {backLabel}
        </button>
      )}
      <button
        onClick={onNext}
        className={`${primaryBtn} flex-1 sm:flex-initial`}
      >
        {nextLabel}
      </button>
    </div>
  );
}
