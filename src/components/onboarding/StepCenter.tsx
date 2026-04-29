import { Header, Field, SelectField, NavButtons } from "./ui";
import { inputCls, selectCls } from "./styles";
import { COMUNAS, CENTRO_TIPOS } from "./data";

export function StepCenter({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <Header>Información del centro deportivo</Header>
      <div className="flex flex-col gap-4">
        <Field label="Nombre del centro deportivo">
          <input type="text" className={inputCls} placeholder="Monster Fit" />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField label="Comuna">
            <select className={selectCls} defaultValue="">
              <option value="" disabled>
                Selecciona comuna
              </option>
              {COMUNAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </SelectField>
          <SelectField label="Tipo de centro">
            <select className={selectCls} defaultValue="">
              <option value="" disabled>
                Selecciona el tipo
              </option>
              {CENTRO_TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </SelectField>
        </div>
        <Field label="Dirección completa">
          <input
            type="text"
            className={inputCls}
            placeholder="Av. Alessandri 9964, Curicó, Maule"
          />
        </Field>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}
