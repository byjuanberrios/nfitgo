import { Header, NavButtons } from "./ui";
import { PLANS } from "./data";

type Billing = "anual" | "mensual";

function formatPrice(n: number) {
  return `$${n.toLocaleString("es-CL")}`;
}

function PlanCard({
  plan,
  billing,
  selected,
  onSelect,
  className = "",
}: {
  plan: (typeof PLANS)[0];
  billing: Billing;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  const price = billing === "anual" ? plan.priceAnual : plan.priceMensual;
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col p-5 rounded-xl border-2 text-left cursor-pointer transition-colors w-full ${
        selected
          ? "border-brand-primary"
          : "border-dark-muted hover:border-white/30"
      } ${className}`}
    >
      <p className="text-brand-secondary font-bold text-base mb-3">
        {plan.name}
      </p>
      <ul className="flex flex-col gap-1.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="text-sm text-white/80 leading-snug">
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <p className="text-brand-primary text-2xl font-black">
          {formatPrice(price)}
        </p>
        <p className="text-gray-muted text-xs mt-0.5">
          {billing === "anual" ? "Mensual (pagando 12 meses)" : "Por mes"}
        </p>
      </div>
    </button>
  );
}

export function StepPlan({
  billing,
  setBilling,
  selectedPlan,
  setSelectedPlan,
  onNext,
  onBack,
}: {
  billing: Billing;
  setBilling: (v: Billing) => void;
  selectedPlan: string;
  setSelectedPlan: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [goPro, business, businessPro] = PLANS;

  return (
    <div>
      <Header>Selecciona un plan</Header>
      {/* Billing toggle */}
      <div className="inline-flex bg-surface-dark rounded-lg p-1 mb-5 gap-1">
        {(["anual", "mensual"] as Billing[]).map((b) => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold capitalize transition-colors cursor-pointer ${
              billing === b
                ? "bg-brand-secondary text-black"
                : "text-white hover:text-white/80"
            }`}
          >
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>
      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <PlanCard
          plan={goPro}
          billing={billing}
          selected={selectedPlan === goPro.id}
          onSelect={() => setSelectedPlan(goPro.id)}
          className="md:row-span-2"
        />
        <PlanCard
          plan={business}
          billing={billing}
          selected={selectedPlan === business.id}
          onSelect={() => setSelectedPlan(business.id)}
        />
        <PlanCard
          plan={businessPro}
          billing={billing}
          selected={selectedPlan === businessPro.id}
          onSelect={() => setSelectedPlan(businessPro.id)}
        />
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Finalizar" />
    </div>
  );
}
