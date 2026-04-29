import { Header } from "./ui";
import { primaryBtn } from "./styles";

export function StepWelcome({ onNext }: { onNext: () => void }) {
  const features = [
    {
      title: "Ecosistema digital para tu centro deportivo",
      body: "Te entregamos una suite de herramientas para gestionar las membresías, alumnos y pagos de tu centro deportivo.",
    },
    {
      title: "Una app para tus alumnos",
      body: "Ofrece una app a tus alumnos donde pueden reservar y manejar su membresía de manera autónoma. Tu solo te preocupas de ofrecer la experiencia y dar las clases.",
    },
    {
      title: "NFIT GO Incluido",
      body: "Llena los horarios que tienen menor demanda ofreciendo los cupos disponibles en nuestro marketplace de clases.",
    },
  ];

  return (
    <div>
      <Header>
        Únete a <span className="text-brand-primary">NFIT</span>
      </Header>
      <p className="text-gray-muted text-sm leading-relaxed mb-7 max-w-md">
        NFIT GO es parte del ecosistema NFIT. Disfruta de una gestión completa
        de tu centro deportivo.
      </p>
      <div className="flex flex-col gap-3 mb-9">
        {features.map((f) => (
          <div
            key={f.title}
            className="border border-dark-muted rounded-xl p-4"
          >
            <p className="text-brand-secondary font-semibold text-sm mb-1.5">
              {f.title}
            </p>
            <p className="text-gray-muted text-sm leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
      <button onClick={onNext} className={primaryBtn}>
        Continuar
      </button>
    </div>
  );
}
