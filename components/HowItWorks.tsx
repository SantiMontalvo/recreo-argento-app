const STEPS = [
  {
    number: "01",
    title: "Elegí tu candidato",
    description:
      "Cada día hay una lista de opciones. Elegí la tuya o escribí una que no esté.",
    color: "#77b6ea",
  },
  {
    number: "02",
    title: "Pagá tu voto",
    description:
      "Con un pago mínimo tu voto queda registrado. Sin registro, sin contraseñas.",
    color: "#ffdd4a",
  },
  {
    number: "03",
    title: "El más votado entra",
    description:
      "Al cierre del día, el ganador pasa a la foto. Al otro día ya no está en la lista.",
    color: "#141414",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white rounded-2xl border border-[#141414]/6 overflow-hidden">
      <div className="px-5 py-4 border-b border-[#141414]/6">
        <h3 className="text-sm font-bold text-[#141414] uppercase tracking-wider">
          ¿Cómo funciona?
        </h3>
      </div>
      <div className="divide-y divide-[#141414]/4">
        {STEPS.map((step) => (
          <div key={step.number} className="px-5 py-4 flex items-start gap-4">
            <span
              className="text-2xl font-black leading-none flex-shrink-0 mt-0.5"
              style={{ color: step.color }}
            >
              {step.number}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#141414]">{step.title}</p>
              <p className="text-xs text-[#141414]/50 mt-0.5 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
