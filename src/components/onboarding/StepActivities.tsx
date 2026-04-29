import { Header, SelectField, NavButtons } from "./ui";
import { selectCls } from "./styles";
import { ACTIVITIES, CAPACIDADES } from "./data";

export function StepActivities({
  activities,
  setActivities,
  onNext,
  onBack,
}: {
  activities: string[];
  setActivities: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  function toggle(id: string) {
    setActivities(
      activities.includes(id)
        ? activities.filter((a) => a !== id)
        : [...activities, id],
    );
  }

  return (
    <div>
      <Header>Actividades y operación</Header>
      <p className="text-gray-muted text-sm mb-4">
        ¿Qué tipo de servicio/disciplina ofreces?
      </p>
      <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2.5 mb-6">
        {ACTIVITIES.map(({ id, label, Icon }) => {
          const selected = activities.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex flex-col items-center justify-center gap-2 aspect-square sm:w-26.5 sm:h-26.5 rounded-xl border-2 bg-surface-dark transition-colors cursor-pointer ${
                selected
                  ? "border-brand-primary"
                  : "border-dark-muted hover:border-white/30"
              }`}
            >
              <Icon width={32} height={32} className="sm:w-10.5 sm:h-10.5" />
              <span className="text-[10px] sm:text-xs text-white/90 font-medium">
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <SelectField label="Capacidad mensual">
        <select className={selectCls} defaultValue="">
          <option value="" disabled>
            Selecciona un rango
          </option>
          {CAPACIDADES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </SelectField>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}
