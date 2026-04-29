import Link from "next/link";
import { Header } from "./ui";
import { primaryBtn } from "./styles";

export function StepSuccess() {
  return (
    <div>
      <Header>Revisa tu correo</Header>
      <p className="text-gray-muted text-sm leading-relaxed mb-8 max-w-md">
        Hemos enviado un correo con los siguientes pasos para que puedas
        comenzar a disfrutar de todos los beneficios de NFIT y NFITGO.
      </p>
      <div className="flex items-center gap-3">
        <Link href="https://admin.nfit.app" className={primaryBtn}>
          Ir a NFIT
        </Link>
        <Link
          href="/"
          className="bg-brand-secondary text-black font-semibold px-7 py-3 rounded-lg hover:bg-brand-secondary/90 transition-colors text-sm"
        >
          Ir a NFIT GO
        </Link>
      </div>
    </div>
  );
}
