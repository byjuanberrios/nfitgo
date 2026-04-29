import { Header, Field, SelectField, NavButtons } from "./ui";
import { inputCls, selectCls } from "./styles";
import { COMUNAS } from "./data";

export function StepContact({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <Header>Datos de contacto</Header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Field label="Tu nombre">
          <input type="text" className={inputCls} placeholder="Juan Perez" />
        </Field>
        <Field label="RUT">
          <input type="text" className={inputCls} placeholder="12.345.678-9" />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Field label="Email corporativo">
          <input
            type="email"
            className={inputCls}
            placeholder="ejemplo@tucentrodeportivo.com"
          />
        </Field>
        <Field label="Teléfono / WhatsApp">
          <input type="tel" className={inputCls} placeholder="+569 12345678" />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="País">
          <select className={selectCls} defaultValue="CL">
            <option value="CL">Chile</option>
            <option value="AR">Argentina</option>
            <option value="PE">Perú</option>
            <option value="CO">Colombia</option>
          </select>
        </SelectField>
        <SelectField label="Ciudad">
          <select className={selectCls} defaultValue="Santiago">
            {COMUNAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </SelectField>
      </div>
      <NavButtons
        onBack={onBack}
        onNext={onNext}
        backLabel="Volver al principio"
      />
    </div>
  );
}
